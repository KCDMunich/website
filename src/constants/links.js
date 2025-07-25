import slugify from 'slugify';

const getAnchor = (str) => slugify(str).toLocaleLowerCase();

export default {
  // Pages and sections
  gallery2024: {
    to:
      'https://lightroom.adobe.com/shares/7bb86e822460423fbd84753f93862cd2',
    target: '_blank',
    external: true,
  },
  gallery2025: {
    to: 'https://lightroom.adobe.com/shares/42d27333b09147bba84e9ed1fb859739',
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
  workshops: {
    to: '/workshops',
    id: getAnchor('Workshops'),
    homeTo: '/workshops',
  },
  team: {
    to: '/team',
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
    to: 'https://events.linuxfoundation.org/about/code-of-conduct/',
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
