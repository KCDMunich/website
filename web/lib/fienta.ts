import { EVENT_CONFIG } from '@/lib/event-config';

export const DEFAULT_EVENT = {
  title: `${EVENT_CONFIG.upcoming.name} ${EVENT_CONFIG.upcoming.edition}`,
  dateRange: EVENT_CONFIG.upcoming.dateLabel,
  location: EVENT_CONFIG.upcoming.location,
  currency: 'EUR',
} as const;

export interface FientaTicket {
  id: string;
  title: string;
  description: string;
  price: number | null;
  currency: string;
  isSoldOut: boolean;
  isOnSale: boolean;
  amountLeft: number | null;
  salesEnd: string | null;
}

export interface FientaEventSnapshot {
  event: {
    title: string;
    dateRange: string;
    location: string;
    currency: string;
    checkoutUrl: string;
  };
  tickets: FientaTicket[];
  updatedAt: string;
}

type FientaTranslations = Record<string, Record<string, string>>;

type FientaRawTicket = {
  uuid?: string;
  id?: string | number;
  pk?: string | number;
  title?: string;
  name?: string;
  label?: string;
  description?: string;
  details?: string;
  currency?: string;
  visible_start?: string;
  sales_start_date?: string;
  salesStart?: string;
  start_date?: string;
  visible_end?: string;
  sales_end_date?: string;
  salesEnd?: string;
  end_date?: string;
  ticket_limit?: number;
  tickets_sold?: number;
  sold_out?: boolean;
  is_sold_out?: boolean;
  is_temporarily_sold_out?: boolean;
  amount_left?: number;
  remaining?: number;
  is_on_sale?: boolean;
  on_sale?: boolean;
  available?: boolean;
  price_cents?: number;
  price_in_cents?: number;
  price?: number | string;
  amount?: number | string;
  unit_price?: number | string;
  translations?: FientaTranslations;
};

type FientaRawEvent = FientaRawTicket & {
  starts_at?: string;
  start_time?: string;
  start_date?: string;
  start?: string;
  ends_at?: string;
  end_time?: string;
  end_date?: string;
  end?: string;
  venue?: string;
  location?: string;
  city?: string;
  address?: { city?: string };
  ticket_currency?: string;
  buy_tickets_url?: string;
  url?: string;
  public_url?: string;
  event_full_url?: string;
  checkout_url?: string;
  checkoutUrl?: string;
  ticket_types?: FientaRawTicket[];
  ticketTypes?: FientaRawTicket[];
  tickets?: FientaRawTicket[];
  ticket_types_summary?: FientaRawTicket[];
};

export type FientaConfig = {
  baseUrl: string;
  eventId: string;
  organizerId?: string;
  seriesId?: string;
  locale: string;
  apiKey?: string;
  fallbackCheckoutUrl: string;
};

type AuthMode = 'bearer' | 'token' | 'x-api-key';

export function getFientaConfig(): FientaConfig {
  return {
    baseUrl:
      process.env.FIENTA_BASE_URL ||
      process.env.GATSBY_FIENTA_BASE_URL ||
      'https://fienta.com/api/v1',
    eventId: process.env.FIENTA_EVENT_ID || process.env.GATSBY_FIENTA_EVENT_ID || '',
    organizerId: process.env.FIENTA_ORGANIZER_ID || process.env.GATSBY_FIENTA_ORGANIZER_ID,
    seriesId: process.env.FIENTA_SERIES_ID || process.env.GATSBY_FIENTA_SERIES_ID,
    locale: process.env.FIENTA_LOCALE || process.env.GATSBY_FIENTA_LOCALE || 'de',
    apiKey: process.env.FIENTA_API_KEY,
    fallbackCheckoutUrl:
      process.env.FIENTA_EVENT_URL ||
      process.env.GATSBY_FIENTA_EVENT_URL ||
      EVENT_CONFIG.upcoming.ticketUrl,
  };
}

export function buildAuthHeaders(apiKey: string, mode: AuthMode): Record<string, string> {
  if (!apiKey) return {};

  if (mode === 'token') return { Authorization: `Token ${apiKey}` };
  if (mode === 'x-api-key') return { 'X-API-KEY': apiKey };

  return { Authorization: `Bearer ${apiKey}` };
}

