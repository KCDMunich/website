import { describe, expect, it } from 'vitest';

import { EVENT_CONFIG, type EventConfig } from './event-config';
import { createSitePresentation } from './site-presentation';
import {
  EVENT_STAGES,
  parseBooleanEnv,
  parseEventStage,
  parseSponsorshipPhase,
  type EventStage,
} from './site-state-types';

const testConfig: EventConfig = {
  ...EVENT_CONFIG,
  campaigns: { ...EVENT_CONFIG.campaigns, cfpUrl: 'https://example.com/cfp' },
  upcoming: {
    ...EVENT_CONFIG.upcoming,
    dateLabel: 'June 14–15, 2027',
    ticketUrl: 'https://example.com/tickets',
    venue: 'Example venue',
  },
};

const expected = {
  teaser: {
    primary: 'Join the community',
    program: 'archive',
    speakers: true,
    tickets: 'closed',
    purchase: false,
    noIndex: false,
    firstSection: 'about',
    schedule: true,
  },
  cfp: {
    primary: 'Submit a proposal',
    program: 'preview',
    speakers: true,
    tickets: 'closed',
    purchase: false,
    noIndex: true,
    firstSection: 'about',
    schedule: false,
  },
  tickets: {
    primary: 'Get your ticket',
    program: 'preview',
    speakers: true,
    tickets: 'open',
    purchase: true,
    noIndex: true,
    firstSection: 'about',
    schedule: false,
  },
  live: {
    primary: 'Open live schedule',
    program: 'published',
    speakers: true,
    tickets: 'closed',
    purchase: false,
    noIndex: false,
    firstSection: 'schedule',
    schedule: true,
  },
  recap: {
    primary: `View ${testConfig.archive.edition} photos`,
    program: 'archive',
    speakers: true,
    tickets: 'closed',
    purchase: false,
    noIndex: false,
    firstSection: 'moments',
    schedule: true,
  },
} as const satisfies Record<
  EventStage,
  {
    firstSection: string;
    noIndex: boolean;
    primary: string;
    program: string;
    purchase: boolean;
    schedule: boolean;
    speakers: boolean;
    tickets: string;
  }
>;

