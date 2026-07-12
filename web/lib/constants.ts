import slugify from 'slugify';

import { EVENT_CONFIG } from '@/lib/event-config';

const getAnchor = (str: string) => slugify(str).toLocaleLowerCase();

export type LinkItem = {
  to: string;
  target?: string;
  external?: boolean;
  id?: string;
  homeTo?: string | null;
};

export type MenuItem = LinkItem & {
  text: string;
  children?: Array<LinkItem & { text: string }>;
};

export const DISCORD_URL = EVENT_CONFIG.community.discordUrl;
export const FIENTA_TICKET_URL = EVENT_CONFIG.upcoming.ticketUrl;

export const LINKS = {
  galleryArchive: {
    to: EVENT_CONFIG.archive.galleryUrl,
    target: '_blank',
    external: true,
  },
  gallery2025: {
    to: 'https://lightroom.adobe.com/shares/7bb86e822460423fbd84753f93862cd2',
    target: '_blank',
    external: true,
  },
  gallery2024: {
    to: 'https://lightroom.adobe.com/shares/0f932ef66a3f45009390fa6cda9b665c',
    target: '_blank',
    external: true,
  },
  home: {
    to: '/',
  },
  schedule: {
    to: '/schedule',
    id: getAnchor('Schedule'),
    homeTo: '/schedule',
  },
  sponsors: {
    to: `/#${getAnchor('sponsors')}`,
    id: getAnchor('sponsors'),
    homeTo: null,
  },
  proposal: {
    to: `/#${getAnchor('Call for Speakers')}`,
    id: getAnchor('Call for Speakers'),
    homeTo: null,
  },
  workshops: {
    to: '/workshops',
    id: getAnchor('Workshops'),
    homeTo: '/workshops',
  },
  team: {
    to: '/team',
  },
  vision: {
    to: '/vision',
  },
  tickets: {
    to: FIENTA_TICKET_URL,
    target: '_blank',
    external: true,
  },
  mission: {
    to: '/mission-statement',
    target: '_blank',
    external: true,
  },
  privacy: {
    to: '/imprint-data-privacy',
  },
  privacyPolicy: {
    to: '/privacy-policy',
  },
  conduct: {
    to: 'https://github.com/KCDMunich/code-of-conduct/blob/main/code-of-conduct.md',
    target: '_blank',
    external: true,
  },
  linkedin: {
    to: 'https://linkedin.com/company/cns-munich',
    target: '_blank',
    external: true,
  },
  twitter: {
    to: 'https://x.com/cnsmunich',
    target: '_blank',
    external: true,
  },
  googlemaps: {
    to: 'https://goo.gl/maps/yQ2Xr6Mnoyivh3qq5',
    target: '_blank',
    external: true,
  },
  youtube: {
    to: 'https://www.youtube.com/@cnsmunich',
    target: '_blank',
    external: true,
  },
  bluesky: {
    to: 'https://bsky.app/profile/cnsmunich.bsky.social',
    target: '_blank',
    external: true,
  },
  discord: {
    to: DISCORD_URL,
    target: '_blank',
    external: true,
  },
  speakers: {
    to: '/speakers',
    id: getAnchor('Speakers'),
    homeTo: '/speakers',
  },
} as const satisfies Record<string, LinkItem>;

const PHOTO_GALLERY: MenuItem = {
  text: 'Photo Gallery',
  to: '',
  children: [
    { text: String(EVENT_CONFIG.archive.edition), ...LINKS.galleryArchive },
    { text: '2025', ...LINKS.gallery2025 },
    { text: '2024', ...LINKS.gallery2024 },
  ],
};

export const MENUS: Record<'header' | 'footer' | 'mobile', MenuItem[]> = {
  header: [
    { text: 'Schedule', ...LINKS.schedule },
    { text: 'Speakers', ...LINKS.speakers },
    { text: 'Sponsors', ...LINKS.sponsors },
    PHOTO_GALLERY,
  ],
  footer: [
    { text: 'Code of Conduct', ...LINKS.conduct },
    { text: 'Team', ...LINKS.team },
    { text: 'Our Vision', ...LINKS.vision },
    { text: 'Imprint', ...LINKS.privacy },
    { text: 'Privacy Policy', ...LINKS.privacyPolicy },
  ],
  mobile: [
    { text: 'Schedule', ...LINKS.schedule },
    { text: 'Speakers', ...LINKS.speakers },
    { text: 'Sponsors', ...LINKS.sponsors },
    PHOTO_GALLERY,
  ],
};
