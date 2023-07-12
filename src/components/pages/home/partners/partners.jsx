import React from 'react';

import Link from 'components/shared/link';
import Cloudnative from 'icons/cloudnative.svg';
import GermanTech from 'icons/germantech.webp';
import Kubecareers from 'icons/kubecareers.svg';
import Kubeevents from 'icons/kubeevents.svg';
import Syseleven from 'icons/syseleven.png';
import Audi from 'icons/Audi_Rings_bl-RGB.png';

const TITLE = 'Community & Media Partners';

const ITEMS = [
  { icon: Cloudnative, url: 'https://www.cncf.io/' },
  { icon: GermanTech, url: 'https://germantechjobs.de/' },
  { icon: Syseleven, url: 'https://www.syseleven.de/' },
  { icon: Kubeevents, url: 'https://kube.events/' },
  { icon: Kubecareers, url: 'https://kube.careers/' },
  { icon: Audi, url: 'https://www.audi.com/' },
];

const Partners = () => (
  <section className="safe-paddings relative bg-white pt-24 pb-48 lg:pb-40 md:pb-32 sm:pb-24 sm:pt-16">
    <div className="container text-center">
      <h2 className="text-6xl font-bold leading-denser text-primary-1">{TITLE}</h2>

      <ul className="mx-auto mt-20 flex max-w-[1000px] flex-wrap justify-center gap-y-14 gap-x-8">
        {ITEMS.map(({ icon, url }, index) => (
          <li className="flex min-h-[80px] min-w-[280px] items-center justify-center" key={index}>
            <Link className="flex h-full w-full items-center justify-center" to={url}>
              <img
                className="max-w-[210px]"
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
    </div>
  </section>
);

export default Partners;
