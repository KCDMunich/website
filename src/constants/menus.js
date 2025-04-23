import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    // { text: 'Speakers', ...LINKS.speakers },
    // { text: 'Call for Speakers', ...LINKS.proposal },
    { text: 'Schedule', ...LINKS.schedule },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Image Gallery', ...LINKS.gallery },
    // { text: 'Schedule', ...LINKS.schedule },
  ],
  footer: [
    { text: 'Schedule', ...LINKS.schedule },
    { text: 'Code of Conduct', ...LINKS.conduct },
    { text: 'Team', ...LINKS.team },
    { text: 'Our Vision', ...LINKS.mission },
    { text: 'Impressum & Data Privacy', ...LINKS.privacy },
  ],
  mobile: [
    // { text: 'Speakers', ...LINKS.speakers },
    // { text: 'Schedule', ...LINKS.schedule },
    // { text: 'Call for Speakers', ...LINKS.proposal },
    // { text: 'Workshops', ...LINKS.workshops },
    { text: 'Schedule', ...LINKS.schedule },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Image Gallery', ...LINKS.gallery },
  ],
};

export default MENUS;
