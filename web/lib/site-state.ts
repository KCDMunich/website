import 'server-only';

import { EVENT_CONFIG } from '@/lib/event-config';
import { createSitePresentation } from '@/lib/site-presentation';
import { parseBooleanEnv, parseEventStage, parseSponsorshipPhase } from '@/lib/site-state-types';

const eventStage = parseEventStage(process.env.EVENT_STAGE?.trim());
const sponsorshipPhase = parseSponsorshipPhase(process.env.SPONSORSHIP_PHASE?.trim());
const controls = {
  programPublished: parseBooleanEnv('PROGRAM_PUBLISHED', process.env.PROGRAM_PUBLISHED?.trim()),
  ticketsSoldOut: parseBooleanEnv('TICKETS_SOLD_OUT', process.env.TICKETS_SOLD_OUT?.trim()),
};

export const siteState = Object.freeze(
  createSitePresentation(eventStage, sponsorshipPhase, EVENT_CONFIG, controls)
);
