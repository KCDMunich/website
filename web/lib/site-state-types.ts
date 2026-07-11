export const EVENT_STAGES = ['teaser', 'cfp', 'tickets', 'live', 'recap'] as const;

export const SPONSORSHIP_PHASES = ['closed', 'recruiting'] as const;

export type EventStage = (typeof EVENT_STAGES)[number];
export type SponsorshipPhase = (typeof SPONSORSHIP_PHASES)[number];
export type EventControls = {
  programPublished: boolean;
  ticketsSoldOut: boolean;
};

export type ProgramMode = 'hidden' | 'preview' | 'published' | 'archive';
export type TicketingMode = 'closed' | 'open' | 'sold-out';

export type HomepageSectionId =
  | 'about'
  | 'moments'
  | 'expect'
  | 'ticketing'
  | 'speakers'
  | 'schedule'
  | 'sponsors'
  | 'venue'
  | 'hotels';

export type ActionIcon = 'arrow' | 'calendar' | 'camera' | 'map' | 'play' | 'ticket' | 'users';

export type SiteAction = {
  external?: boolean;
  href: string;
  icon: ActionIcon;
  label: string;
};

export function parseEventStage(value: string | undefined, fallback: EventStage = 'recap') {
  if (!value) return fallback;
  if (EVENT_STAGES.includes(value as EventStage)) return value as EventStage;
  throw new Error(`Invalid EVENT_STAGE="${value}". Expected one of: ${EVENT_STAGES.join(', ')}.`);
}

export function parseSponsorshipPhase(
  value: string | undefined,
  fallback: SponsorshipPhase = 'recruiting'
) {
  if (!value) return fallback;
  if (SPONSORSHIP_PHASES.includes(value as SponsorshipPhase)) return value as SponsorshipPhase;
  throw new Error(
    `Invalid SPONSORSHIP_PHASE="${value}". Expected one of: ${SPONSORSHIP_PHASES.join(', ')}.`
  );
}

export function parseBooleanEnv(
  name: string,
  value: string | undefined,
  fallback = false
): boolean {
  if (!value) return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`Invalid ${name}="${value}". Expected true or false.`);
}
