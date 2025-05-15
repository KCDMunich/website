import clsx from 'clsx';
import React from 'react';

import Adn from 'icons/adn_logo.png';
import ApeFactory from 'icons/apefactory.svg';
import Cncf from 'icons/cncf.svg';
import Kubecareers from 'icons/kubecareers.svg';
import Kubeevents from 'icons/kubeevents_2.svg';
import liquid from 'icons/liquid.png';
import MetalStack from 'icons/metalstackcloud.webp';
import PlatformEngineeringLabs from 'icons/platformengineeringlabs.png';
import QAware from 'icons/QAware_p.png';
import solarwinds from 'icons/solarwinds.webp';
import Steadforce from 'icons/steadforce_logo.png';
import SysEleven from 'icons/syseleven.png';
import whiteduck from 'icons/whiteduck.png';
import ReadHat from 'icons/red-hat.svg';
import aws from 'icons/aws.svg';
import PerfectScale from 'icons/PerfectScale.png';
import vCluster from 'icons/vcluster.svg';
import './sponsor.css';

const CARD_STYLES = 'w-[200px] h-[100px]';

const SHOW_SPONSORS = true;

const tierConfig = {
  gold: {
    title: 'Gold',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-yellow-50 text-yellow-500',
  },
  silver: {
    title: 'Silver',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-gray-50 text-gray-500',
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-orange-50 text-orange-500',
  },
  evening: {
    title: 'Evening Event',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-purple-50 text-purple-500',
  },
  organizer: {
    title: 'Organizers',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-blue-50 text-blue-500',
  },
  partner: {
    title: 'Community & Media Partners',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-green-50 text-green-500',
  },
};

const sponsorsList = [
  {
    name: 'APE Factory',
    icon: ApeFactory,
    url: 'https://www.apefactory.com/de',
    tier: 'gold',
    logoWidth: 100,
    logoHeight: 90,
  },
  {
    name: 'solarwinds',
    icon: solarwinds,
    url: 'https://www.solarwinds.com/',
    tier: 'gold',
    logoWidth: 120,
    logoHeight: 100,
  },
  {
    name: 'aws',
    icon: aws,
    url: 'https://aws.amazon.com/',
    tier: 'silver',
    logoWidth: 90,
    logoHeight: 45,
  },
  {
    name: 'MetalStack',
    icon: MetalStack,
    url: 'https://metalstack.cloud/de',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'QAware',
    icon: QAware,
    url: 'https://www.qaware.de/',
    tier: 'silver',
    logoWidth: 100,
    logoHeight: 75,
  },
  {
    name: 'PerfectScale',
    icon: PerfectScale,
    url: 'https://www.perfectscale.io/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'RedHat',
    icon: ReadHat,
    url: 'https://www.redhat.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Steadforce',
    icon: Steadforce,
    url: 'https://www.steadforce.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'vCluster',
    icon: vCluster,
    url: 'https://www.vcluster.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'ADN',
    icon: Adn,
    url: 'https://www.adn.de/',
    tier: 'bronze',
    logoWidth: 130,
    logoHeight: 100,
  },
  {
    name: 'Platform Engineering Labs',
    icon: PlatformEngineeringLabs,
    url: 'https://platform.engineering/',
    tier: 'bronze',
    logoWidth: 100,
    logoHeight: 100,
  },
  {
    name: 'SysEleven',
    icon: SysEleven,
    url: 'https://www.syseleven.de/',
    tier: 'bronze',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Liquid Reply',
    icon: liquid,
    url: 'https://www.reply.com/liquid-reply/en/',
    tier: 'organizer',
    logoWidth: 135,
    logoHeight: 100,
  },
  {
    name: 'white duck',
    icon: whiteduck,
    url: 'https://whiteduck.de/',
    tier: 'organizer',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Kube Careers',
    icon: Kubecareers,
    url: 'https://kube.careers/',
    tier: 'partner',
    logoWidth: 100,
    logoHeight: 100,
  },
  {
    name: 'Kube Events',
    icon: Kubeevents,
    url: 'https://kube.events/',
    tier: 'partner',
    logoWidth: 100,
    logoHeight: 100,
  },
  {
    name: 'APE Factory',
    icon: ApeFactory,
    url: 'https://www.apefactory.com/de',
    tier: 'evening',
    logoWidth: 90,
    logoHeight: 90,
  },
  {
    name: 'CNCF',
    icon: Cncf,
    url: 'https://www.cncf.io/',
    tier: 'evening',
    logoWidth: 160,
    logoHeight: 90,
  },
];

const contactEmail = 'team@cloudnativesummit.de';

const DEFAULT_LOGO_WIDTH = 150;
const DEFAULT_LOGO_HEIGHT = 70;

const Sponsors = () => {
  if (!SHOW_SPONSORS) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Become a Sponsor</h2>
          <p className="mb-8 text-lg text-gray-500">
            Support our local cloud native community by sponsoring CNS Munich
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              className="button"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                window.location.href = `mailto:${contactEmail}`;
              }}
            >
              Contact Us
            </button>
            <p className="text-sm text-gray-600">
              Contact us at{' '}
              <a
                href={`mailto:${contactEmail}`}
                className=" hover:underline"
                style={{ color: '#004258', fontWeight: 'bold' }}
              >
                {contactEmail}
              </a>{' '}
              to learn more about sponsorship opportunities
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show the full sponsors section when SHOW_SPONSORS is true
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="section-title">Our sponsors</h2>
      <div className="mb-16 text-center">
        <p className="mb-8 text-lg text-gray-500">
          Support our local cloud native community by sponsoring CNS Munich
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="https://docs.google.com/presentation/d/1NhUXEXdfWjAt1DmFLjMPolwkuE6Y_BZiNQKWYvVmK5Q/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-1 px-6 py-3 text-white transition-all"
          >
            Sponsor Prospectus
          </a>
          <p className="mb-8 text-lg text-gray-500" style={{ textAlign: 'center' }}>
            Thank you to our amazing sponsors who make this event possible
          </p>
        </div>
      </div>

      {Object.entries(tierConfig).map(([tier, config]) => {
        const tierSponsors = sponsorsList.filter((s) => s.tier === tier);

        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier} className="mb-12">
            <div className="mb-16 text-center" />
            <div className="mb-6 flex items-center justify-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
              <span
                className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', config.badgeClass)}
              >
                {tierSponsors.length}
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
                      'flex items-center justify-center rounded-lg transition-all duration-200',
                      'hover:scale-[1.02] hover:shadow-md',
                      CARD_STYLES,
                      config.class
                    )}
                  >
                    <div className="relative flex h-full w-full items-center justify-center">
                      <img
                        src={sponsor.icon}
                        alt={sponsor.name}
                        loading="lazy"
                        className="object-contain"
                        style={{
                          maxWidth: sponsor.logoWidth ? sponsor.logoWidth : DEFAULT_LOGO_WIDTH,
                          maxHeight: sponsor.logoHeight ? sponsor.logoHeight : DEFAULT_LOGO_HEIGHT,
                        }}
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
