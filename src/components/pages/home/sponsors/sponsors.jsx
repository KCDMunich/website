import React from 'react';
import clsx from 'clsx';
import Button from 'components/shared/button';
import Link from 'components/shared/link';
import LINKS from 'constants/links';

import ApeFactory from 'icons/apefactory.webp';
import Camptocamp from 'icons/camptocamp.svg';
//import Elasticbrains from 'icons/elasticbrain.webp';
//import Exoscale from 'icons/exoscale.webp';
//import Grafana from 'icons/grafanalabs.webp';
//import Isovalent from 'icons/isovalent.svg';
//import Lumigo from 'icons/lumigo.webp';
import MetalStack from 'icons/metalstackcloud.webp';
//import Mkdev from 'icons/mkdev.png';
import Qaware from 'icons/qaware.svg';
//import Redhat from 'icons/redhat.png';
//import Stormforge from 'icons/stormforge.webp';
//import Google from 'icons/google-cloud.svg';
//import Okteto from 'icons/okteto.png';
//import Appscode from 'icons/appsCode.png';
//import unikube from 'icons/Blueshoe.webp';
import liquid from 'icons/liquid.png';
import whiteduck from 'icons/whiteduck.png';
import Cloudnative from 'icons/cloudnative.svg';
import Kubecareers from 'icons/kubecareers_1.svg';
import Kubeevents from 'icons/kubeevents_2.svg';
import StackState from 'icons/stackstate.png';

const TITLE = 'Sponsors';

const ITEMS = [
  {
    title: 'Gold',
    logos: [
      { icon: ApeFactory, url: 'https://www.apefactory.com/de' },
      //{ icon: Elasticbrains, url: 'https://www.elasticbrains.de/de/' },
      { icon: MetalStack, url: 'https://metalstack.cloud/de' },
      //{ icon: Google, url: 'https://www.google.com/' },
    ],
    cardClassname: 'min-w-[488px] max-w-[330px] min-h-[152px] sm:min-w-[350px] sm:min-h-[130px]',
    iconClassname: 'max-w-[390px] sm:max-w-[350px]',
  },
  {
    title: 'Silver',
    logos: [
      //{ icon: Isovalent, url: 'https://isovalent.com/' },
      //{ icon: Grafana, url: 'https://grafana.com/' },
      { icon: Camptocamp, url: 'https://www.camptocamp.com/en' },
      //{ icon: Exoscale, url: 'https://www.exoscale.com/' },
      //{ icon: Stormforge, url: 'https://www.stormforge.io/?utm_medium=tradeshow&utm_source=conference-website&utm_campaign=2023-07_kcd-munich',},
      //{ icon: Lumigo, url: 'https://lumigo.io/' },
      //{ icon: Okteto, url: 'https://www.okteto.com' },
      //{ icon: Mkdev, url: 'https://mkdev.me/' },
      //{ icon: Appscode, url: 'https://appscode.com/' },
      { icon: StackState, url: 'https://stackstate.com/' },
    ],
    cardClassname: 'min-w-[384px] min-h-[122px] sm:min-w-[320px] sm:min-h-[115px]',
    iconClassname: 'max-w-[330px] sm:min-w-[290px]',
  },
  //  {
  //    title: 'Bronze',
  //    logos: [
  //      //{ icon: Redhat, url: 'https://www.redhat.com/de/our-code-is-open?sc_cid=7013a000002w5fEAAQ&gclsrc=aw.ds',},
  //    ],
  //    cardClassname: 'min-w-[280px] min-h-[104px] sm:min-w-[250px] sm:min-h-[94px]',
  //    iconClassname: 'max-w-[330px] sm:min-w-[290px]',
  //  },
  {
    title: 'Organizers',
    logos: [
      { icon: liquid, url: 'http://liquidreply.com/' },
      { icon: whiteduck, url: 'https://whiteduck.de/' },
      { icon: Qaware, url: 'https://www.qaware.de/en/' },
      //{ icon: unikube, url: 'https://www.blueshoe.io/' },
    ],
    cardClassname: 'min-w-[280px] min-h-[104px] sm:min-w-[250px] sm:min-h-[94px]',
    iconClassname: 'max-w-[300px] sm:min-w-[104px]',
  },
  {
    title: 'Community & Media Partners',
    logos: [
      { icon: Cloudnative, url: 'https://www.cncf.io/' },
      { icon: Kubeevents, url: 'https://kube.events/' },
      { icon: Kubecareers, url: 'https://kube.careers/' },
    ],
    cardClassname: 'min-w-[280px] min-h-[104px] sm:min-w-[250px] sm:min-h-[94px]',
    iconClassname: 'max-w-[220px] sm:min-w-[290px]',
  },
];

const Sponsors = () => (
  <section className="safe-paddings relative bg-white sm:pb-16">
    <div className="container-md text-primary-1 text-center">
      <h2 className="leading-denser text-primary-1 text-6xl font-bold" id={LINKS.sponsors.id}>
        {TITLE}
      </h2>
      <p className="text-primary-1 text-lg leading-normal" style={{ marginTop: '4vh' }}>
        Join us in making KCD Munich a memorable and impactful event for all attendees. To explore
        sponsorship opportunities, please don't hesitate to get in touch with us today. Your support
        will help us create an unforgettable experience for the community while enhancing your
        brand's visibility and recognition. Contact us at{' '}
        <Link
          className="font-semibold"
          theme="blue-underlined"
          to="mailto:organizers-munich@kubernetescommunitydays.org"
        >
          organizers-munich@kubernetescommunitydays.org
        </Link>
      </p>
      <div style={{ marginTop: '4vh', marginBottom: '10vh' }}>
        <Button
          className="group relative -mr-2 inline-flex items-center justify-center overflow-hidden border-none p-0.5 font-bold"
          to="https://docs.google.com/presentation/d/1G7CbTjV023TC7kt7json3j0CDDN0FqVpm7Hz-pZh4cs/edit?usp=sharingk"
          theme="primary"
          target="_blank"
        >
          <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
          <span className="duration-400 relative rounded-md bg-gray-900 px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
            <span className="relative text-white">Information Slide</span>
          </span>
        </Button>
      </div>
      <ul className="mt-16 flex flex-col">
        {ITEMS.map(({ title, logos, cardClassname, iconClassname }, index) => (
          <li className="" key={index}>
            <p className="text-primary-1 text-center text-4xl font-bold leading-normal">{title}</p>

            <ul className="mb-[70px] mt-10 flex flex-wrap justify-center gap-x-8 xl:gap-y-6">
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
