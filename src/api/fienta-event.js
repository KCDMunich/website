const buildAuthHeaders = (apiKey, mode) => {
  if (!apiKey) return {};

  if (mode === 'token') return { Authorization: `Token ${apiKey}` };
  if (mode === 'x-api-key') return { 'X-API-KEY': apiKey };

  return { Authorization: `Bearer ${apiKey}` };
};

const fetchJson = async (url, headersList) => {
  let lastStatus = null;

  for (const headers of headersList) {
    const response = await fetch(url, { headers });
    lastStatus = response.status;
    if (response.ok) {
      return response.json();
    }
    if (![401, 403].includes(response.status)) {
      break;
    }
  }

  return { error: true, status: lastStatus };
};

const sanitizeTicketType = (ticket) => ({
  id: ticket?.id,
  uuid: ticket?.uuid,
  pk: ticket?.pk,
  title: ticket?.title,
  name: ticket?.name,
  label: ticket?.label,
  description: ticket?.description,
  details: ticket?.details,
  translations: ticket?.translations,
  price: ticket?.price,
  amount: ticket?.amount,
  unit_price: ticket?.unit_price,
  price_cents: ticket?.price_cents,
  price_in_cents: ticket?.price_in_cents,
  currency: ticket?.currency,
  sold_out: ticket?.sold_out,
  is_sold_out: ticket?.is_sold_out,
  is_temporarily_sold_out: ticket?.is_temporarily_sold_out,
  amount_left: ticket?.amount_left,
  remaining: ticket?.remaining,
  ticket_limit: ticket?.ticket_limit,
  tickets_sold: ticket?.tickets_sold,
  visible_start: ticket?.visible_start,
  visible_end: ticket?.visible_end,
  sales_start_date: ticket?.sales_start_date,
  sales_end_date: ticket?.sales_end_date,
  salesStart: ticket?.salesStart,
  salesEnd: ticket?.salesEnd,
  start_date: ticket?.start_date,
  end_date: ticket?.end_date,
  is_on_sale: ticket?.is_on_sale,
  on_sale: ticket?.on_sale,
  available: ticket?.available,
});

const sanitizeEvent = (event) => ({
  id: event?.id,
  event_id: event?.event_id,
  pk: event?.pk,
  slug: event?.slug,
  title_url: event?.title_url,
  url_slug: event?.url_slug,
  title: event?.title,
  name: event?.name,
  translations: event?.translations,
  url: event?.url,
  public_url: event?.public_url,
  event_url: event?.event_url,
  event_full_url: event?.event_full_url,
  checkout_url: event?.checkout_url,
  checkoutUrl: event?.checkoutUrl,
  starts_at: event?.starts_at,
  start_time: event?.start_time,
  start_date: event?.start_date,
  start: event?.start,
  ends_at: event?.ends_at,
  end_time: event?.end_time,
  end_date: event?.end_date,
  end: event?.end,
  city: event?.city,
  location: event?.location,
  venue: event?.venue,
  address: event?.address
    ? {
        city: event.address?.city,
        line1: event.address?.line1,
        line2: event.address?.line2,
        postal_code: event.address?.postal_code,
        country: event.address?.country,
      }
    : null,
  currency: event?.currency,
  ticket_currency: event?.ticket_currency,
  ticket_types: Array.isArray(event?.ticket_types)
    ? event.ticket_types.map(sanitizeTicketType)
    : event?.ticket_types,
  ticketTypes: Array.isArray(event?.ticketTypes)
    ? event.ticketTypes.map(sanitizeTicketType)
    : event?.ticketTypes,
  ticket_types_summary: Array.isArray(event?.ticket_types_summary)
    ? event.ticket_types_summary.map(sanitizeTicketType)
    : event?.ticket_types_summary,
});

