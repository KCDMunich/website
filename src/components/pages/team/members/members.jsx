import clsx from 'clsx';
import React from 'react';

import Link from 'components/shared/link';
import liquid from 'icons/liquid.png';
import redhat from 'icons/redhat.png';
import unikube from 'icons/unikube.svg';
import whiteduck from 'icons/whiteduck.png';

import AnelaPhoto from './images/anela_a.jpeg';
import DominikPhoto from './images/dominik_b.jpeg';
import HannesPhoto from './images/hannes-h.jpeg';
import MarkusPhoto from './images/markus_s.jpeg';
import MaxKörbächerPhoto from './images/max_k.jpg';
import NicoPhoto from './images/nico-m.jpeg';
import TomPhoto from './images/tom_u.jpeg';

const ITEMS = [
  {
    name: 'Max Körbächer',
    position: 'Co-founder - Liquid Reply | CNCF Ambassador',
    photo: MaxKörbächerPhoto,
    url: 'https://www.linkedin.com/in/maxkoerbaecher/',
  },
  {
    name: 'Nico Meisenzal',
    position: 'Senior Cloud & DevOps Consultant - white duck',
    photo: NicoPhoto,
    url: 'https://www.linkedin.com/in/nicomeisenzahl/',
  },
  {
    name: 'Hannes Hanusch',
    position: 'Co-Founder - UNIKUBE',
    photo: HannesPhoto,
    url: 'https://www.linkedin.com/in/hannes-hanusch/',
  },
  {
    name: 'Markus Sümmchen',
    position: 'CEO - white duck',
    photo: MarkusPhoto,
    url: 'https://www.linkedin.com/in/msuemmchen/',
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
  { icon: liquid, url: 'http://liquidreply.com/', iconClassName: 'w-[260px] h-auto' },
  { icon: whiteduck, url: 'https://whiteduck.de/', iconClassName: 'w-[200px]' },
  { icon: unikube, url: 'https://unikube.io/', iconClassName: '' },
  { icon: redhat, url: 'https://www.redhat.com/en', iconClassName: 'w-28 h-[72px]' },
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

    <ul className="mx-auto mt-36 flex flex-wrap justify-center gap-x-4">
      {LOGOS.map(({ icon, url, iconClassName }, index) => (
        <li className="flex min-h-[80px] min-w-[280px] items-center justify-center" key={index}>
          <Link className="flex h-full w-full items-center justify-center" to={url}>
            <img
              className={clsx(iconClassName, 'max-w-[260px] md:max-w-[220px]')}
              src={icon}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
            />
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Members;
