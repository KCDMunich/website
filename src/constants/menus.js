import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    { text: 'Call for Speakers', ...LINKS.proposal },
    //{ text: 'Speakers', ...LINKS.speakers },
    { text: 'Sponsors', ...LINKS.sponsors },
    {
      text: 'Gallery',
      children: [
        { text: '2025', ...LINKS.gallery2025 },
        { text: '2024', ...LINKS.gallery2024 },
      ],
    },
    // { text: 'Schedule', ...LINKS.schedule },
  ],
  footer: [
    { text: 'Code of Conduct', ...LINKS.conduct },
    { text: 'Team', ...LINKS.team },
    { text: 'Our Vision', ...LINKS.vision },
    { text: 'Imprint & Data Privacy', ...LINKS.privacy },
  ],
  mobile: [
    // { text: 'Schedule', ...LINKS.schedule },
    { text: 'Call for Speakers', ...LINKS.proposal },
    // { text: 'Workshops', ...LINKS.workshops },
    // { text: 'Speakers', ...LINKS.speakers },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Gallery 2024', ...LINKS.gallery2024 },
    { text: 'Gallery 2025', ...LINKS.gallery2025 },
  ],
};

export default MENUS;
