'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EVENT_CONFIG } from '@/lib/event-config';
import type { FientaEventSnapshot, FientaTicket } from '@/lib/fienta';
import type { TicketingMode } from '@/lib/site-state-types';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

const DEFAULT_EVENT: Omit<FientaEventSnapshot['event'], 'checkoutUrl'> = {
  title: `${EVENT_CONFIG.upcoming.name} ${EVENT_CONFIG.upcoming.edition}`,
  dateRange: EVENT_CONFIG.upcoming.dateLabel,
  location: EVENT_CONFIG.upcoming.location,
  currency: 'EUR',
};

const FALLBACK_CHECKOUT_URL = EVENT_CONFIG.upcoming.ticketUrl;

function formatCurrency(value: number | null, currency: string) {
  if (value === null || value === undefined) return 'On request';
  if (!Number.isFinite(value)) return `${value}`;

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function toNetPrice(grossValue: number | null, vatRate = 0.19) {
  if (grossValue === null || grossValue === undefined) return grossValue;
  if (!Number.isFinite(grossValue)) return grossValue;
  return grossValue / (1 + vatRate);
}

function formatDate(value: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

type TicketingProps = {
  phase: TicketingMode;
  tone?: SectionTone;
};

export function Ticketing({ phase, tone = 'default' }: TicketingProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    phase === 'open' ? 'loading' : 'ready'
  );
  const [eventData, setEventData] = useState(DEFAULT_EVENT);
  const [tickets, setTickets] = useState<FientaTicket[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string>(FALLBACK_CHECKOUT_URL);

  useEffect(() => {
    if (phase !== 'open') {
      return;
    }

    let isMounted = true;

    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/fienta-event');
        if (!response.ok) {
          throw new Error('Fienta request failed');
        }

        const payload = (await response.json()) as FientaEventSnapshot;
        const normalizedEvent = {
          ...DEFAULT_EVENT,
          ...(payload?.event || {}),
        };
        const ticketList = Array.isArray(payload?.tickets) ? payload.tickets : [];
        const eventCheckoutUrl = payload?.event?.checkoutUrl || FALLBACK_CHECKOUT_URL;

        if (isMounted) {
          setEventData(normalizedEvent);
          setTickets(ticketList);
          setCheckoutUrl(eventCheckoutUrl);
          setStatus('ready');
        }
      } catch {
        if (isMounted) {
          setTickets([]);
          setCheckoutUrl(FALLBACK_CHECKOUT_URL);
          setStatus('error');
        }
      }
    };

    fetchTickets();

    return () => {
      isMounted = false;
    };
  }, [phase]);

  const visibleTickets = useMemo(
    () => tickets.filter((ticket) => !ticket.isSoldOut && ticket.isOnSale),
    [tickets]
  );

  return (
    <Section id="tickets" className={cn('scroll-mt-24', SECTION_TONE_CLASS[tone])}>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {phase === 'sold-out' ? 'CNS Munich is' : 'Secure'}
            {' '}
            <br />
            <span className="text-[#0bbbef]">
              {phase === 'sold-out' ? 'sold out' : 'your spot'}
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {phase === 'sold-out'
              ? 'All available tickets have found a home. Thank you for the incredible response from the community.'
              : 'Two full days in Munich — talks, workshops, and the people building cloud native in Europe.'}
          </p>
          {phase === 'open' ? (
            <p className="mt-8 text-sm text-muted-foreground">
              Need a diversity ticket? Contact{' '}
              <a
                className="cursor-pointer font-semibold text-primary hover:text-primary/80"
                href={`mailto:${EVENT_CONFIG.community.sponsorEmail}`}
              >
                {EVENT_CONFIG.community.sponsorEmail}
              </a>
              .
            </p>
          ) : null}
        </MotionReveal>

        <MotionReveal delay={0.1} className="min-w-0">
          <Card className="gap-0 rounded-2xl bg-gradient-to-br from-primary/8 to-primary/[0.03] p-6 shadow-none ring-1 ring-primary/10 sm:p-8">
            <CardContent className="space-y-6 px-0">
              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-primary sm:text-2xl">
                  {eventData.title}
                </h3>
                <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                  {eventData.dateRange && (
                    <p className="flex items-start gap-2">
                      <Calendar className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>{eventData.dateRange}</span>
                    </p>
                  )}
                  {eventData.location && (
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>{eventData.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {status === 'loading' && (
                <div
                  role="status"
                  className="border-t border-primary/10 pt-6 text-sm leading-relaxed text-muted-foreground"
                >
                  Syncing ticket data from Fienta...
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl bg-destructive/5 p-4 text-sm leading-relaxed text-destructive"
                >
                  Ticket details could not be loaded. Please visit Fienta for current tickets and
                  availability.
                </div>
              )}

              {phase === 'sold-out' ? (
                <div
                  role="status"
                  className="border-t border-primary/10 pt-6 text-sm font-medium leading-relaxed text-primary"
                >
                  Tickets sold out — follow our community channels for event updates.
                </div>
              ) : null}

              {phase === 'open' && status === 'ready' && visibleTickets.length === 0 && (
                <div
                  role="status"
                  className="border-t border-primary/10 pt-6 text-sm leading-relaxed text-muted-foreground"
                >
                  Please visit Fienta for current tickets, prices, and availability.
                </div>
              )}

              {visibleTickets.length > 0 && (
                <ul
                  aria-label="Available tickets"
                  className="divide-y divide-primary/10 border-t border-primary/10"
                >
                  {visibleTickets.map((ticket) => (
                    <li
                      key={ticket.id}
                      className="grid gap-4 py-6 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
                    >
                      <div className="min-w-0 break-words">
                        <h4 className="font-heading text-lg font-bold text-primary">
                          {ticket.title}
                        </h4>
                        {ticket.description && (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {ticket.description}
                          </p>
                        )}
                        {ticket.salesEnd && (
                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            Sales end {formatDate(ticket.salesEnd)}
                          </p>
                        )}
                      </div>
                      <div className="sm:text-right">
                        <p className="whitespace-nowrap font-heading text-2xl font-bold tracking-tight text-primary tabular-nums">
                          {formatCurrency(toNetPrice(ticket.price), ticket.currency)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">Net + 19% VAT</p>
                        {ticket.amountLeft !== null && (
                          <p className="mt-2 text-xs font-medium text-primary/70">
                            {ticket.amountLeft} left
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {phase === 'open' && (
                <div className="border-t border-primary/10 pt-6 text-center">
                  {checkoutUrl ? (
                    <>
                      <Button
                        nativeButton={false}
                        render={<a href={checkoutUrl} target="_blank" rel="noopener noreferrer" />}
                        size="lg"
                        className="min-h-11 w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                      >
                        Buy tickets
                        <ArrowUpRight className="size-4" aria-hidden />
                      </Button>
                      <p className="mt-3 text-xs text-muted-foreground">Checkout on Fienta</p>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Ticket sales open soon. Please check back later.
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </MotionReveal>
      </div>
    </Section>
  );
}
