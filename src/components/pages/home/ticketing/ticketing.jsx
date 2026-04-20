import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_EVENT = {
  title: 'Cloud Native Summit Munich 2026',
  dateRange: '29-30 June 2026',
  location: 'Munich',
  currency: 'EUR',
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

const toNetPrice = (grossValue, vatRate = 0.19) => {
  if (grossValue === null || grossValue === undefined) return grossValue;
  if (!Number.isFinite(grossValue)) return grossValue;
  return grossValue / (1 + vatRate);
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
  const fallbackCheckoutUrl = process.env.GATSBY_FIENTA_EVENT_URL;
  const proxyUrl = process.env.GATSBY_FIENTA_PROXY_URL || '/api/fienta-event';

  const [status, setStatus] = useState('loading');
  const [eventData, setEventData] = useState(DEFAULT_EVENT);
  const [tickets, setTickets] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(fallbackCheckoutUrl || '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const fetchTickets = async () => {
      try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error('Fienta request failed');
        }
        const payload = await response.json();
        const normalizedEvent = {
          ...DEFAULT_EVENT,
          ...(payload?.event || {}),
        };
        const ticketList = Array.isArray(payload?.tickets) ? payload.tickets : [];
        const eventCheckoutUrl = payload?.event?.checkoutUrl || fallbackCheckoutUrl || '';

        if (isMounted) {
          setEventData(normalizedEvent);
          setTickets(ticketList);
          setCheckoutUrl(eventCheckoutUrl);
          setStatus('ready');
        }
      } catch {
        if (isMounted) {
          setTickets([]);
          setCheckoutUrl(fallbackCheckoutUrl || '');
          setStatus(fallbackCheckoutUrl ? 'ready' : 'error');
        }
      }
    };

    fetchTickets();

    return () => {
      isMounted = false;
    };
  }, [fallbackCheckoutUrl, proxyUrl]);

  const visibleTickets = useMemo(
    () => tickets.filter((t) => !t.isSoldOut && t.isOnSale),
    [tickets]
  );

  return (
    <section id="tickets" className="safe-paddings relative bg-white py-24 lg:py-20 md:py-16">
      <div className="container">
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

          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc]/80 p-8 sm:p-6 xs:p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{eventData.title}</h3>
              </div>
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
                  className="flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4"
                >
                  <div className="flex-1">
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
                  <div className="mt-auto self-end text-right">
                    <p className="text-lg font-semibold text-primary-1">
                      {formatCurrency(toNetPrice(ticket.price), ticket.currency)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Net + 19% VAT</p>
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
