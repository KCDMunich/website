export type EventEdition = {
  dateLabel: string;
  edition: number;
  location: string;
  name: string;
  ordinalLabel: string;
  shortName: string;
  venue: string;
};

export type EventConfig = {
  archive: {
    dateLabel: string;
    edition: number;
    galleryUrl: string;
    heroVideoId: string;
    location: string;
    name: string;
    ordinalLabel: string;
    playlistId: string;
    playlistUrl: string;
    shortName: string;
    venue: string;
  };
  campaigns: {
    announcedSpeakerIds: readonly string[];
    cfpUrl: string | null;
  };
  community: {
    discordUrl: string;
    sponsorEmail: string;
    sponsorProspectusUrl: string | null;
  };
  sponsorship: {
    edition: number;
  };
  upcoming: EventEdition & {
    ticketUrl: string;
  };
};

const parseCommaSeparatedIds = (value: string | undefined): readonly string[] =>
  value
    ?.split(',')
    .map((id) => id.trim())
    .filter(Boolean) ?? [];

export const EVENT_CONFIG: EventConfig = {
  archive: {
    edition: 2026,
    name: 'Cloud Native Summit Munich',
    ordinalLabel: '5th',
    shortName: 'CNS Munich',
    dateLabel: 'June 29–30, 2026',
    location: 'Munich',
    venue: 'smartvillage Bogenhausen',
    galleryUrl: 'https://lightroom.adobe.com/shares/7314e896be5b4c22b8365cfa07e42487',
    playlistId: 'PLAA2DJBnZEc8',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLAA2DJBnZEc8',
    heroVideoId: 'R1dcUSnTmn8',
  },
  upcoming: {
    edition: 2027,
    name: 'Cloud Native Summit Munich',
    ordinalLabel: '6th',
    shortName: 'CNS Munich',
    dateLabel: 'June 28–29, 2027',
    location: 'Munich',
    venue: 'smartvillage Bogenhausen',
    ticketUrl: 'https://fienta.com/o/36183',
  },
  sponsorship: {
    edition: 2027,
  },
  campaigns: {
    // Sessionize speaker IDs are supplied as ANNOUNCED_SPEAKER_IDS in the environment.
    announcedSpeakerIds: parseCommaSeparatedIds(process.env.ANNOUNCED_SPEAKER_IDS),
    cfpUrl: process.env.CFP_URL ?? null,
  },
  community: {
    discordUrl: 'https://discord.com/invite/Ht3upbGey9',
    sponsorEmail: 'team@cloudnativesummit.de',
    sponsorProspectusUrl:
      'https://docs.google.com/presentation/d/1QVKEiKgR_Q-grdpZ7QR85-xlvoydq3P6ijvpvKF4KmY/edit?usp=sharing',
  },
};
