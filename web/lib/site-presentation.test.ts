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
  campaigns: {
    ...EVENT_CONFIG.campaigns,
    announcedSpeakerIds: [],
  },
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
  tickets: {
    primary: 'Get your ticket',
    program: 'preview',
    speakers: false,
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

  it('shows the CFP section only during the tickets stage', () => {
    for (const stage of EVENT_STAGES) {
      const presentation = createSitePresentation(stage, 'recruiting', testConfig);
      expect(presentation.homepage.sections.includes('cfp')).toBe(stage === 'tickets');
    }

    for (const programPublished of [false, true]) {
      for (const ticketsSoldOut of [false, true]) {
        const presentation = createSitePresentation('tickets', 'recruiting', testConfig, {
          programPublished,
          ticketsSoldOut,
        });
        expect(presentation.homepage.sections).toContain('cfp');
      }
    }
  });

  it.each([
    { stage: 'tickets', ticketsSoldOut: false },
    { stage: 'tickets', ticketsSoldOut: true },
  ] as const)(
    'keeps $stage preview visibility consistent when sold out is $ticketsSoldOut',
    ({ stage, ticketsSoldOut }) => {
      for (const announcedSpeakerIds of [[], ['speaker-1']]) {
        const showSpeakers = announcedSpeakerIds.length > 0;
        const presentation = createSitePresentation(stage, 'recruiting', {
          ...testConfig,
          campaigns: { ...testConfig.campaigns, announcedSpeakerIds },
        }, { programPublished: false, ticketsSoldOut });

        expect(presentation.homepage.sections.includes('speakers')).toBe(showSpeakers);
        expect(presentation.navigation.showSpeakers).toBe(showSpeakers);
        expect(presentation.program.noIndex).toBe(true);
        expect(presentation.hero.secondaryAction).toEqual(
          ticketsSoldOut
            ? showSpeakers
              ? { label: 'Meet the speakers', href: '/speakers', icon: 'users', external: false }
              : null
            : {
                label: 'Become a sponsor',
                href: '/#sponsors',
                icon: 'users',
                external: false,
                prominent: true,
              }
        );
        expect(presentation.homepage.sections).toContain('sponsors');
        expect(presentation.homepage.sections).toContain('expect');
      }
    }
  );

  it.each(['teaser', 'live', 'recap'] as const)(
    'keeps the %s lineup visible without early-speaker IDs',
    (stage) => {
      const presentation = createSitePresentation(stage, 'closed', testConfig);
      expect(presentation.homepage.sections).toContain('speakers');
      expect(presentation.navigation.showSpeakers).toBe(true);
      expect(presentation.program.noIndex).toBe(false);
    }
  );

  it.each([false, true])(
    'keeps published speakers visible without announcement IDs when sold out is %s',
    (ticketsSoldOut) => {
      const presentation = createSitePresentation('tickets', 'closed', testConfig, {
        programPublished: true,
        ticketsSoldOut,
      });
      expect(presentation.homepage.sections).toContain('speakers');
      expect(presentation.navigation.showSpeakers).toBe(true);
      expect(presentation.program.mode).toBe('published');
      expect(presentation.program.noIndex).toBe(false);
    }
  );

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

  it('carries configured early-speaker IDs and preview copy into ticket previews', () => {
    const tickets = createSitePresentation('tickets', 'closed', testConfig);

    expect(tickets.program.announcedSpeakerIds).toEqual(
      testConfig.campaigns.announcedSpeakerIds
    );
    expect(tickets.program.speakerEyebrow).toBe('Early announcements');
    expect(tickets.program.speakerTitleLead).toBe('Meet the voices');
    expect(tickets.program.speakerTitleAccent).toBe('shaping the next edition');
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
    expect(() => parseEventStage('cfp')).toThrow('Invalid EVENT_STAGE');
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
