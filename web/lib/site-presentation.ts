import type { EventConfig, EventEdition } from './event-config';
import type {
  EventControls,
  EventStage,
  HomepageSectionId,
  ProgramMode,
  SiteAction,
  SponsorshipPhase,
  TicketingMode,
} from './site-state-types';

export type SitePresentation = {
  event: {
    isLive: boolean;
    isRecap: boolean;
    stage: EventStage;
  };
  hero: {
    description: string;
    eyebrow: string;
    primaryAction: SiteAction;
    secondaryAction: SiteAction | null;
    showStats: boolean;
    titleAccent: string;
    titleLead: string;
  };
  homepage: {
    sections: readonly HomepageSectionId[];
  };
  metadata: {
    description: string;
    title: string;
  };
  navigation: {
    scheduleLabel: string;
    showSchedule: boolean;
    showSpeakers: boolean;
    speakersLabel: string;
  };
  program: {
    announcedSpeakerIds: readonly string[];
    isArchive: boolean;
    mode: ProgramMode;
    noIndex: boolean;
    scheduleDescription: string;
    scheduleEyebrow: string;
    scheduleTitle: string;
    speakerDescription: string;
    speakerEyebrow: string;
    speakerTitleAccent: string;
    speakerTitleLead: string;
  };
  sponsorship: {
    isRecruiting: boolean;
    phase: SponsorshipPhase;
  };
  ticketing: {
    mode: TicketingMode;
    showPurchaseActions: boolean;
  };
};

const action = (
  label: string,
  href: string,
  icon: SiteAction['icon'],
  external = false
): SiteAction => ({ external, href, icon, label });

const requireUrl = (value: string | null, message: string): string => {
  if (!value) throw new Error(message);
  return value;
};

const commonProgramCopy = (
  edition: EventEdition,
  announcedSpeakerIds: readonly string[]
) => ({
  announcedSpeakerIds,
  isArchive: false,
  scheduleDescription: `Browse every talk and workshop from two community-driven days in ${edition.location}.`,
  scheduleEyebrow: `${edition.edition} Program`,
  scheduleTitle: 'Explore the program',
  speakerDescription:
    'Practitioners and experts from the cloud native community — browse the full lineup and session topics.',
  speakerEyebrow: 'Speakers',
  speakerTitleAccent: 'speakers',
  speakerTitleLead: 'Meet our',
});

const earlyAnnouncementProgramCopy = (
  edition: EventEdition,
  announcedSpeakerIds: readonly string[]
) => ({
  ...commonProgramCopy(edition, announcedSpeakerIds),
  speakerEyebrow: 'Early announcements',
  speakerTitleLead: 'Meet the voices',
  speakerTitleAccent: 'shaping the next edition',
  speakerDescription: 'Early speaker announcements — more names coming soon.',
});