export async function fetchJson(url: string, headersList: Array<Record<string, string>>) {
  let lastStatus: number | null = null;

  for (const headers of headersList) {
    const response = await fetch(url, { headers, next: { revalidate: 300 } });
    lastStatus = response.status;
    if (response.ok) {
      return response.json();
    }
    if (![401, 403].includes(response.status)) {
      break;
    }
  }

  return { error: true, status: lastStatus };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEventsFromPayload(payload: any) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload?.id || payload?.event_id) return [payload];
  if (Array.isArray(payload?.events)) return payload.events;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data?.id || payload?.data?.event_id) return [payload.data];
  if (Array.isArray(payload?.data?.events)) return payload.data.events;

  return [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEventFromPayload(payload: any, eventId: string) {
  const events = getEventsFromPayload(payload);

  if (events.length === 0) return null;

  return (
    events.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => String(event?.id || event?.event_id || event?.pk) === String(eventId)
    ) || null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTicketsFromEvent(event: any) {
  return (
    event?.ticket_types || event?.ticketTypes || event?.tickets || event?.ticket_types_summary || []
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLocalizedValue(translations: any, locale: string, key: string) {
  const localizedData = translations?.[locale] || translations?.en || translations?.de || {};

  return localizedData?.[key];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolvePrice(ticket: any) {
  if (ticket?.price_cents || ticket?.price_in_cents) {
    return (ticket.price_cents || ticket.price_in_cents) / 100;
  }

  const priceValue = ticket?.price ?? ticket?.amount ?? ticket?.unit_price ?? null;
  if (typeof priceValue === 'string') {
    const parsed = parseFloat(priceValue);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return priceValue;
}

function formatDate(value: string | null | undefined, locale = 'de') {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat(locale || 'de', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveEventDateRange(event: any, locale = 'de') {
  const start = event?.starts_at || event?.start_time || event?.start_date || event?.start;
  const end = event?.ends_at || event?.end_time || event?.end_date || event?.end;
  const startLabel = formatDate(start, locale);
  const endLabel = formatDate(end, locale);

  if (startLabel && endLabel) {
    return `${startLabel} - ${endLabel}`;
  }

  return startLabel || endLabel || DEFAULT_EVENT.dateRange;
}

export function normalizeTickets(
  rawTickets: FientaRawTicket[],
  currency: string,
  locale = 'de'
): FientaTicket[] {
  return rawTickets
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
        id: String(ticket?.uuid || ticket?.id || ticket?.pk || `ticket-${index}`),
        title: String(title ?? ''),
        description: String(description ?? ''),
        price: resolvePrice(ticket),
        currency: String(ticket?.currency || currency || DEFAULT_EVENT.currency),
        isSoldOut: Boolean(isSoldOut),
        isOnSale: Boolean(isOnSale),
        amountLeft:
          remainingCount === null || remainingCount === undefined
            ? null
            : Math.max(0, Number(remainingCount)),
        salesEnd: salesEnd ? String(salesEnd) : null,
      };
    })
    .filter((ticket) => ticket.title);
}

export function buildSnapshot(
  event: FientaRawEvent,
  locale: string,
  fallbackCheckoutUrl: string
): FientaEventSnapshot {
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
      title: String(eventTitle),
      dateRange: resolveEventDateRange(event, locale),
      location: String(eventLocation),
      currency: String(eventCurrency),
      checkoutUrl: String(checkoutUrl),
    },
    tickets: normalizeTickets(
      getTicketsFromEvent(event) as FientaRawTicket[],
      String(eventCurrency),
      locale
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function buildFallbackSnapshot(
  fallbackCheckoutUrl = getFientaConfig().fallbackCheckoutUrl
): FientaEventSnapshot {
  return {
    event: {
      title: DEFAULT_EVENT.title,
      dateRange: DEFAULT_EVENT.dateRange,
      location: DEFAULT_EVENT.location,
      currency: DEFAULT_EVENT.currency,
      checkoutUrl: fallbackCheckoutUrl,
    },
    tickets: [],
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchFientaEventSnapshot(
  config: FientaConfig = getFientaConfig()
): Promise<FientaEventSnapshot> {
  const { baseUrl, eventId, organizerId, seriesId, locale, apiKey, fallbackCheckoutUrl } = config;

  if (!eventId) {
    return buildFallbackSnapshot(fallbackCheckoutUrl);
  }

  const searchParams = new URLSearchParams();
  if (locale) searchParams.set('locale', locale);
  if (organizerId) searchParams.set('organizer', organizerId);
  if (seriesId) searchParams.set('series_id', seriesId);

  const queryString = searchParams.toString();
  const publicEventsUrl = `${baseUrl}/public/events`;
  const publicListUrl = `${publicEventsUrl}${queryString ? `?${queryString}` : ''}`;
  const publicDetailUrl = `${publicEventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}`;

  const privateEventsUrl = `${baseUrl}/events`;
  const privateListUrl = `${privateEventsUrl}${queryString ? `?${queryString}` : ''}`;
  const privateDetailUrl = `${privateEventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}`;
  const ticketTypesUrl = `${baseUrl}/events/${eventId}/ticket-types`;

  const headersList: Array<Record<string, string>> = apiKey
    ? [
        buildAuthHeaders(apiKey, 'bearer'),
        buildAuthHeaders(apiKey, 'token'),
        buildAuthHeaders(apiKey, 'x-api-key'),
      ]
    : [{}];

  const candidates: Array<{
    url: string;
    headersList: Array<Record<string, string>>;
  }> = [];

  if (apiKey) {
    candidates.push({ url: privateDetailUrl, headersList });
    candidates.push({ url: privateListUrl, headersList });
  }

  candidates.push({ url: publicDetailUrl, headersList: [{}] });
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
    throw new Error('Fienta request failed');
  }

  const event = getEventFromPayload(eventPayload, eventId);
  if (!event) {
    throw new Error('Fienta event not found');
  }

  if (apiKey) {
    const ticketTypesPayload = await fetchJson(ticketTypesUrl, headersList);
    if (ticketTypesPayload && !ticketTypesPayload.error && Array.isArray(ticketTypesPayload.data)) {
      event.ticket_types = ticketTypesPayload.data;
    }
  }

  return buildSnapshot(event, locale, fallbackCheckoutUrl);
}
