import clsx from 'clsx';
import React from 'react';

import Button from 'components/shared/button';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import adn from 'icons/adn_logo.png';
import Akamai from 'icons/akamai.svg';
import ApeFactory from 'icons/apefactory.webp';
import Camptocamp from 'icons/camptocamp.svg';
import cisco from 'icons/cisco.png';
import Cloudnative from 'icons/cloudnative.svg';
import consol from 'icons/consol.png';
import csp2 from 'icons/csp2_claim_logo_V1.jpg';
import dynatrace from 'icons/dynatrace.png';
import Exoscale from 'icons/exoscale.webp';
import germantech from 'icons/germantech.svg';
import Isovalent from 'icons/isovalent.svg';
import Kubecareers from 'icons/kubecareers_1.svg';
import Kubeevents from 'icons/kubeevents_2.svg';
import liquid from 'icons/liquid.png';
import MetalStack from 'icons/metalstackcloud.webp';
import MindcurvGmbH from 'icons/Mindcurv_Logo_Color.svg';
import pulumi from 'icons/pulumi_logo.svg';
import Qaware from 'icons/qaware.svg';
import spectrocloud from 'icons/spectrocloud.svg';
import StackState from 'icons/stackstate.png';
import Steadforce from 'icons/steadforce_logo.png';
import Syseleven from 'icons/syseleven.png';
import veeam from 'icons/veeam.png';
import whiteduck from 'icons/whiteduck.png';
import Maiborn from 'icons/maiborn.jpeg';
import Dgi from 'icons/Dgi.png';
import Tigera from 'icons/Tigera_Logo_Logo.jpg';
import Splunk from 'icons/Splunk_logo.svg';

const TITLE = 'Sponsors';

const ITEMS = [
  {
    title: 'Gold',
    logos: [
      { icon: ApeFactory, url: 'https://www.apefactory.com/de' },
      { icon: cisco, url: 'https://www.cisco.com/' },
      { icon: consol, url: 'https://www.consol.com/' },
      { icon: MetalStack, url: 'https://metalstack.cloud/de' },
      { icon: veeam, url: 'https://www.veeam.com/' },
    ],
    cardClassname: 'min-w-[488px] max-w-[330px] min-h-[152px] sm:min-w-[350px] sm:min-h-[130px]',
    iconClassname: 'max-w-[390px] sm:max-w-[350px]',
  },
  {
    title: 'Silver',
    logos: [
      { icon: Akamai, url: 'https://www.akamai.com/' },
      { icon: Camptocamp, url: 'https://www.camptocamp.com/en' },
      { icon: dynatrace, url: 'https://www.dynatrace.com/' },
      { icon: Exoscale, url: 'https://www.exoscale.com/' },
      { icon: Isovalent, url: 'https://www.isovalent.com/' },
      { icon: MindcurvGmbH, url: 'https://www.mindcurv.com/' },
      { icon: pulumi, url: 'https://www.pulumi.com/' },
      { icon: spectrocloud, url: 'https://spectrocloud.com/' },
      { icon: Splunk, url: 'https://www.splunk.com/' },
      { icon: StackState, url: 'https://stackstate.com/' },
      { icon: Steadforce, url: 'https://www.steadforce.com/' },
      { icon: Tigera, url: 'https://www.tigera.io/' },
    ],
    cardClassname: 'min-w-[384px] min-h-[122px] sm:min-w-[320px] sm:min-h-[115px]',
    iconClassname: 'max-w-[330px] sm:min-w-[290px]',
  },
  {
    title: 'Bronze',
    logos: [
      {
        icon: adn,
        url: 'https://shop.adn.de/',
      },
      {
        icon: csp2,
        url: 'https://geschaeftskunden.telekom.de/digitale-loesungen/software-as-a-service/microsoft/cloud-solution-partner',
      },
      {
        icon: Maiborn,
        url: 'https://www.maibornwolff.de/',
      },
      {
        icon: Dgi,
        url: 'https://www.dg-i.net/',
      },
    ],
    cardClassname: 'min-w-[280px] min-h-[104px] sm:min-w-[250px] sm:min-h-[94px]',
    iconClassname: 'max-w-[330px] sm:min-w-[290px]',
  },
  {
    title: 'Organizers',
    logos: [
      { icon: liquid, url: 'http://liquidreply.com/' },
      { icon: whiteduck, url: 'https://whiteduck.de/' },
      { icon: Qaware, url: 'https://www.qaware.de/en/' },
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
      { icon: germantech, url: 'https://germantechjobs.de/' },
      { icon: Syseleven, url: 'https://www.syseleven.de/' },
    ],
    cardClassname: 'min-w-[280px] min-h-[104px] sm:min-w-[250px] sm:min-h-[94px]',
    iconClassname: 'max-w-[220px] sm:min-w-[290px]',
  },
];

const Sponsors = () => (
  <section className="safe-paddings relative bg-white sm:pb-16">
    <div className="container-md text-center text-primary-1">
      <h2 className="text-6xl font-bold leading-denser text-primary-1" id={LINKS.sponsors.id}>
        {TITLE}
      </h2>
      <p className="text-lg leading-normal text-primary-1" style={{ marginTop: '4vh' }}>
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
          <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]" />
          <span className="duration-400 bg-gray-900 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
            <span className="relative text-white">Information Slide</span>
          </span>
        </Button>
      </div>
      <ul className="mt-16 flex flex-col ">
        {ITEMS.map(({ title, logos, cardClassname, iconClassname }, index) => (
          <li className="" key={index}>
            <p
              className="text-center text-4xl font-bold leading-normal text-primary-1"
              style={{
                background:
                  'linear-gradient(to right, #FFFFFF 0%, #7b79791f 30%, #7b79791f 70%, #FFFFFF 100%)',
                borderRadius: '10px',
              }}
            >
              {title}
            </p>

            <ul className="mb-[70px] mt-10 flex flex-wrap justify-center gap-x-8 xl:gap-y-6">
              {logos.map(({ icon, url }, index) => (
                <li className={clsx('flex items-center justify-center', cardClassname)} key={index}>
                  <Link
                    className="flex h-full w-fit items-center justify-center"
                    to={url}
                    target="_blank"
                  >
                    <img
                      className={clsx('h-auto w-3/4', iconClassname)}
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