export function createSitePresentation(
  stage: EventStage,
  sponsorshipPhase: SponsorshipPhase,
  config: EventConfig,
  controls: EventControls = { programPublished: false, ticketsSoldOut: false }
): SitePresentation {
  const sponsorship = {
    phase: sponsorshipPhase,
    isRecruiting: sponsorshipPhase === 'recruiting',
  } as const;
  const { archive, upcoming } = config;
  const programCopy = commonProgramCopy(upcoming, config.campaigns.announcedSpeakerIds);
  const archiveEdition = config.archive.edition;

  switch (stage) {
    case 'teaser':
      return {
        event: { stage, isLive: false, isRecap: false },
        hero: {
          eyebrow: upcoming.dateLabel
            ? `${upcoming.dateLabel} · ${upcoming.location}`
            : `CNS Munich ${upcoming.edition} · ${upcoming.location}`,
          titleLead: 'Cloud Native',
          titleAccent: 'returns to Munich',
          description:
            'A community-built gathering for the people shaping cloud native. Dates and details are coming soon.',
          primaryAction: action('Join the community', config.community.discordUrl, 'users', true),
          secondaryAction: action(
            `Explore ${archiveEdition} highlights`,
            config.archive.galleryUrl,
            'camera',
            true
          ),
          showStats: false,
        },
        homepage: {
          sections: ['about', 'moments', 'schedule', 'sponsors'],
        },
        metadata: {
          title: `${upcoming.name} ${upcoming.edition}`,
          description:
            'Cloud Native Summit Munich is returning. Join the community and explore highlights from the latest edition.',
        },
        navigation: {
          showSchedule: false,
          showSpeakers: false,
          scheduleLabel: 'Schedule',
          speakersLabel: 'Speakers',
        },
        program: {
          mode: 'hidden',
          noIndex: true,
          ...programCopy,
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };

    case 'cfp': {
      const cfpUrl = requireUrl(config.campaigns.cfpUrl, 'EVENT_STAGE=cfp requires CFP_URL.');

      return {
        event: { stage, isLive: false, isRecap: false },
        hero: {
          eyebrow: `Call for proposals · CNS Munich ${upcoming.edition}`,
          titleLead: 'Bring your',
          titleAccent: 'story to Munich',
          description:
            'Share practical lessons, hard-won experience, and bold ideas with an open cloud native community.',
          primaryAction: action('Submit a proposal', cfpUrl, 'arrow', true),
          secondaryAction: action('Meet the community', config.community.discordUrl, 'users', true),
          showStats: false,
        },
        homepage: {
          sections: ['about', 'expect', 'speakers', 'moments', 'schedule', 'sponsors'],
        },
        metadata: {
          title: `Call for Proposals ${upcoming.edition} | ${upcoming.shortName}`,
          description:
            'Submit a talk or workshop proposal for the next Cloud Native Summit Munich.',
        },
        navigation: {
          showSchedule: false,
          showSpeakers: true,
          scheduleLabel: 'Schedule',
          speakersLabel: 'Speaker Preview',
        },
        program: {
          mode: 'preview',
          noIndex: true,
          ...earlyAnnouncementProgramCopy(upcoming, config.campaigns.announcedSpeakerIds),
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };
    }

    case 'tickets': {
      const { programPublished, ticketsSoldOut } = controls;
      const ticketDate = requireUrl(
        upcoming.dateLabel,
        'EVENT_STAGE=tickets requires EVENT_CONFIG.upcoming.dateLabel.'
      );
      const program = {
        mode: programPublished ? 'published' : 'preview',
        noIndex: !programPublished,
        ...(programPublished
          ? programCopy
          : earlyAnnouncementProgramCopy(upcoming, config.campaigns.announcedSpeakerIds)),
      } as const;

      if (ticketsSoldOut) {
        const hasPublishedProgram = programPublished;

        return {
          event: { stage, isLive: false, isRecap: false },
          hero: {
            eyebrow: `${ticketDate} · Sold out`,
            titleLead: 'Munich, you',
            titleAccent: 'filled the room',
            description: hasPublishedProgram
              ? 'CNS Munich is sold out. Explore the full program and get ready for two community-driven days.'
              : 'CNS Munich is sold out. Join the community for event updates and future announcements.',
            primaryAction: hasPublishedProgram
              ? action('Explore the schedule', '/schedule', 'calendar')
              : action('Join event updates', config.community.discordUrl, 'users', true),
            secondaryAction: hasPublishedProgram
              ? action('Join event updates', config.community.discordUrl, 'users', true)
              : action('Meet the speakers', '/speakers', 'users'),
            showStats: true,
          },
          homepage: {
            sections: hasPublishedProgram
              ? [
                  'schedule',
                  'speakers',
                  'ticketing',
                  'expect',
                  'sponsors',
                  'venue',
                  'hotels',
                  'moments',
                ]
              : [
                  'about',
                  'ticketing',
                  'expect',
                  'speakers',
                  'moments',
                  'sponsors',
                  'venue',
                  'hotels',
                ],
          },
          metadata: {
            title: `${upcoming.name} ${upcoming.edition} — Sold Out`,
            description: hasPublishedProgram
              ? `CNS Munich ${upcoming.edition} is sold out. Explore the schedule and speakers.`
              : `CNS Munich ${upcoming.edition} is sold out. Join the community for updates.`,
          },
          navigation: {
            showSchedule: hasPublishedProgram,
            showSpeakers: true,
            scheduleLabel: 'Schedule',
            speakersLabel: hasPublishedProgram ? 'Speakers' : 'Speaker Preview',
          },
          program,
          sponsorship,
          ticketing: { mode: 'sold-out', showPurchaseActions: false },
        };
      }

      const ticketUrl = requireUrl(
        upcoming.ticketUrl,
        'EVENT_STAGE=tickets requires EVENT_CONFIG.upcoming.ticketUrl.'
      );

      return {
        event: { stage, isLive: false, isRecap: false },
        hero: {
          eyebrow: programPublished
            ? `${ticketDate} · Program live`
            : `${ticketDate} · ${upcoming.location}`,
          titleLead: programPublished ? 'Build your' : 'Cloud Native',
          titleAccent: programPublished ? 'two days in Munich' : 'Summit Munich',
          description: programPublished
            ? 'Explore the full program, discover the people behind the sessions, and make CNS Munich your own.'
            : 'Two days of practical talks, hands-on workshops, and genuine community — built by practitioners, for practitioners.',
          primaryAction: programPublished
            ? action('Explore the schedule', '/schedule', 'calendar')
            : action('Get your ticket', ticketUrl, 'ticket', true),
          secondaryAction: programPublished
            ? action('Get your ticket', ticketUrl, 'ticket', true)
            : action('Meet the speakers', '/speakers', 'users'),
          showStats: true,
        },
        homepage: {
          sections: programPublished
            ? [
                'schedule',
                'speakers',
                'ticketing',
                'about',
                'expect',
                'sponsors',
                'venue',
                'hotels',
                'moments',
              ]
            : [
                'about',
                'ticketing',
                'expect',
                'speakers',
                'moments',
                'sponsors',
                'venue',
                'hotels',
                'schedule',
              ],
        },
        metadata: {
          title: programPublished
            ? `${upcoming.name} ${upcoming.edition}`
            : upcoming.name,
          description: programPublished
            ? `Explore the complete ${upcoming.edition} program and get tickets for two cloud native days in ${upcoming.location}.`
            : `Get tickets for ${upcoming.name} ${upcoming.edition} in ${upcoming.location}.`,
        },
        navigation: {
          showSchedule: programPublished,
          showSpeakers: true,
          scheduleLabel: 'Schedule',
          speakersLabel: programPublished ? 'Speakers' : 'Speaker Preview',
        },
        program,
        sponsorship,
        ticketing: { mode: 'open', showPurchaseActions: true },
      };
    }

    case 'live': {
      const liveVenue = requireUrl(
        upcoming.venue,
        'EVENT_STAGE=live requires EVENT_CONFIG.upcoming.venue.'
      );

      return {
        event: { stage, isLive: true, isRecap: false },
        hero: {
          eyebrow: `Happening now · ${liveVenue}`,
          titleLead: 'Welcome to',
          titleAccent: 'CNS Munich',
          description:
            'Your two days of talks, workshops, and community are underway. Keep the live schedule close.',
          primaryAction: action('Open live schedule', '/app/schedule', 'calendar'),
          secondaryAction: action('Venue information', '/#venue', 'map'),
          showStats: true,
        },
        homepage: {
          sections: ['schedule', 'venue', 'speakers', 'sponsors', 'moments'],
        },
        metadata: {
          title: `${upcoming.name} ${upcoming.edition} — Live`,
          description: `CNS Munich ${upcoming.edition} is live at ${liveVenue}. Open the schedule and event information.`,
        },
        navigation: {
          showSchedule: true,
          showSpeakers: true,
          scheduleLabel: 'Live Schedule',
          speakersLabel: 'Speakers',
        },
        program: {
          mode: 'published',
          noIndex: false,
          ...programCopy,
          scheduleEyebrow: 'Live now',
          scheduleTitle: 'Your event schedule',
          scheduleDescription: 'Find the next session, room, and speaker while you are on site.',
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };
    }

    case 'recap':
      return {
        event: { stage, isLive: false, isRecap: true },
        hero: {
          eyebrow: `${archive.dateLabel} · Thank you, Munich`,
          titleLead: 'What a',
          titleAccent: `summit, ${archive.edition}`,
          description:
            `Two remarkable days of practical knowledge, open conversations, and a community that made every moment count. CNS Munich ${upcoming.edition} is already taking shape.`,
          primaryAction: action(
            `View ${archiveEdition} photos`,
            config.archive.galleryUrl,
            'camera',
            true
          ),
          secondaryAction: action(
            `Join CNS Munich ${upcoming.edition}`,
            config.community.discordUrl,
            'users',
            true
          ),
          showStats: true,
        },
        homepage: {
          sections: ['moments', 'about', 'schedule', 'speakers', 'sponsors', 'venue'],
        },
        metadata: {
          title: `${archive.name} ${archive.edition}`,
          description: `Relive ${archive.name} ${archive.edition} through photos, recordings, speakers, and the complete event archive.`,
        },
        navigation: {
          showSchedule: true,
          showSpeakers: true,
          scheduleLabel: `${archiveEdition} Schedule`,
          speakersLabel: `${archiveEdition} Speakers`,
        },
        program: {
          announcedSpeakerIds: config.campaigns.announcedSpeakerIds,
          mode: 'archive',
          noIndex: false,
          scheduleEyebrow: `${archiveEdition} Archive`,
          scheduleTitle: `Revisit the ${archiveEdition} program`,
          scheduleDescription: `Browse every talk and workshop from two community-driven days in ${archive.location}.`,
          speakerEyebrow: `${archiveEdition} Speaker Archive`,
          speakerTitleLead: 'The voices of',
          speakerTitleAccent: `${archive.shortName} ${archiveEdition}`,
          speakerDescription:
            'Revisit the practitioners and experts who made two days of community learning possible.',
          isArchive: true,
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };

    default: {
      const exhaustive: never = stage;
      throw new Error(`Unhandled event stage: ${exhaustive}`);
    }
  }
}
