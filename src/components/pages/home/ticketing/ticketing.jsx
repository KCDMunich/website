import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_EVENT = {
  title: 'Cloud Native Summit Munich 2026',
  dateRange: '29-30 June 2026',
  location: 'Munich',
  currency: 'EUR',
};

const getEventFromPayload = (payload) => {
  if (!payload) return null;

  if (payload.event) return payload.event;
  if (payload.data?.event) return payload.data.event;
  if (payload.data && !Array.isArray(payload.data)) return payload.data;

  return payload;
};

const getTicketsFromEvent = (event) =>
  event?.ticket_types || event?.ticketTypes || event?.tickets || event?.ticket_types_summary || [];

const resolvePrice = (ticket) => {
  if (ticket?.price_cents || ticket?.price_in_cents) {
    return (ticket.price_cents || ticket.price_in_cents) / 100;
  }

  return ticket?.price ?? ticket?.amount ?? ticket?.unit_price ?? null;
};

const normalizeTickets = (rawTickets, currency) =>
  rawTickets
    .map((ticket, index) => {
      const salesStart = ticket?.sales_start_date || ticket?.salesStart || ticket?.start_date;
      const salesEnd = ticket?.sales_end_date || ticket?.salesEnd || ticket?.end_date;
      const startDate = salesStart ? new Date(salesStart) : null;
      const endDate = salesEnd ? new Date(salesEnd) : null;
      const now = new Date();
      const withinSalesWindow =
        (!startDate || startDate <= now) && (!endDate || endDate >= now);
      const isSoldOut =
        ticket?.sold_out ||
        ticket?.is_sold_out ||
        ticket?.is_temporarily_sold_out ||
        ticket?.amount_left === 0 ||
        ticket?.remaining === 0;
      const isOnSale =
        ticket?.is_on_sale ?? ticket?.on_sale ?? ticket?.available ?? withinSalesWindow;

      return {
        id: ticket?.uuid || ticket?.id || ticket?.pk || `ticket-${index}`,
        title: ticket?.title || ticket?.name || ticket?.label,
        description: ticket?.description || ticket?.details || '',
        price: resolvePrice(ticket),
        currency: ticket?.currency || currency,
        isSoldOut,
        isOnSale,
        amountLeft: ticket?.amount_left ?? ticket?.remaining ?? null,
        salesEnd: endDate,
      };
    })
    .filter((ticket) => ticket.title);

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

const Ticketing = () => {
  const apiUrl = process.env.GATSBY_FIENTA_API_URL;
  const apiToken = process.env.GATSBY_FIENTA_API_TOKEN;
  const fallbackCheckoutUrl = process.env.GATSBY_FIENTA_EVENT_URL;

  const [status, setStatus] = useState(apiUrl ? 'loading' : 'idle');
  const [eventData, setEventData] = useState(DEFAULT_EVENT);
  const [tickets, setTickets] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(fallbackCheckoutUrl || '');

  useEffect(() => {
    if (!apiUrl || typeof window === 'undefined') return;

    let isMounted = true;

    const fetchTickets = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: apiToken ? { Authorization: `Bearer ${apiToken}` } : undefined,
        });

        if (!response.ok) {
          throw new Error('Fienta request failed');
        }

        const payload = await response.json();
        const event = getEventFromPayload(payload);
        const normalizedEvent = {
          title: event?.title || DEFAULT_EVENT.title,
          dateRange: event?.date_range || DEFAULT_EVENT.dateRange,
          location: event?.location || event?.venue || DEFAULT_EVENT.location,
          currency: event?.currency || DEFAULT_EVENT.currency,
        };
        const ticketList = normalizeTickets(getTicketsFromEvent(event), normalizedEvent.currency);
        const eventCheckoutUrl =
          event?.url ||
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
  }, [apiUrl, apiToken, fallbackCheckoutUrl]);

  const availableTickets = useMemo(
    () => tickets.filter((ticket) => ticket.isOnSale && !ticket.isSoldOut),
    [tickets]
  );

  return (
    <section id="tickets" className="safe-paddings relative bg-white py-24 lg:py-20 md:py-16">
      <div className="mx-auto w-full max-w-[1248px]">
        <div className="grid grid-cols-2 items-start gap-16 lg:grid-cols-1 lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-1/90">
              Tickets powered by Fienta
            </p>
            <h2 className="mt-4 text-5xl font-bold leading-tight text-primary-1 md:text-4xl sm:text-3xl">
              Secure your spot at the Summit
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-base">
              Live ticket inventory and pricing are synced directly from Fienta, so availability is
              always current. Pick your pass and complete checkout in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <div className="rounded-full border border-slate-200 px-4 py-2">
                {eventData.dateRange}
              </div>
              <div className="rounded-full border border-slate-200 px-4 py-2">
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

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-8 shadow-lg shadow-slate-200/40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-1/80">
                  Live ticket status
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  {eventData.title}
                </h3>
              </div>
              <span className="rounded-full bg-lightYellow px-3 py-1 text-xs font-semibold text-slate-700">
                Live sync
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {status === 'loading' && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                  Syncing ticket data from Fienta...
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-xl border border-dashed border-rose-200 bg-white px-4 py-6 text-center text-sm text-rose-500">
                  Tickets are temporarily unavailable. Please check back soon.
                </div>
              )}

              {status !== 'loading' && status !== 'error' && availableTickets.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                  Ticket sales will open soon. Stay tuned!
                </div>
              )}

              {availableTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">{ticket.title}</p>
                    {ticket.description && (
                      <p className="mt-1 text-sm text-slate-500">{ticket.description}</p>
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
                      <p className="mt-1 text-xs text-slate-500">
                        {ticket.amountLeft} left
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-slate-500">Checkout is handled by Fienta.</p>
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
                  Add `GATSBY_FIENTA_EVENT_URL` to enable checkout.
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
