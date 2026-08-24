'use client';

import { useEffect, useMemo, useState } from 'react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { SectionHeader } from '@/components/layout/section-header';
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
          setStatus('ready');
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
    <Section id="tickets" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal className="flex h-full flex-col">
          <SectionHeader
            title={phase === 'sold-out' ? 'CNS Munich is sold out' : 'Secure your spot'}
            description={
              phase === 'sold-out'
                ? 'All available tickets have found a home. Thank you for the incredible response from the community.'
                : 'Two full days in Munich — talks, workshops, and the people building cloud native in Europe.'
            }
            className="mb-0"
          />
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

        <MotionReveal delay={0.1}>
          <Card className="border-border/60 bg-card shadow-xl ring-1 ring-primary/10">
            <CardContent className="space-y-6 pt-6">
              <h3 className="text-2xl font-semibold text-foreground">{eventData.title}</h3>

              {status === 'loading' && (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                  Syncing ticket data from Fienta...
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-xl border border-dashed border-destructive/30 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive">
                  Tickets are temporarily unavailable. Please check back soon.
                </div>
              )}

              {phase === 'sold-out' ? (
                <div className="rounded-xl border border-dashed border-primary/20 bg-primary/5 px-4 py-8 text-center text-sm font-medium text-primary">
                  Tickets sold out — follow our community channels for event updates.
                </div>
              ) : null}

              {phase === 'open' && status === 'ready' && visibleTickets.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                  Ticket sales will open soon. Stay tuned!
                </div>
              )}

              <div className="space-y-4">
                {visibleTickets.map((ticket) => (
                  <Card key={ticket.id} className="border-border/60 bg-background">
                    <CardContent className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{ticket.title}</p>
                        {ticket.description && (
                          <p className="mt-1 text-sm text-muted-foreground">{ticket.description}</p>
                        )}
                        {ticket.salesEnd && (
                          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Sales end {formatDate(ticket.salesEnd)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-primary">
                          {formatCurrency(toNetPrice(ticket.price), ticket.currency)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">Net + 19% VAT</p>
                        {ticket.amountLeft !== null && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {ticket.amountLeft} left
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                {phase === 'open' && checkoutUrl ? (
                  <Button
                    nativeButton={false}
                    render={<a href={checkoutUrl} target="_blank" rel="noreferrer" />}
                    size="lg"
                  >
                    Buy tickets
                  </Button>
                ) : phase === 'open' ? (
                  <span className="text-xs text-muted-foreground">
                    Ticket sales open soon. Please check back later.
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </MotionReveal>
      </div>
    </Section>
  );
}
