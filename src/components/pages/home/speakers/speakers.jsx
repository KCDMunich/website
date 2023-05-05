import React from 'react';

import LINKS from 'constants/links';

/* import AnnieTalvastoPhoto from './images/annie-talvasto-photo.jpg';
import CherylHungPhoto from './images/cheryl-hung-photo.jpg';
import JuliusVolzPhoto from './images/julius-volz-photo.jpg';
import KatieGamanjiPhoto from './images/katie-gamanji-photo.jpg';
import LisaFalcoPhoto from './images/lisa-falco-photo.jpg';
import LizRicePhoto from './images/liz-rice-photo.jpg';
import MaxKorbacherPhoto from './images/max-korbacher-photo.jpg';
import PriyaWadhwaPhoto from './images/priya-wadhwa-photo.jpg';
import RicardoRochaPhoto from './images/ricardo-rocha-photo.jpg';
import ThomasGrafPhoto from './images/thomas-graf-photo.jpg'; */

const TITLE = 'Speakers';

const ITEMS = [
  /* {
    name: 'Thomas Graf',
    position: 'CTO & CO-Founder of Isovalent',
    photo: ThomasGrafPhoto,
  },
  {
    name: 'Liz Rice',
    position: 'Chief Open Source Office at Isovalent',
    photo: LizRicePhoto,
  },
  {
    name: 'Katie Gamanji',
    position: 'Senior Field Engineer at Apple / TOC at CNCF',
    photo: KatieGamanjiPhoto,
  },
  {
    name: 'Julius Volz',
    position: 'Co-Founder of prometheus.io / Founder at PromLabs',
    photo: JuliusVolzPhoto,
  },
  {
    name: 'Annie Talvasto',
    position: 'CNCF Ambassador I Azure MVP',
    photo: AnnieTalvastoPhoto,
  },
  {
    name: 'Ricardo Rocha',
    position: 'Computing Engineer CERN / TOC CNCF',
    photo: RicardoRochaPhoto,
  },
  {
    name: 'Max Körbächer',
    position: 'Co-Founder of Liquid Reply / Co-Chair CNCF TAG Environmental Sustainability',
    photo: MaxKorbacherPhoto,
  },
  {
    name: 'Priya Wadhwa',
    position: 'Software Engineer at Chainguard',
    photo: PriyaWadhwaPhoto,
  },
  {
    name: 'Cheryl Hung',
    position: 'Sr Director in Infrastructure at Arm',
    photo: CherylHungPhoto,
  },
  {
    name: 'Lisa Falco ',
    position: 'Consultant in Medical & Responsible AI at Zühlke Group',
    photo: LisaFalcoPhoto,
  }, */
];

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container">
      <h2
        className="text-6xl font-bold leading-tight text-primary-1 md:text-center"
        id={LINKS.speakers.id}
      >
        {TITLE}
      </h2>
      <ul className="mt-14 grid grid-cols-4 gap-8 lg:gap-6 md:grid-cols-3 sm:flex sm:flex-wrap sm:justify-evenly">
        {ITEMS.map(({ name, position, photo }, index) => (
          <li
            className="flex w-[240px] flex-col lg:w-52 md:w-48 sm:w-auto sm:max-w-[200px]"
            key={index}
          >
            <img
              className="w-full"
              src={photo}
              width={240}
              height={284}
              loading="lazy"
              alt={name}
            />

            <p className="mt-2.5 text-2xl font-bold leading-normal text-primary-1 sm:text-left">
              {name}
            </p>

            <span className="mt-1.5 text-primary-1">{position}</span>
          </li>
        ))}
      </ul>

      <p className="mt-14 text-center text-[22px] font-semibold leading-normal text-primary-1">
        Coming soon...
      </p>
    </div>
  </section>
);

export default Speakers;
