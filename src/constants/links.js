import slugify from 'slugify';

const getAnchor = (str) => slugify(str).toLocaleLowerCase();

export default {
  // Pages and sections
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
    to: '',
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
    target: '_blank',
    external: true,
  },
  conduct: {
    to: 'https://github.com/KCDMunich/code-of-conduct/blob/main/code-of-conduct.md',
    target: '_blank',
    external: true,
  },

  // Social-links
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
  speakers: {
    to: `/speakers`,
    id: getAnchor('Speakers'),
    homeTo: '/speakers',
  },
};
