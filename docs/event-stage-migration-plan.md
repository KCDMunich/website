# Event Stage Migration Plan

Status: Implemented on 2026-07-11  
Scope: `web/` Next.js application  
Current target: CNS Munich 2026 recap with 2027 sponsor recruiting

## Implementation outcome

The migration described below is implemented. The authoritative environment contract is now:

```dotenv
EVENT_STAGE=recap
PROGRAM_PUBLISHED=false
TICKETS_SOLD_OUT=false
SPONSORSHIP_PHASE=recruiting
```

The implementation includes the pure `site-presentation` contract, exhaustive five-stage mapping,
stage-aware homepage composition, navigation, ticketing, program routes, indexing, metadata,
sponsorship, and Vitest matrix coverage. The historical work packages remain in this document as an
audit trail and maintenance checklist.

## 1. Why this change is needed

The current implementation validates four independent environment variables:

- `EVENT_PHASE`
- `PROGRAM_PHASE`
- `TICKETING_PHASE`
- `SPONSORSHIP_PHASE`

The current recap combination renders correctly, but the model permits contradictory states such
as `EVENT_PHASE=recap` together with `TICKETING_PHASE=open`. Several phase values currently change
only the hero while navigation, homepage sections, route copy, and metadata remain unchanged.

The migration must make each supported stage a complete presentation state. Changing one stage
must update all visitor-facing surfaces consistently.

### Confirmed gaps in the current implementation

- `teaser`, `cfp`, `upcoming`, and `live` mostly change hero copy only.
- `cfp` has no CFP action and still links to the schedule.
- `PROGRAM_PHASE=hidden` hides only the homepage speaker teaser.
- Program links remain in navigation regardless of program readiness.
- Root metadata always uses recap copy.
- Schedule and speaker metadata always use archive copy.
- `sold-out` is represented differently on desktop and mobile.
- Some event years and edition-specific labels remain hardcoded.
- Independent variables accept combinations that produce contradictory UI.

## 2. Target configuration

Use one canonical event stage and keep sponsorship independent:

```dotenv
EVENT_STAGE=recap
SPONSORSHIP_PHASE=recruiting
```

Allowed event stages:

```text
teaser | cfp | tickets | live | recap
```

Allowed sponsorship phases:

```text
closed | recruiting
```

`EVENT_STAGE` is authoritative for event messaging, navigation, homepage ordering, route copy, and
metadata. Within `tickets`, `PROGRAM_PUBLISHED` controls program publication and `TICKETS_SOLD_OUT`
controls sales messaging. `SPONSORSHIP_PHASE` remains independent because sponsor recruiting can
begin while the previous event is still in recap mode.

The migration is intentionally breaking. There is no production deployment requiring compatibility
with the current four-variable model.

## 3. Canonical stage matrix

| Stage     | Hero purpose                       | Primary action                  | Program              | Tickets          | Homepage emphasis                              |
| --------- | ---------------------------------- | ------------------------------- | -------------------- | ---------------- | ---------------------------------------------- |
| `teaser`  | Announce the next edition          | Save the date or join community | Hidden               | Closed           | Date, vision, previous highlights, sponsors    |
| `cfp`     | Recruit speakers                   | Submit a proposal               | Preview              | Closed           | CFP, topic guidance, early speakers, community |
| `tickets` | Convert visitors to attendees      | Buy tickets / explore schedule  | Preview or published | Open or sold out | Tickets, value proposition, speakers, venue    |
| `live`    | Support visitors during event days | Open live schedule              | Published            | Closed           | Live schedule, venue, attendee information     |
| `recap`   | Preserve and share event value     | View photos / watch sessions    | Archive              | Closed           | Photos, recordings, archive, partner thanks    |

### Stage-specific navigation

| Stage     | Schedule                                  | Speakers               | Tickets                                    | Photos           | Sponsors |
| --------- | ----------------------------------------- | ---------------------- | ------------------------------------------ | ---------------- | -------- |
| `teaser`  | Hidden                                    | Hidden                 | Hidden                                     | Previous edition | Visible  |
| `cfp`     | Hidden                                    | Preview if available   | Hidden                                     | Previous edition | Visible  |
| `tickets` | Hidden or visible via `PROGRAM_PUBLISHED` | Preview or full lineup | Visible or sold-out via `TICKETS_SOLD_OUT` | Previous edition | Visible  |
| `live`    | Live schedule                             | Visible                | Hidden                                     | Previous edition | Visible  |
| `recap`   | Edition archive                           | Edition archive        | Hidden                                     | Current edition  | Visible  |

