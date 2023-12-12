import clsx from 'clsx';
import React from 'react';

import Link from 'components/shared/link';
import QAware from 'icons/QAware_h.png';
import liquid from 'icons/liquid.png';
import whiteduck from 'icons/whiteduck.png';

import AnelaPhoto from './images/anela_a.jpeg';
import DominikPhoto from './images/dominik_b.jpeg';
import HannesPhoto from './images/mlr-black.png';
import MarkusPhoto from './images/markus_s.jpeg';
import MaxKörbächerPhoto from './images/max_k.jpg';
import NicoPhoto from './images/nico-m.jpg';
import TomPhoto from './images/tom_u.jpeg';
import Suad from './images/swo_kcd.jpg';

const ITEMS = [
  {
    name: 'Max Körbächer',
    position: 'Co-founder - Liquid Reply | CNCF Ambassador',
    photo: MaxKörbächerPhoto,
    url: 'https://www.linkedin.com/in/maxkoerbaecher/',
  },
  {
    name: 'Nico Meisenzal',
    position: 'Head of DevOps Consulting & Operations - white duck',
    photo: NicoPhoto,
    url: 'https://www.linkedin.com/in/nicomeisenzahl/',
  },
  {
    name: 'Leander Reimer',
    position: 'Managing Director & CTO - QAware',
    photo: HannesPhoto,
    url: 'https://www.linkedin.com/in/mario-leander-reimer-b2b67aa0/',
  },
  {
    name: 'Markus Sümmchen',
    position: 'CEO - white duck',
    photo: MarkusPhoto,
    url: 'https://www.linkedin.com/in/msuemmchen/',
  },
  {
    name: 'Suad Wolgram',
    position: 'Software & Cloud Engineer - white duck',
    photo: Suad,
    url: 'https://www.linkedin.com/in/suadwolgram/',
  },
  {
    name: 'Tom Uhlig',
    position: 'Consultant - Liquid Reply',
    photo: TomPhoto,
    url: 'https://www.linkedin.com/in/msuemmchen/',
  },
  {
    name: 'Anela Avdibegovic',
    position: 'Marketing Manager - white duck',
    photo: AnelaPhoto,
    url: 'https://www.linkedin.com/in/anela-avdibegovic/',
  },
  {
    name: 'Dominik Bittl',
    position: 'Senior Solution Architect - Red Hat',
    photo: DominikPhoto,
    url: 'https://www.linkedin.com/in/dominik-bittl/',
  },
];

const LOGOS = [
  { icon: liquid, url: 'http://liquidreply.com/', iconClassName: 'w-[250px] h-auto' },
  { icon: whiteduck, url: 'https://whiteduck.de/', iconClassName: 'w-[250px] h-auto' },
  { icon: QAware, url: 'https://www.qaware.de/', iconClassName: 'w-[250px] h-auto' },
];

const Members = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container">
      <ul className="mt-20 grid grid-cols-4 gap-8 lg:gap-6 md:flex md:flex-wrap md:justify-evenly [@media(max-width:900px)]:mx-auto [@media(max-width:900px)]:max-w-[570px]">
        {ITEMS.map(({ name, position, photo, url }, index) => (
          <li
            className="flex w-[240px] flex-col lg:w-52 md:w-48 sm:w-auto sm:max-w-[200px]"
            key={index}
          >
            <div className="h-64 w-full overflow-hidden rounded-2xl">
              <img className="h-full w-full object-cover" src={photo} loading="lazy" alt={name} />
            </div>

            <p className="mt-2.5 text-2xl font-bold leading-normal text-primary-1 sm:text-left">
              {name}
            </p>

            <span className="mt-1.5 text-primary-1">{position}</span>

            <Link
              className="mt-2.5 text-base font-semibold leading-normal text-blue-1"
              to={url}
              target="_blank"
            >
              LinkedIn
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <div
      className="mx-auto mt-36"
      style={{
        minHeight: '15vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '4rem',
      }}
    >
      {LOGOS.map(({ icon, url, iconClassName }, index) => (
        <li
          className="flex min-h-[80px] w-[260px] items-center justify-center sm:min-h-[120px]"
          key={index}
        >
          <Link className="flex h-full w-full items-center justify-center" to={url}>
            <img
              className={clsx(iconClassName, 'max-w-[30vh]')}
              src={icon}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
            />
          </Link>
        </li>
      ))}
    </div>
  </section>
);

export default Members;
