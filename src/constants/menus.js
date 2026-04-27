import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    { text: 'Schedule', ...LINKS.schedule },
    // { text: 'Speakers', ...LINKS.speakers },
    { text: 'Sponsors', ...LINKS.sponsors },
    {
      text: 'Gallery',
      children: [
        { text: '2025', ...LINKS.gallery2025 },
        { text: '2024', ...LINKS.gallery2024 },
      ],
    },
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
    // { text: 'Workshops', ...LINKS.workshops },
    // { text: 'Speakers', ...LINKS.speakers },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Gallery 2024', ...LINKS.gallery2024 },
    { text: 'Gallery 2025', ...LINKS.gallery2025 },
  ],
};

export default MENUS;