Routes may remain technically reachable before publication, but they must use `noIndex` metadata
and must not be linked from public navigation. This is presentation control, not authorization.

## 4. Target architecture

### 4.1 Static event content

Keep public, versioned content in `web/lib/event-config.ts`. Restructure it so current, previous, and
next-edition concepts are explicit instead of relying on scattered year strings.

Proposed shape:

```ts
export const eventConfig = {
  featured: {
    edition: 2026,
    dateLabel: 'June 29–30, 2026',
    location: 'Munich',
    venue: 'smartvillage Bogenhausen',
    ticketUrl: '...',
    scheduleEventId: '...',
  },
  next: {
    edition: 2027,
    dateLabel: null,
  },
  archive: {
    galleryUrl: '...',
    playlistUrl: '...',
  },
  community: {
    discordUrl: '...',
    sponsorEmail: '...',
    sponsorProspectusUrl: '...',
  },
} as const;
```

Changing editions still requires updating content data. Changing presentation stage should require
`EVENT_STAGE`, the two ticket options, and independently `SPONSORSHIP_PHASE`.

### 4.2 Pure stage derivation

Create `web/lib/site-presentation.ts` as a pure module with no React and no direct environment access.
It converts an `EventStage` into the complete UI contract.

```ts
type SitePresentation = {
  stage: EventStage;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: Action | null;
    secondaryAction: Action | null;
  };
  navigation: {
    showSchedule: boolean;
    showSpeakers: boolean;
    showTickets: boolean;
    scheduleLabel: string;
    speakersLabel: string;
  };
  program: {
    mode: 'hidden' | 'preview' | 'published' | 'archive';
    noIndex: boolean;
  };
  ticketing: {
    mode: 'closed' | 'open' | 'sold-out';
  };
  homepage: {
    sections: HomepageSectionId[];
  };
  metadata: {
    title: string;
    description: string;
  };
};
```

All stage-dependent components receive this derived contract or a narrowly scoped part of it. UI
components must not interpret environment variables independently.

### 4.3 Server-only environment parsing

Keep a small `web/lib/site-state.ts` server-only adapter:

1. Read `EVENT_STAGE`, `PROGRAM_PUBLISHED`, `TICKETS_SOLD_OUT`, and `SPONSORSHIP_PHASE`.
2. Validate all values.
3. Call the pure stage derivation.
4. Export the resulting immutable presentation object.

Remove `PROGRAM_PHASE` and `TICKETING_PHASE` completely from code, `.env.example`, `.env.local`,
README documentation, and deployment configuration.

## 5. Copy and CTA contract

Every stage must define all of the following in one place:

- Hero eyebrow, title, and description
- Primary and secondary hero actions
- Header action
- Mobile-menu action
- Homepage section order
- Program and ticketing headings
- Schedule and speaker page headings
- Root, schedule, and speaker metadata
- Open Graph descriptions
- Archive year labels

### Required CTA behavior

- `teaser`: no schedule or ticket CTA before those resources are public.
- `cfp`: primary CTA must be the CFP URL. If no CFP URL is configured, fail the build rather than
  silently replacing it with an unrelated action.
- `tickets`: ticket actions must appear consistently in hero, desktop header, mobile menu, and
  ticket section.
- `tickets` with `PROGRAM_PUBLISHED=true`: schedule becomes the primary planning action; tickets
  remain available.
- `tickets` with `TICKETS_SOLD_OUT=true`: remove all purchase actions and show consistent sold-out
  messaging on desktop and mobile.
- `live`: prioritize the live/mobile schedule; remove sales language.
- `recap`: prioritize gallery and recordings; remove tickets, hotels, and future-tense venue copy.

## 6. Work packages

### WP1: Test foundation and current-state baseline

Files:

- `web/package.json`
- `web/vitest.config.ts`
- `web/test/setup.ts`

Tasks:

- Add Vitest for pure state-contract tests.
- Add `npm test` and `npm run test:watch` scripts.
- Capture the current recap behavior as baseline assertions before restructuring.
- Keep tests independent from Fienta, Sessionize, Lightroom, and YouTube network calls.

Exit criteria:

- `npm test --prefix web` runs locally and in CI.
- Current recap expectations are encoded before production code is migrated.

### WP2: Introduce the canonical stage model

Files:

- `web/lib/site-state-types.ts`
- `web/lib/site-presentation.ts`
- `web/lib/site-state.ts`
- `web/lib/event-config.ts`

Tasks:

