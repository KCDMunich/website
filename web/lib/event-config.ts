export type EventConfig = {
  archive: {
    edition: number;
    galleryUrl: string;
    heroVideoId: string;
    playlistId: string;
    playlistUrl: string;
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
  featured: {
    dateLabel: string;
    edition: number;
    location: string;
    name: string;
    ordinalLabel: string;
    shortName: string;
    ticketUrl: string;
    venue: string;
  };
  next: {
    dateLabel: string | null;
    edition: number;
    ordinalLabel: string;
  };
};

const parseCommaSeparatedIds = (value: string | undefined): readonly string[] =>
  value
    ?.split(',')
    .map((id) => id.trim())
    .filter(Boolean) ?? [];

export const EVENT_CONFIG: EventConfig = {
  featured: {
    edition: 2026,
    name: 'Cloud Native Summit Munich',
    ordinalLabel: '5th',
    shortName: 'CNS Munich',
    dateLabel: 'June 29–30, 2026',
    location: 'Munich',
    venue: 'smartvillage Bogenhausen',
    ticketUrl: 'https://fienta.com/de/cloud-native-summit-2026',
  },
  next: {
    edition: 2027,
    dateLabel: null,
    ordinalLabel: '6th',
  },
  archive: {
    edition: 2026,
    galleryUrl: 'https://lightroom.adobe.com/shares/7314e896be5b4c22b8365cfa07e42487',
    playlistId: 'PL54A_DPe8WtDLSA_EA7ETfprpRWzd2yqV',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL54A_DPe8WtDLSA_EA7ETfprpRWzd2yqV',
    heroVideoId: 'R1dcUSnTmn8',
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
