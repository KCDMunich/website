import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_EVENT = {
  title: 'Cloud Native Summit Munich 2026',
  dateRange: '29-30 June 2026',
  location: 'Munich',
  currency: 'EUR',
};

const getEventsFromPayload = (payload) => {
  if (!payload) return null;

  if (Array.isArray(payload)) return payload;
  if (payload?.id || payload?.event_id) return [payload];
  if (Array.isArray(payload.events)) return payload.events;
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data?.id || payload.data?.event_id) return [payload.data];
  if (Array.isArray(payload.data?.events)) return payload.data.events;

  return [];
};

const getEventFromList = (events, { id, slug, url }) => {
  if (!events || events.length === 0) return null;

  if (id) {
    const match = events.find(
      (event) => String(event?.id || event?.event_id || event?.pk) === String(id)
    );
    if (match) return match;
  }

  if (slug) {
    const match = events.find((event) => {
      const eventSlug = event?.slug || event?.title_url || event?.url_slug;
      if (eventSlug && eventSlug === slug) return true;
      return event?.url?.includes(`/${slug}`) || event?.public_url?.includes(`/${slug}`);
    });
    if (match) return match;
  }

  if (url) {
    const match = events.find(
      (event) => event?.url === url || event?.public_url === url || event?.event_url === url
    );
    if (match) return match;
  }

  return events[0];
};

const getTicketsFromEvent = (event) =>
  event?.ticket_types || event?.ticketTypes || event?.tickets || event?.ticket_types_summary || [];

const resolvePrice = (ticket) => {
  if (ticket?.price_cents || ticket?.price_in_cents) {
    return (ticket.price_cents || ticket.price_in_cents) / 100;
  }

  // Handle string prices (e.g., "149.00" from Fienta)
  const priceValue = ticket?.price ?? ticket?.amount ?? ticket?.unit_price ?? null;
  if (typeof priceValue === 'string') {
    const parsed = parseFloat(priceValue);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return priceValue;
};

const formatCurrency = (value, currency) => {
  if (value === null || value === undefined) return 'On request';
  if (!Number.isFinite(value)) return `${value}`;

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
};

const formatDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};

const resolveEventDateRange = (event) => {
  const start = event?.starts_at || event?.start_time || event?.start_date || event?.start;
  const end = event?.ends_at || event?.end_time || event?.end_date || event?.end;
  const startLabel = formatDate(start);
  const endLabel = formatDate(end);

  if (startLabel && endLabel) {
    return `${startLabel} - ${endLabel}`;
  }

  return startLabel || endLabel || DEFAULT_EVENT.dateRange;
};

const normalizeTickets = (rawTickets, currency, locale = 'de') =>
  rawTickets
    .map((ticket, index) => {
      // Handle Fienta's visible_start/visible_end fields
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
      const isSoldOut =
        ticket?.sold_out ||
        ticket?.is_sold_out ||
        ticket?.is_temporarily_sold_out ||
        ticket?.amount_left === 0 ||
        ticket?.remaining === 0 ||
        (ticket?.ticket_limit !== null &&
          ticket?.tickets_sold !== undefined &&
          ticket?.tickets_sold >= ticket?.ticket_limit);
      const isOnSale =
        ticket?.is_on_sale ?? ticket?.on_sale ?? ticket?.available ?? withinSalesWindow;

      // Handle Fienta's translations structure
      const translations = ticket?.translations;
      const localizedData = translations?.[locale] || translations?.en || translations?.de || {};
      const title = localizedData?.title || ticket?.title || ticket?.name || ticket?.label;
      const description = localizedData?.body || ticket?.description || ticket?.details || '';

      // Calculate remaining tickets if limit is set
      const ticketLimit = ticket?.ticket_limit;
      const ticketsSold = ticket?.tickets_sold ?? 0;
      const amountLeft =
        ticket?.amount_left ??
        ticket?.remaining ??
        (ticketLimit !== null && ticketLimit !== undefined ? ticketLimit - ticketsSold : null);

      return {
        id: ticket?.uuid || ticket?.id || ticket?.pk || `ticket-${index}`,
        title,
        description,
        price: resolvePrice(ticket),
        currency: ticket?.currency || currency,
        isSoldOut,
        isOnSale,
        amountLeft,
        salesEnd: endDate,
      };
    })
    .filter((ticket) => ticket.title);