- Replace the four-axis event model with `EventStage` plus `SponsorshipPhase`.
- Implement a pure exhaustive switch for all five stages, plus the two ticket options.
- Make TypeScript fail compilation when a new stage is added without a presentation mapping.
- Validate required stage-specific content such as CFP and ticket URLs.
- Remove compatibility fallbacks for the old variables.

Exit criteria:

- Each stage produces one complete, typed presentation contract.
- Invalid stages and missing required URLs fail with actionable errors.

### WP3: Centralize edition-specific content

Files:

- `web/lib/event-config.ts`
- `web/lib/constants.ts`
- `web/lib/event-gallery.ts`
- `web/lib/fienta.ts`
- `web/lib/sponsors-data.ts`

Tasks:

- Remove hardcoded edition years from visitor-facing strings.
- Separate featured, next, and archived edition data.
- Move gallery, playlist, community, ticket, and sponsorship URLs into the appropriate config group.
- Keep private Fienta credentials in environment variables; never move secrets into public config.

Exit criteria:

- Searching app and component code for the current edition year returns only intentional data or
  test fixtures.
- Changing the edition in event config updates every visible year label.

### WP4: Make hero and navigation stage-complete

Files:

- `web/components/home/hero.tsx`
- `web/components/layout/site-header.tsx`
- `web/components/layout/site-layout.tsx`
- `web/constants/menus.ts` or its Next.js equivalent

Tasks:

- Render hero copy and actions from the presentation contract.
- Filter desktop and mobile navigation from the same navigation state.
- Ensure hidden or preview program stages do not link to unpublished schedules.
- Represent open, sold-out, closed, live, and recap actions identically across breakpoints.

Exit criteria:

- Desktop and mobile expose the same capabilities for every stage.
- No stage shows a schedule, ticket, or CFP action when its resource is unavailable.

### WP5: Make homepage composition stage-complete

Files:

- `web/app/page.tsx`
- `web/components/home/*`

Tasks:

- Replace the current recap-versus-everything-else branch with a stage-driven section registry.
- Give each stage an explicit ordered section list.
- Pass presentation copy to About, Expect, Speakers, Schedule, Ticketing, Sponsors, Venue, and
  Hotels rather than letting components infer lifecycle state.
- Remove inappropriate copy such as diversity-ticket help in sold-out mode.
- Keep past-event photos available during future-event stages, but label them explicitly as previous
  edition highlights.

Exit criteria:

- Every stage has a deliberate information hierarchy.
- No future-tense and past-tense content is mixed unintentionally.

### WP6: Synchronize routes and metadata

Files:

- `web/lib/metadata.ts`
- `web/app/layout.tsx`
- `web/app/schedule/page.tsx`
- `web/app/speakers/page.tsx`
- `web/app/app/schedule/layout.tsx`
- schedule and speaker detail metadata generators

Tasks:

- Generate root metadata from the active stage.
- Generate current, preview, live, or archive metadata for schedule and speakers.
- Apply `noIndex` while program pages are not publicly linked.
- Ensure titles, descriptions, Open Graph data, and visible headings agree.

Exit criteria:

- No route says “archive” in a current-program stage.
- Search metadata matches visible page purpose for all five stages and both ticket options.

### WP7: Preserve independent sponsor recruiting

Files:

- `web/components/home/sponsors.tsx`
- `web/components/layout/site-header.tsx`
- `web/lib/sponsors-data.ts`

Tasks:

- Keep partner acknowledgements visible in every stage where sponsors are displayed.
- Use edition data rather than hardcoded `2026` and `2027` labels.
- Show recruiting actions only when `SPONSORSHIP_PHASE=recruiting`.
- Use an email-interest action when a next-edition prospectus is not yet ready.
- Do not imply that a previous-edition prospectus applies to the next edition.

Exit criteria:

- Closing recruiting removes all recruiting CTAs but never removes partner acknowledgements.
- Recruiting copy and links always refer to the intended next edition.

### WP8: Documentation, QA, and deployment configuration

Files:

- `web/.env.example`
- `web/README.md`
- test deployment environment settings

Tasks:

- Replace the current four-variable matrix with the canonical stage matrix.
- Document required content changes when rolling to a new edition.
- Update the test deployment to use `EVENT_STAGE=recap` and
  `SPONSORSHIP_PHASE=recruiting`.
- Remove obsolete deployment variables.
- Perform desktop and mobile visual QA for every stage.

Exit criteria:

- Documentation describes behavior that is asserted by tests.
- Test deployment contains no obsolete phase variables.

## 7. Required automated test matrix

Create table-driven tests for all five stages and each ticket option. Each row must assert at least:

