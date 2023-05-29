import clsx from 'clsx';
import React from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import ApeFactory from 'icons/apefactory.webp';
import Camptocamp from 'icons/camptocamp.svg';
import Elasticbrains from 'icons/elasticbrain.webp';
import Exoscale from 'icons/exoscale.webp';
import Grafana from 'icons/grafanalabs.webp';
import Isovalent from 'icons/isovalent.svg';
import Lumigo from 'icons/lumigo.webp';
import MetalStack from 'icons/metalstackcloud.webp';
import Mkdev from 'icons/mkdev.png';
import Qaware from 'icons/qaware.webp';
import Redhat from 'icons/redhat.png';
import Stormforge from 'icons/stormforge.webp';


const TITLE = 'Sponsors';

const ITEMS = [
  {
    title: 'Gold',
    logos: [
      { icon: ApeFactory, url: 'https://www.apefactory.com/de' },
      { icon: Qaware, url: 'https://www.qaware.de/en/' },
      { icon: Elasticbrains, url: 'https://www.elasticbrains.de/de/' },
      { icon: MetalStack, url: 'https://metalstack.cloud/de' },
    ],
    cardClassname: 'min-w-[488px] max-w-[330px] min-h-[152px] sm:min-w-[350px] sm:min-h-[130px]',
    iconClassname: 'max-w-[390px] sm:max-w-[350px]',
  },
  {
    title: 'Silver',
    logos: [
      { icon: Isovalent, url: 'https://isovalent.com/' },
      { icon: Grafana, url: 'https://grafana.com/' },
      { icon: Camptocamp, url: 'https://www.camptocamp.com/en' },
      { icon: Exoscale, url: 'https://www.exoscale.com/' },
      { icon: Stormforge, url: 'https://www.stormforge.io/?utm_medium=tradeshow&utm_source=conference-website&utm_campaign=2023-07_kcd-munich' },
      { icon: Lumigo, url: 'https://lumigo.io/' },
    ],
    cardClassname: 'min-w-[384px] min-h-[122px] sm:min-w-[320px] sm:min-h-[115px]',
    iconClassname: 'max-w-[330px] sm:min-w-[290px]',
  },
  {
    title: 'Bronze',
    logos: [
      { icon: Mkdev, url: 'https://mkdev.me/' },
      { icon: Redhat, url: 'https://www.redhat.com/de/our-code-is-open?sc_cid=7013a000002w5fEAAQ&gclsrc=aw.ds' }
    ],
    cardClassname: 'min-w-[280px] min-h-[104px] sm:min-w-[250px] sm:min-h-[94px]',
    iconClassname: 'max-w-[330px] sm:min-w-[290px]',
  },
];

const Sponsors = () => (
  <section className="safe-paddings relative bg-white sm:pb-16">
    <div className="container text-center">
      <h2 className="text-6xl font-bold leading-denser text-primary-1" id={LINKS.sponsors.id}>
        {TITLE}
      </h2>
      <p className="mx-auto mt-5 max-w-[800px] text-lg leading-normal text-primary-1">
        We would like to extend a special thank you to our sponsors for their support and commitment
        to the community. We coul not do it without them! If you are interested in becoming a
        sponsor, please contact{' '}
        <Link
          className="font-semibold"
          theme="blue-underlined"
          to="mailto:organizers-munich@kubernetescommunitydays.org "
        >
          organizers-munich@kubernetescommunitydays.org
        </Link>
      </p>

      <ul className="mt-16 flex flex-col">
        {ITEMS.map(({ title, logos, cardClassname, iconClassname }, index) => (
          <li className="" key={index}>
            <p className="text-center text-2xl font-bold uppercase leading-normal text-primary-1">
              {title}
            </p>

            <ul className="mt-10 mb-[70px] flex flex-wrap justify-center gap-x-8 xl:gap-y-6">
              {logos.map(({ icon, url }, index) => (
                <li className={clsx('flex items-center justify-center', cardClassname)} key={index}>
                  <Link
                    className="flex h-full w-fit items-center justify-center"
                    to={url}
                    target="_blank"
                  >
                    <img
                      className={clsx('h-auto w-auto', iconClassname)}
                      src={icon}
                      width="auto"
                      height="auto"
                      loading="lazy"
                      alt="sponsor-logo"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Sponsors;