const getSlugFromUrl = (url) => {
  if (!url) return '';
  try {
    return new URL(url).pathname.split('/').filter(Boolean).pop() || '';
  } catch (error) {
    return '';
  }
};

const Ticketing = () => {
  const baseUrl = process.env.GATSBY_FIENTA_BASE_URL || 'https://fienta.com/api/v1';
  const eventSlug =
    process.env.GATSBY_FIENTA_EVENT_SLUG || getSlugFromUrl(process.env.GATSBY_FIENTA_EVENT_URL);
  const eventId = process.env.GATSBY_FIENTA_EVENT_ID;
  const organizerId = process.env.GATSBY_FIENTA_ORGANIZER_ID;
  const seriesId = process.env.GATSBY_FIENTA_SERIES_ID;
  const locale = process.env.GATSBY_FIENTA_LOCALE || 'de';
  const fallbackCheckoutUrl = process.env.GATSBY_FIENTA_EVENT_URL;
  const eventsUrl = `${baseUrl}/public/events`;
  const searchParams = new URLSearchParams();

  if (locale) searchParams.set('locale', locale);
  if (organizerId) searchParams.set('organizer', organizerId);
  if (seriesId) searchParams.set('series_id', seriesId);

  const queryString = searchParams.toString();
  const listUrl = `${eventsUrl}${queryString ? `?${queryString}` : ''}`;
  const detailUrl = eventId ? `${eventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}` : '';
  const proxyUrl = process.env.GATSBY_FIENTA_PROXY_URL || '/api/fienta-event';
  const apiUrl = proxyUrl;

  const [status, setStatus] = useState(
    organizerId || seriesId || eventSlug || eventId ? 'loading' : 'idle'
  );
  const [eventData, setEventData] = useState(DEFAULT_EVENT);
  const [tickets, setTickets] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(fallbackCheckoutUrl || '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!organizerId && !seriesId && !eventSlug && !eventId) return;

    let isMounted = true;

    const fetchTickets = async () => {
      try {
        const fetchJson = async (url) => {
          const proxyToken = process.env.GATSBY_FIENTA_PROXY_TOKEN;
          const headers = proxyToken ? { 'X-Fienta-Proxy-Token': proxyToken } : undefined;
          const response = await fetch(url, { headers });
          if (!response.ok) return null;
          return response.json();
        };

        let payload = await fetchJson(apiUrl);
        if (!payload && detailUrl) {
          payload = await fetchJson(detailUrl);
        }
        if (!payload && listUrl) {
          payload = await fetchJson(listUrl);
        }

        if (!payload) {
          throw new Error('Fienta request failed');
        }
        const events = getEventsFromPayload(payload);
        const event = getEventFromList(events, {
          id: eventId,
          slug: eventSlug,
          url: fallbackCheckoutUrl,
        });

        // Handle Fienta's translations structure for event data
        const eventTranslations = event?.translations;
        const eventLocalizedData =
          eventTranslations?.[locale] || eventTranslations?.en || eventTranslations?.de || {};
        const eventTitle =
          eventLocalizedData?.title || event?.title || event?.name || DEFAULT_EVENT.title;
        const eventVenue =
          eventLocalizedData?.venue ||
          event?.city ||
          event?.location ||
          event?.venue ||
          eventLocalizedData?.address?.city ||
          event?.address?.city ||
          DEFAULT_EVENT.location;

        const normalizedEvent = {
          title: eventTitle,
          dateRange: resolveEventDateRange(event),
          location: eventVenue,
          currency: event?.currency || event?.ticket_currency || DEFAULT_EVENT.currency,
        };
        const ticketList = normalizeTickets(
          getTicketsFromEvent(event),
          normalizedEvent.currency,
          locale
        );
        const eventCheckoutUrl =
          event?.url ||
          event?.public_url ||
          event?.event_full_url ||
          event?.checkout_url ||
          event?.checkoutUrl ||
          fallbackCheckoutUrl ||
          '';

        if (isMounted) {
          setEventData(normalizedEvent);
          setTickets(ticketList);
          setCheckoutUrl(eventCheckoutUrl);
          setStatus('ready');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    fetchTickets();

    return () => {
      isMounted = false;
    };
  }, [apiUrl, eventId, eventSlug, fallbackCheckoutUrl, locale, organizerId, seriesId]);

  const visibleTickets = useMemo(
    () => tickets.filter((t) => !t.isSoldOut && t.isOnSale),
    [tickets]
  );

  return (
    <section id="tickets" className="safe-paddings relative bg-white py-24 lg:py-20 md:py-16">
      <div className="mx-auto w-full max-w-[1248px]">
        <div className="grid grid-cols-2 items-stretch gap-16 lg:grid-cols-1 lg:gap-12">
          <div className="flex h-full flex-col">
            <div>
              <h2 className="mt-4 text-5xl font-bold leading-tight text-primary-1 md:text-4xl sm:text-3xl">
                Secure your spot at the Summit
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-base">
                Head to Munich on June 29–30, 2026, for two full days of cloud-native talks,
                hands-on workshops, and great networking. Pick your ticket type and reserve your
                place—see you there!
              </p>
            </div>
            <div className="mt-auto pt-8">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="rounded-full border border-slate-300 bg-[#f8fafc] px-4 py-2 text-slate-700 shadow-sm">
                  {eventData.dateRange}
                </div>
                <div className="rounded-full border border-slate-300 bg-[#f8fafc] px-4 py-2 text-slate-700 shadow-sm">
                  {eventData.location}
                </div>
              </div>
              <p className="mt-8 text-sm text-slate-500">
                Need a diversity ticket? Contact{' '}
                <a
                  className="font-semibold text-primary-1 hover:text-primary-1/80"
                  href="mailto:team@cloudnativesummit.de"
                >
                  team@cloudnativesummit.de
                </a>
                .
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc]/80 p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-1/80">
                  Live ticket status
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{eventData.title}</h3>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                Live
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {status === 'loading' && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-[#f8fafc] px-4 py-6 text-center text-sm text-slate-500">
                  Syncing ticket data from Fienta...
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-xl border border-dashed border-rose-200 bg-[#f8fafc] px-4 py-6 text-center text-sm text-rose-500">
                  Tickets are temporarily unavailable. Please check back soon.
                </div>
              )}

              {status !== 'loading' && status !== 'error' && visibleTickets.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-[#f8fafc] px-4 py-6 text-center text-sm text-slate-500">
                  Ticket sales will open soon. Stay tuned!
                </div>
              )}

              {visibleTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#f8fafc] px-5 py-4"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">{ticket.title}</p>
                    {ticket.description && (
                      <p className="mt-1 text-sm text-slate-500">{ticket.description}</p>
                    )}
                    {!ticket.isOnSale && !ticket.isSoldOut && (
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-amber-500">
                        Sales opening soon
                      </p>
                    )}
                    {ticket.isSoldOut && (
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-rose-500">
                        Sold out
                      </p>
                    )}
                    {ticket.salesEnd && (
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Sales end {formatDate(ticket.salesEnd)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary-1">
                      {formatCurrency(ticket.price, ticket.currency)}
                    </p>
                    {ticket.amountLeft !== null && (
                      <p className="mt-1 text-xs text-slate-500">{ticket.amountLeft} left</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              {checkoutUrl ? (
                <a
                  className="button px-6 py-3 text-base"
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy tickets
                </a>
              ) : (
                <span className="text-xs text-slate-400">
                  Ticket sales open soon. Please check back later.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticketing;