const sanitizePayload = (payload) => {
  if (!payload) return payload;

  if (Array.isArray(payload)) {
    return payload.map(sanitizeEvent);
  }

  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return { data: payload.data.map(sanitizeEvent) };
    }
    if (payload.data?.id || payload.data?.event_id) {
      return { data: sanitizeEvent(payload.data) };
    }
  }

  if (Array.isArray(payload.events)) {
    return { events: payload.events.map(sanitizeEvent) };
  }

  if (payload.id || payload.event_id) {
    return sanitizeEvent(payload);
  }

  return payload;
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const proxyToken = process.env.FIENTA_PROXY_TOKEN;
  if (proxyToken) {
    const headerToken = req.headers['x-fienta-proxy-token'];
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (headerToken !== proxyToken && bearerToken !== proxyToken) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  }

  const baseUrl = process.env.GATSBY_FIENTA_BASE_URL || 'https://fienta.com/api/v1';
  const eventId = process.env.GATSBY_FIENTA_EVENT_ID;
  const organizerId = process.env.GATSBY_FIENTA_ORGANIZER_ID;
  const seriesId = process.env.GATSBY_FIENTA_SERIES_ID;
  const locale = process.env.GATSBY_FIENTA_LOCALE || 'de';
  const apiKey = process.env.FIENTA_API_KEY;

  const searchParams = new URLSearchParams();
  if (locale) searchParams.set('locale', locale);
  if (organizerId) searchParams.set('organizer', organizerId);
  if (seriesId) searchParams.set('series_id', seriesId);

  const queryString = searchParams.toString();
  const publicEventsUrl = `${baseUrl}/public/events`;
  const publicListUrl = `${publicEventsUrl}${queryString ? `?${queryString}` : ''}`;
  const publicDetailUrl = eventId
    ? `${publicEventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}`
    : '';

  const privateEventsUrl = `${baseUrl}/events`;
  const privateListUrl = `${privateEventsUrl}${queryString ? `?${queryString}` : ''}`;
  const privateDetailUrl = eventId
    ? `${privateEventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}`
    : '';

  // Ticket-types endpoint (requires API key)
  const ticketTypesUrl = eventId ? `${baseUrl}/events/${eventId}/ticket-types` : '';

  const headersList = apiKey
    ? [
        buildAuthHeaders(apiKey, 'bearer'),
        buildAuthHeaders(apiKey, 'token'),
        buildAuthHeaders(apiKey, 'x-api-key'),
      ]
    : [{}];

  const candidates = [];
  if (apiKey && privateDetailUrl) candidates.push({ url: privateDetailUrl, headersList });
  if (apiKey && privateListUrl) candidates.push({ url: privateListUrl, headersList });
  if (publicDetailUrl) candidates.push({ url: publicDetailUrl, headersList: [{}] });
  candidates.push({ url: publicListUrl, headersList: [{}] });

  let eventPayload = null;
  for (const candidate of candidates) {
    const payload = await fetchJson(candidate.url, candidate.headersList);
    if (payload && !payload.error) {
      eventPayload = payload;
      break;
    }
  }

  if (!eventPayload) {
    res.status(502).json({ error: 'Fienta request failed' });
    return;
  }

  // Fetch ticket types separately if we have an API key and event ID
  if (apiKey && ticketTypesUrl) {
    const ticketTypesPayload = await fetchJson(ticketTypesUrl, headersList);
    if (ticketTypesPayload && !ticketTypesPayload.error && ticketTypesPayload.data) {
      // Merge ticket types into event data
      if (eventPayload.data) {
        eventPayload.data.ticket_types = ticketTypesPayload.data;
      } else if (Array.isArray(eventPayload.events)) {
        // If it's a list, add to the matching event
        const matchingEvent = eventPayload.events.find((e) => String(e.id) === String(eventId));
        if (matchingEvent) {
          matchingEvent.ticket_types = ticketTypesPayload.data;
        }
      }
    }
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.setHeader('Vary', 'Authorization, X-Fienta-Proxy-Token');
  res.status(200).json(sanitizePayload(eventPayload));
}
