import slugify from 'slugify';

const getAnchor = (str) => slugify(str).toLocaleLowerCase();

export default {
  // Pages and sections
  home: {
    to: '/',
  },
  schedule: {
    to: '/',
    id: getAnchor('Schedule'),
    homeTo: '/',
  },
  sponsors: {
    to: `/#${getAnchor('Sponsors')}`,
    id: getAnchor('Sponsors'),
    homeTo: null,
  },
  speakers: {
    to: `/`,
    id: getAnchor('Speakers'),
    homeTo: '/',
  },
  /* workshops: {
    to: '/workshops',
    id: getAnchor('Workshops'),
    homeTo: '/workshops',
  }, */
  proposal: {
    to: `/#${getAnchor('Call for Proposal')}`,
    id: getAnchor('Call for Proposal'),
    homeTo: null,
  },
  team: {
    to: '/team',
  },
  tickets: {
    to: 'https://www.eventbrite.de/e/kubernetes-community-days-munich-2023-tickets-526260839337',
    target: '_blank',
  },
  mission: {
    to: '/mission-statement',
    target: '_blank',
  },
  privacy: {
    to: '/data-privacy',
    target: '_blank',
  },
  conduct: {
    to: 'https://events.linuxfoundation.org/about/code-of-conduct/',
    target: '_blank',
  },

  // Social-links
  linkedin: {
    to: 'https://www.linkedin.com/company/kubernetes-community-days-munich',
    target: '_blank',
  },
  twitter: {
    to: 'https://twitter.com/KCDMunich',
    target: '_blank',
  },
  googlemaps: {
    to: 'https://goo.gl/maps/yQ2Xr6Mnoyivh3qq5',
    target: '_blank',
  },
  youtube: {
    to: 'https://www.youtube.com/@cncf',
    target: '_blank',
  },
};

/*
 schedule: {
    to: '/schedule',
    id: getAnchor('Schedule'),
    homeTo: '/schedule',
  },
  sponsors: {
    to: `/#${getAnchor('Sponsors')}`,
    id: getAnchor('Sponsors'),
    homeTo: null,
  },
  speakers: {
    to: `/speakers`,
    id: getAnchor('Speakers'),
    homeTo:  '/speakers',
  },
  */
