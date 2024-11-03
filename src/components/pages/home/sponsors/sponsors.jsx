import React from 'react';
import clsx from 'clsx';

// Icon imports
import adn from 'icons/adn_logo.png';
import Akamai from 'icons/akamai.svg';
import ApeFactory from 'icons/apefactory.webp';
import Camptocamp from 'icons/camptocamp.svg';
import cisco from 'icons/cisco.png';
import Cloudnative from 'icons/cloudnative.svg';
import consol from 'icons/consol.png';
import csp2 from 'icons/csp2_claim_logo_V1.jpg';
import Dgi from 'icons/Dgi.png';
import dynatrace from 'icons/dynatrace.png';
import Exoscale from 'icons/exoscale.webp';
import germantech from 'icons/germantech.svg';
import Isovalent from 'icons/isovalent.svg';
import Kubecareers from 'icons/kubecareers_1.svg';
import Kubeevents from 'icons/kubeevents_2.svg';
import liquid from 'icons/liquid.png';
import Maiborn from 'icons/maiborn.jpeg';
import MetalStack from 'icons/metalstackcloud.webp';
import MindcurvGmbH from 'icons/Mindcurv_Logo_Color.svg';
import paloalto from 'icons/paloalto.jpeg';
import pulumi from 'icons/pulumi_logo.svg';
import Qaware from 'icons/qaware.svg';
import spectrocloud from 'icons/spectrocloud.svg';
import Splunk from 'icons/Splunk_logo.svg';
import StackState from 'icons/stackstate.png';
import Steadforce from 'icons/steadforce_logo.png';
import Syseleven from 'icons/syseleven.png';
import Tigera from 'icons/Tigera_Logo_Logo.jpg';
import veeam from 'icons/veeam.png';
import whiteduck from 'icons/whiteduck.png';

const CARD_STYLES = 'w-[180px] h-[120px]'; // Einheitliche Kartengröße für alle Tiers

const tierConfig = {
  gold: {
    title: 'Gold',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-yellow-50  text-yellow-500',
    count: 6,
  },
  silver: {
    title: 'Silver',
    class: 'bg-white  shadow-sm',
    badgeClass: 'bg-gray-50 text-gray-500',
    count: 12,
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-bronze-50 text-bronze-500',
    count: 4,
  },
  organizer: {
    title: 'Organizers',
    class: 'bg-white  shadow-sm',
    badgeClass: 'bg-blue-50 text-blue-500',
    count: 3,
  },
  partner: {
    title: 'Community & Media Partners',
    class: 'bg-white  shadow-sm',
    badgeClass: 'bg-green-50 text-green-500',
    count: 5,
  },
};

const Sponsors = () => {
  const sponsors = [
    // Gold Sponsors
    { name: 'APE Factory', icon: ApeFactory, url: 'https://www.apefactory.com/de', tier: 'gold' },
    { name: 'Cisco', icon: cisco, url: 'https://www.cisco.com/', tier: 'gold' },
    { name: 'Consol', icon: consol, url: 'https://www.consol.com/', tier: 'gold' },
    { name: 'MetalStack', icon: MetalStack, url: 'https://metalstack.cloud/de', tier: 'gold' },
    { name: 'Palo Alto', icon: paloalto, url: 'https://www.paloaltonetworks.com/', tier: 'gold' },
    { name: 'Veeam', icon: veeam, url: 'https://www.veeam.com/', tier: 'gold' },

    // Silver Sponsors
    { name: 'Akamai', icon: Akamai, url: 'https://www.akamai.com/', tier: 'silver' },
    { name: 'Camptocamp', icon: Camptocamp, url: 'https://www.camptocamp.com/en', tier: 'silver' },
    { name: 'Dynatrace', icon: dynatrace, url: 'https://www.dynatrace.com/', tier: 'silver' },
    { name: 'Exoscale', icon: Exoscale, url: 'https://www.exoscale.com/', tier: 'silver' },
    { name: 'Isovalent', icon: Isovalent, url: 'https://www.isovalent.com/', tier: 'silver' },
    { name: 'Mindcurv', icon: MindcurvGmbH, url: 'https://www.mindcurv.com/', tier: 'silver' },
    { name: 'Pulumi', icon: pulumi, url: 'https://www.pulumi.com/', tier: 'silver' },
    { name: 'Spectro Cloud', icon: spectrocloud, url: 'https://spectrocloud.com/', tier: 'silver' },
    { name: 'Splunk', icon: Splunk, url: 'https://www.splunk.com/', tier: 'silver' },
    { name: 'StackState', icon: StackState, url: 'https://stackstate.com/', tier: 'silver' },
    { name: 'Steadforce', icon: Steadforce, url: 'https://www.steadforce.com/', tier: 'silver' },
    { name: 'Tigera', icon: Tigera, url: 'https://www.tigera.io/', tier: 'silver' },

    // Bronze Sponsors
    { name: 'ADN', icon: adn, url: 'https://shop.adn.de/', tier: 'bronze' },
    {
      name: 'CSP',
      icon: csp2,
      url: 'https://geschaeftskunden.telekom.de/digitale-loesungen/software-as-a-service/microsoft/cloud-solution-partner',
      tier: 'bronze',
    },
    { name: 'Maiborn Wolff', icon: Maiborn, url: 'https://www.maibornwolff.de/', tier: 'bronze' },
    { name: 'DGi', icon: Dgi, url: 'https://www.dg-i.net/', tier: 'bronze' },

    // Organizers
    { name: 'Liquid Reply', icon: liquid, url: 'http://liquidreply.com/', tier: 'organizer' },
    { name: 'White Duck', icon: whiteduck, url: 'https://whiteduck.de/', tier: 'organizer' },
    { name: 'QAware', icon: Qaware, url: 'https://www.qaware.de/en/', tier: 'organizer' },

    // Community & Media Partners
    { name: 'Cloud Native', icon: Cloudnative, url: 'https://www.cncf.io/', tier: 'partner' },
    { name: 'Kube Events', icon: Kubeevents, url: 'https://kube.events/', tier: 'partner' },
    { name: 'Kube Careers', icon: Kubecareers, url: 'https://kube.careers/', tier: 'partner' },
    {
      name: 'German Tech Jobs',
      icon: germantech,
      url: 'https://germantechjobs.de/',
      tier: 'partner',
    },
    { name: 'SysEleven', icon: Syseleven, url: 'https://www.syseleven.de/', tier: 'partner' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Sponsors</h2>
        <p className="text-lg text-gray-500">
          Thank you to our amazing sponsors who make this event possible
        </p>
      </div>

      {Object.entries(tierConfig).map(([tier, config]) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);

        return (
          <div key={tier} className="mb-12">
            <div className="mb-6 flex items-center justify-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
              <span
                className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', config.badgeClass)}
              >
                {config.count}
              </span>
            </div>

            <div className={config.containerClass}>
              <div className="flex flex-wrap justify-center gap-4">
                {tierSponsors.map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'flex items-center justify-center rounded-lg  p-4 transition-all duration-200',
                      'hover:scale-[1.02] hover:shadow-md',
                      CARD_STYLES,
                      config.class
                    )}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={sponsor.icon}
                        alt={sponsor.name}
                        className="absolute inset-0 m-auto h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
                        loading="lazy"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Sponsors;