describe('event stage matrix', () => {
  it.each(EVENT_STAGES)('derives a complete %s presentation', (stage) => {
    const presentation = createSitePresentation(stage, 'recruiting', testConfig);
    const row = expected[stage];

    expect(presentation.event.stage).toBe(stage);
    expect(presentation.hero.primaryAction.label).toBe(row.primary);
    expect(presentation.program.mode).toBe(row.program);
    expect(presentation.ticketing.mode).toBe(row.tickets);
    expect(presentation.navigation.showSchedule).toBe(row.schedule);
    expect(presentation.navigation.showSpeakers).toBe(row.speakers);
    expect(presentation.program.noIndex).toBe(row.noIndex);
    expect(presentation.ticketing.showPurchaseActions).toBe(row.purchase);
    expect(presentation.homepage.sections[0]).toBe(row.firstSection);
    expect(presentation.homepage.sections.length).toBeGreaterThan(0);
    expect(presentation.metadata.title).not.toBe('');
    expect(presentation.metadata.description).not.toBe('');
  });

  it('never combines recap copy with ticket purchasing', () => {
    const recap = createSitePresentation('recap', 'recruiting', testConfig);

    expect(recap.event.isRecap).toBe(true);
    expect(recap.ticketing.showPurchaseActions).toBe(false);
    expect(recap.homepage.sections).not.toContain('ticketing');
  });

  it('requires a CFP URL for the CFP stage', () => {
    expect(() =>
      createSitePresentation('cfp', 'closed', {
        ...testConfig,
        campaigns: { ...testConfig.campaigns, cfpUrl: null },
      })
    ).toThrow('requires CFP_URL');
  });

  it('requires a ticket URL while tickets are on sale', () => {
    expect(() =>
      createSitePresentation('tickets', 'closed', {
        ...testConfig,
        upcoming: { ...testConfig.upcoming, ticketUrl: '' },
      })
    ).toThrow('EVENT_STAGE=tickets requires EVENT_CONFIG.upcoming.ticketUrl');
  });

  it('requires upcoming event details before ticketing or live stages', () => {
    expect(() =>
      createSitePresentation('tickets', 'closed', {
        ...testConfig,
        upcoming: { ...testConfig.upcoming, dateLabel: '' },
      })
    ).toThrow('EVENT_STAGE=tickets requires EVENT_CONFIG.upcoming.dateLabel');

    expect(() =>
      createSitePresentation('live', 'closed', {
        ...testConfig,
        upcoming: { ...testConfig.upcoming, venue: '' },
      })
    ).toThrow('EVENT_STAGE=live requires EVENT_CONFIG.upcoming.venue');
  });

  it('keeps archive and upcoming edition copy separate', () => {
    const teaser = createSitePresentation('teaser', 'recruiting', testConfig);
    const tickets = createSitePresentation('tickets', 'recruiting', testConfig);
    const recap = createSitePresentation('recap', 'recruiting', testConfig);

    expect(teaser.hero.eyebrow).toContain(String(testConfig.upcoming.edition));
    expect(tickets.hero.eyebrow).toContain(testConfig.upcoming.dateLabel);
    expect(recap.hero.eyebrow).toContain(testConfig.archive.dateLabel);
    expect(recap.hero.secondaryAction?.label).toContain(String(testConfig.upcoming.edition));
  });

  it('shows the previous edition archive in teaser mode and switches to upcoming content later', () => {
    const teaser = createSitePresentation('teaser', 'recruiting', testConfig);
    const cfp = createSitePresentation('cfp', 'recruiting', testConfig);
    const live = createSitePresentation('live', 'recruiting', testConfig);

    expect(teaser.program.mode).toBe('archive');
    expect(teaser.program.isArchive).toBe(true);
    expect(teaser.program.scheduleEyebrow).toContain(String(testConfig.archive.edition));
    expect(teaser.program.speakerEyebrow).toContain(String(testConfig.archive.edition));
    expect(teaser.navigation.scheduleLabel).toBe(`${testConfig.archive.edition} Schedule`);
    expect(teaser.navigation.speakersLabel).toBe(`${testConfig.archive.edition} Speakers`);
    expect(teaser.homepage.sections).toContain('schedule');
    expect(teaser.homepage.sections).toContain('speakers');
    expect(teaser.homepage.sections).toContain('venue');

    expect(cfp.program.mode).toBe('preview');
    expect(cfp.program.isArchive).toBe(false);
    expect(live.program.mode).toBe('published');
    expect(live.program.isArchive).toBe(false);
  });

  it('uses ticket options for published programs and sold-out messaging', () => {
    const published = createSitePresentation('tickets', 'closed', testConfig, {
      programPublished: true,
      ticketsSoldOut: false,
    });
    const soldOut = createSitePresentation('tickets', 'closed', testConfig, {
      programPublished: true,
      ticketsSoldOut: true,
    });
    const soldOutBeforeProgram = createSitePresentation('tickets', 'closed', testConfig, {
      programPublished: false,
      ticketsSoldOut: true,
    });

    expect(published.program.mode).toBe('published');
    expect(published.navigation.showSchedule).toBe(true);
    expect(published.ticketing.showPurchaseActions).toBe(true);
    expect(soldOut.program.mode).toBe('published');
    expect(soldOut.ticketing.mode).toBe('sold-out');
    expect(soldOut.ticketing.showPurchaseActions).toBe(false);
    expect(soldOut.hero.primaryAction.label).toBe('Explore the schedule');
    expect(soldOutBeforeProgram.program.mode).toBe('preview');
    expect(soldOutBeforeProgram.navigation.showSchedule).toBe(false);
    expect(soldOutBeforeProgram.hero.primaryAction.label).toBe('Join event updates');
  });

  it('carries the configured early-speaker IDs and preview copy into the CFP and ticket previews', () => {
    const cfp = createSitePresentation('cfp', 'closed', testConfig);
    const tickets = createSitePresentation('tickets', 'closed', testConfig);

    for (const presentation of [cfp, tickets]) {
      expect(presentation.program.announcedSpeakerIds).toEqual(
        testConfig.campaigns.announcedSpeakerIds
      );
      expect(presentation.program.speakerEyebrow).toBe('Early announcements');
      expect(presentation.program.speakerTitleLead).toBe('Meet the voices');
      expect(presentation.program.speakerTitleAccent).toBe('shaping the next edition');
    }
  });

  it('keeps sponsorship independent from the event stage', () => {
    for (const stage of EVENT_STAGES) {
      expect(createSitePresentation(stage, 'closed', testConfig).sponsorship.isRecruiting).toBe(
        false
      );
      expect(createSitePresentation(stage, 'recruiting', testConfig).sponsorship.isRecruiting).toBe(
        true
      );
    }
  });

  it('parses every allowed stage and rejects unknown values', () => {
    for (const stage of EVENT_STAGES) expect(parseEventStage(stage)).toBe(stage);
    expect(parseEventStage(undefined)).toBe('teaser');
    expect(() => parseEventStage('finished')).toThrow('Invalid EVENT_STAGE');
  });

  it('parses sponsorship phases and rejects unknown values', () => {
    expect(parseSponsorshipPhase('closed')).toBe('closed');
    expect(parseSponsorshipPhase('recruiting')).toBe('recruiting');
    expect(() => parseSponsorshipPhase('open')).toThrow('Invalid SPONSORSHIP_PHASE');
  });

  it('parses ticket options and rejects ambiguous values', () => {
    expect(parseBooleanEnv('PROGRAM_PUBLISHED', undefined)).toBe(false);
    expect(parseBooleanEnv('PROGRAM_PUBLISHED', 'true')).toBe(true);
    expect(parseBooleanEnv('TICKETS_SOLD_OUT', 'false')).toBe(false);
    expect(() => parseBooleanEnv('PROGRAM_PUBLISHED', 'yes')).toThrow('Expected true or false');
  });

  it('returns a serializable contract for every stage', () => {
    for (const stage of EVENT_STAGES) {
      const presentation = createSitePresentation(stage, 'recruiting', testConfig);
      expect(() => JSON.stringify(presentation)).not.toThrow();
    }
  });
});