| Assertion                   | Teaser    | CFP       | Tickets   | Program   | Sold out  | Live      | Recap   |
| --------------------------- | --------- | --------- | --------- | --------- | --------- | --------- | ------- |
| Correct hero copy key       | Yes       | Yes       | Yes       | Yes       | Yes       | Yes       | Yes     |
| Correct primary CTA         | Yes       | Yes       | Yes       | Yes       | Yes       | Yes       | Yes     |
| Ticket purchase visible     | No        | No        | Yes       | Yes       | No        | No        | No      |
| Schedule navigation visible | No        | No        | No        | Yes       | Yes       | Yes       | Archive |
| Speaker mode                | Hidden    | Preview   | Preview   | Published | Published | Published | Archive |
| Correct homepage order      | Yes       | Yes       | Yes       | Yes       | Yes       | Yes       | Yes     |
| Correct root metadata       | Yes       | Yes       | Yes       | Yes       | Yes       | Yes       | Yes     |
| Correct schedule metadata   | `noIndex` | `noIndex` | `noIndex` | Current   | Current   | Live      | Archive |

Additional tests:

- Every allowed stage parses successfully.
- Every unknown stage throws an actionable error.
- CFP without a CFP URL fails validation.
- Ticket stages without a ticket URL fail validation.
- Sponsorship `closed` removes all recruiting actions.
- Sponsorship `recruiting` adds the same action to desktop, mobile, and sponsor section.
- No combination can produce recap copy together with an active purchase action.
- All action URLs are serializable and safe to pass from Server to Client Components.

Avoid broad snapshots as the only evidence. Assert semantic values and capabilities explicitly.

## 8. Manual QA checklist

For each stage at desktop and mobile widths:

- Confirm hero title, description, background treatment, and both actions.
- Confirm desktop and mobile navigation contain the same destinations.
- Confirm homepage section order.
- Confirm ticket state and absence of stale purchase language.
- Confirm schedule and speaker headings.
- Confirm sponsor acknowledgement and recruiting CTA state.
- Confirm title, description, canonical URL, and Open Graph metadata.
- Confirm there is no horizontal overflow.
- Confirm keyboard focus, menu operation, and accessible action names.
- Confirm direct schedule and speaker URLs have the intended `robots` behavior.

## 9. Implementation order

Execute the work in this order:

1. WP1 — test foundation and recap baseline
2. WP2 — canonical stage model
3. WP3 — content centralization
4. WP4 — hero and navigation
5. WP5 — homepage composition
6. WP6 — routes and metadata
7. WP7 — sponsor recruiting
8. WP8 — documentation, deployment config, and complete QA

Do not migrate components opportunistically before the pure stage contract and tests exist. The
contract is the source of truth for every later work package.

## 10. Definition of done

The migration is complete only when:

- `EVENT_STAGE` is the lifecycle value, with `PROGRAM_PUBLISHED` and `TICKETS_SOLD_OUT` scoped to
  the `tickets` stage.
- `SPONSORSHIP_PHASE` is the only independent campaign state.
- The old event, program, and ticketing variables no longer exist.
- All five stages and both ticket options have distinct, appropriate copy and CTAs.
- Header, mobile menu, homepage, routes, and metadata agree for every stage.
- No visitor-facing edition year is unintentionally hardcoded.
- Stage and sponsorship matrices are covered by automated tests.
- `npm test --prefix web` passes.
- `npm run lint --prefix web` passes without warnings or errors.
- `npm run build --prefix web` passes.
- Markdownlint and `git diff --check` pass.
- Desktop and mobile visual QA is recorded for every stage.

## 11. Content inputs needed before specific stages go live

These do not block implementing the architecture, but the corresponding stage must fail validation
or use an explicitly approved fallback until the content exists:

- Confirmed next-event date and venue for `teaser`
- CFP URL, deadline, and topic guidance for `cfp`
- Comma-separated Sessionize speaker IDs in `ANNOUNCED_SPEAKER_IDS` for the CFP and ticket-preview states
- Current Fienta event and checkout URLs for `tickets`
- Current Sessionize event ID for the published `tickets` option and `live`
- Confirmed next-edition sponsor prospectus URL, or approval to use email interest only
- Updated social-preview image and stage-appropriate Open Graph copy

## 12. Out of scope

- Using environment variables as authorization for private content
- Building a CMS for event lifecycle management
- Changing Sessionize, Fienta, Lightroom, or YouTube providers
- Migrating the legacy Gatsby application
- Automatically switching stages by date without an explicit deployment decision
