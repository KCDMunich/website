const DEFAULT_EVENT = {
  title: 'Cloud Native Summit Munich 2026',
  dateRange: '29-30 June 2026',
  location: 'Munich',
  currency: 'EUR',
};

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

const getEventsFromPayload = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload?.id || payload?.event_id) return [payload];
  if (Array.isArray(payload?.events)) return payload.events;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data?.id || payload?.data?.event_id) return [payload.data];
  if (Array.isArray(payload?.data?.events)) return payload.data.events;

  return [];
};

const getEventFromPayload = (payload, eventId) => {
  const events = getEventsFromPayload(payload);

  if (events.length === 0) return null;
  if (!eventId) return null;

  return (
    events.find((event) => String(event?.id || event?.event_id || event?.pk) === String(eventId)) ||
    null
  );
};

const getTicketsFromEvent = (event) =>
  event?.ticket_types || event?.ticketTypes || event?.tickets || event?.ticket_types_summary || [];

const getLocalizedValue = (translations, locale, key) => {
  const localizedData = translations?.[locale] || translations?.en || translations?.de || {};

  return localizedData?.[key];
};

const resolvePrice = (ticket) => {
  if (ticket?.price_cents || ticket?.price_in_cents) {
    return (ticket.price_cents || ticket.price_in_cents) / 100;
  }

  const priceValue = ticket?.price ?? ticket?.amount ?? ticket?.unit_price ?? null;
  if (typeof priceValue === 'string') {
    const parsed = parseFloat(priceValue);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return priceValue;
};

const formatDate = (value, locale = 'de') => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat(locale || 'de', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};

const resolveEventDateRange = (event, locale = 'de') => {
  const start = event?.starts_at || event?.start_time || event?.start_date || event?.start;
  const end = event?.ends_at || event?.end_time || event?.end_date || event?.end;
  const startLabel = formatDate(start, locale);
  const endLabel = formatDate(end, locale);

  if (startLabel && endLabel) {
    return `${startLabel} - ${endLabel}`;
  }

  return startLabel || endLabel || DEFAULT_EVENT.dateRange;
};

const normalizeTickets = (rawTickets, currency, locale = 'de') =>
  rawTickets
    .map((ticket, index) => {
      const salesStart =
        ticket?.visible_start ||
        ticket?.sales_start_date ||
        ticket?.salesStart ||
        ticket?.start_date;
      const salesEnd =
        ticket?.visible_end || ticket?.sales_end_date || ticket?.salesEnd || ticket?.end_date;
      const startDate = salesStart ? new Date(salesStart) : null;
      const endDate = salesEnd ? new Date(salesEnd) : null;
      const now = new Date();
      const withinSalesWindow = (!startDate || startDate <= now) && (!endDate || endDate >= now);
      const ticketLimit = ticket?.ticket_limit;
      const ticketsSold = ticket?.tickets_sold ?? 0;
      const isSoldOut =
        ticket?.sold_out ||
        ticket?.is_sold_out ||
        ticket?.is_temporarily_sold_out ||
        ticket?.amount_left === 0 ||
        ticket?.remaining === 0 ||
        (ticketLimit !== null &&
          ticketLimit !== undefined &&
          ticket?.tickets_sold !== undefined &&
          ticketsSold >= ticketLimit);
      const isOnSale =
        ticket?.is_on_sale ?? ticket?.on_sale ?? ticket?.available ?? withinSalesWindow;
      const title =
        getLocalizedValue(ticket?.translations, locale, 'title') ||
        ticket?.title ||
        ticket?.name ||
        ticket?.label;
      const description =
        getLocalizedValue(ticket?.translations, locale, 'body') ||
        ticket?.description ||
        ticket?.details ||
        '';
      const remainingCount =
        ticket?.amount_left ??
        ticket?.remaining ??
        (ticketLimit !== null && ticketLimit !== undefined ? ticketLimit - ticketsSold : null);

      return {
        id: ticket?.uuid || ticket?.id || ticket?.pk || `ticket-${index}`,
        title,
        description,
        price: resolvePrice(ticket),
        currency: ticket?.currency || currency || DEFAULT_EVENT.currency,
        isSoldOut: Boolean(isSoldOut),
        isOnSale: Boolean(isOnSale),
        amountLeft:
          remainingCount === null || remainingCount === undefined
            ? null
            : Math.max(0, remainingCount),
        salesEnd: salesEnd || null,
      };
    })
    .filter((ticket) => ticket.title);

const buildSnapshot = (event, locale, fallbackCheckoutUrl) => {
  const eventTitle =
    getLocalizedValue(event?.translations, locale, 'title') ||
    event?.title ||
    event?.name ||
    DEFAULT_EVENT.title;
  const eventLocation =
    getLocalizedValue(event?.translations, locale, 'venue') ||
    event?.venue ||
    event?.location ||
    event?.city ||
    event?.address?.city ||
    DEFAULT_EVENT.location;
  const eventCurrency = event?.currency || event?.ticket_currency || DEFAULT_EVENT.currency;
  const checkoutUrl =
    event?.buy_tickets_url ||
    event?.url ||
    event?.public_url ||
    event?.event_full_url ||
    event?.checkout_url ||
    event?.checkoutUrl ||
    fallbackCheckoutUrl ||
    '';

  return {
    event: {
      title: eventTitle,
      dateRange: resolveEventDateRange(event, locale),
      location: eventLocation,
      currency: eventCurrency,
      checkoutUrl,
    },
    tickets: normalizeTickets(getTicketsFromEvent(event), eventCurrency, locale),
    updatedAt: new Date().toISOString(),
  };
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const baseUrl = process.env.GATSBY_FIENTA_BASE_URL || 'https://fienta.com/api/v1';
  const eventId = process.env.GATSBY_FIENTA_EVENT_ID;
  const organizerId = process.env.GATSBY_FIENTA_ORGANIZER_ID;
  const seriesId = process.env.GATSBY_FIENTA_SERIES_ID;
  const locale = process.env.GATSBY_FIENTA_LOCALE || 'de';
  const apiKey = process.env.FIENTA_API_KEY;
  const fallbackCheckoutUrl = process.env.GATSBY_FIENTA_EVENT_URL || '';

  if (!eventId) {
    res.status(500).json({ error: 'Fienta configuration error: GATSBY_FIENTA_EVENT_ID is required' });
    return;
  }

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

  const event = getEventFromPayload(eventPayload, eventId);
  if (!event) {
    res.status(502).json({ error: 'Fienta event not found' });
    return;
  }

  if (apiKey && ticketTypesUrl) {
    const ticketTypesPayload = await fetchJson(ticketTypesUrl, headersList);
    if (ticketTypesPayload && !ticketTypesPayload.error && Array.isArray(ticketTypesPayload.data)) {
      event.ticket_types = ticketTypesPayload.data;
    }
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.status(200).json(buildSnapshot(event, locale, fallbackCheckoutUrl));
}