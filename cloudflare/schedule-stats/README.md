# Schedule favorite statistics

This Cloudflare Worker stores anonymous aggregate counters for schedule favorites in D1.

It must not store user IDs, session IDs, cookies, IP hashes, user agents, or raw click logs. Spam protection should be configured in Cloudflare using WAF/rate limiting on the public write endpoint.

The Worker expects the D1 database binding variable to be named `cns-fav`.

## Endpoints

- `POST /favorite` stores one aggregate favorite change.
- `GET /stats` returns aggregate counters and requires `Authorization: Bearer <ADMIN_TOKEN>`.
- `GET /health` returns a simple health check.

## Request body

```json
{
  "eventId": "835091",
  "action": "add"
}
```

`action` must be either `add` or `remove`.

The Worker resolves the session title server-side from Sessionize before writing to D1. Client-supplied titles are not trusted or stored.

## Existing database upgrade

Migration `0002_add_event_title.sql` adds session titles. If you manage the table manually
outside Wrangler migrations and it already exists without titles, run this once in the
Cloudflare D1 Console:

```sql
ALTER TABLE schedule_favorite_counts
  ADD COLUMN event_title TEXT NOT NULL DEFAULT '';
```

## Deploy

1. Create the D1 database:

   ```bash
   npx wrangler d1 create cns-fav
   ```

2. Copy the generated `database_id` into `cloudflare/schedule-stats/wrangler.toml`.

3. Optional: set `ALLOWED_EVENT_IDS` in `wrangler.toml` to a comma-separated list of valid Sessionize session IDs as an additional allowlist. The Worker also validates IDs against the public Sessionize schedule before writing.

4. Apply the D1 migration:

   ```bash
   npx wrangler d1 migrations apply cns-fav \
     --config cloudflare/schedule-stats/wrangler.toml \
     --remote
   ```

5. Set the admin token:

   ```bash
   npx wrangler secret put ADMIN_TOKEN \
     --config cloudflare/schedule-stats/wrangler.toml
   ```

6. Deploy the Worker:

   ```bash
   npx wrangler deploy --config cloudflare/schedule-stats/wrangler.toml
   ```

7. Set the Vercel environment variable `GATSBY_SCHEDULE_STATS_ENDPOINT` to the full Worker endpoint, for example:

   ```text
   https://cns-fav.<account>.workers.dev/favorite
   ```

## Cloudflare protection

Configure Cloudflare WAF/rate limiting for the public write endpoint. A practical starting point is a managed challenge or block after repeated requests to `/favorite`, for example more than 20 requests per minute from the same source.
