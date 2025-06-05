import clsx from 'clsx';
import React from 'react';

import Adn from 'icons/adn_logo.png';
import ApeFactory from 'icons/apefactory.svg';
import aws from 'icons/aws.svg';
import Cncf from 'icons/cncf.svg';
import ItSchulungenCom from 'icons/its_logo_2020_tt_2_raw.png';
import Kubecareers from 'icons/kubecareers.svg';
import Kubeevents from 'icons/kubeevents_2.svg';
import liquid from 'icons/liquid.png';
import MetalStack from 'icons/metalstackcloud.webp';
import PerfectScale from 'icons/PerfectScale.png';
import PlatformEngineeringLabs from 'icons/platformengineeringlabs.png';
import QAware from 'icons/QAware_p.png';
import ReadHat from 'icons/red-hat.svg';
import solarwinds from 'icons/solarwinds.webp';
import Steadforce from 'icons/steadforce_logo.png';
import SysEleven from 'icons/syseleven.png';
import vCluster from 'icons/vCluster.svg';
import whiteduck from 'icons/whiteduck.png';
import './sponsor.css';

const SHOW_SPONSORS = true;

const tierConfig = {
  'organizer-platinum': {
    title: 'Organizers',
    class:
      'bg-white shadow-lg border-2 border-primary-1/20 hover:shadow-xl hover:border-primary-1/40',
    badgeClass: 'bg-primary-1 text-white font-semibold',
    cardSize: 'w-[280px] h-[140px]',
    special: true,
    subtitle: 'Event Organization',
  },
  platinum: {
    title: 'Platinum',
    class:
      'bg-white shadow-lg border-2 border-primary-1/20 hover:shadow-xl hover:border-primary-1/40',
    badgeClass: 'bg-primary-1 text-white font-semibold',
    cardSize: 'w-[280px] h-[140px]',
    special: true,
    subtitle: 'Premium Partners',
  },
  gold: {
    title: 'Gold',
    class: 'bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-amber-200/50',
    badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200',
    cardSize: 'w-[240px] h-[120px]',
  },
  silver: {
    title: 'Silver',
    class: 'bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-gray-200/50',
    badgeClass: 'bg-gray-100 text-gray-700 border border-gray-200',
    cardSize: 'w-[200px] h-[100px]',
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-orange-200/50',
    badgeClass: 'bg-orange-100 text-orange-800 border border-orange-200',
    cardSize: 'w-[180px] h-[90px]',
  },
  evening: {
    title: 'Evening Event',
    class: 'bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-purple-200/50',
    badgeClass: 'bg-purple-100 text-purple-800 border border-purple-200',
    cardSize: 'w-[200px] h-[100px]',
  },
  organizer: {
    title: 'Organizers',
    class: 'bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200/50',
    badgeClass: 'bg-blue-100 text-blue-800 border border-blue-200',
    cardSize: 'w-[200px] h-[100px]',
  },
  partner: {
    title: 'Community & Media Partners',
    class: 'bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-green-200/50',
    badgeClass: 'bg-green-100 text-green-800 border border-green-200',
    cardSize: 'w-[180px] h-[90px]',
  },
};

const sponsorsList = [
  {
    name: 'APE Factory',
    icon: ApeFactory,
    url: 'https://www.apefactory.com/de',
    tier: 'gold',
    logoWidth: 120,
    logoHeight: 100,
  },
  {
    name: 'solarwinds',
    icon: solarwinds,
    url: 'https://www.solarwinds.com/',
    tier: 'gold',
    logoWidth: 140,
    logoHeight: 110,
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
    tier: 'organizer-platinum',
    logoWidth: 170,
    logoHeight: 130,
  },
  {
    name: 'white duck',
    icon: whiteduck,
    url: 'https://whiteduck.de/',
    tier: 'organizer-platinum',
    logoWidth: 180,
    logoHeight: 130,
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
    logoWidth: 115,
    logoHeight: 100,
  },
  {
    name: 'IT-Schulungen.com',
    icon: ItSchulungenCom,
    url: 'https://www.it-schulungen.com/',
    tier: 'partner',
    logoWidth: 150,
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
    <section className="safe-paddings relative bg-white pb-20 pt-20 lg:pb-32 md:py-24 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="section-title">Our sponsors</h2>
            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600">
              Thank you to our amazing sponsors who make this event possible. Support our local
              cloud native community by sponsoring CNS Munich.
            </p>
            <div className="mb-16">
              <a
                href="https://docs.google.com/presentation/d/1NhUXEXdfWjAt1DmFLjMPolwkuE6Y_BZiNQKWYvVmK5Q/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="button inline-block"
              >
                Sponsor Prospectus
              </a>
            </div>
          </div>
        </div>
      </div>

      {Object.entries(tierConfig).map(([tier, config]) => {
        const tierSponsors = sponsorsList.filter((s) => s.tier === tier);

        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier} className="container mb-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <h3
                    className={clsx(
                      'text-3xl font-bold',
                      config.special ? 'text-primary-1' : 'text-gray-900'
                    )}
                  >
                    {config.title}
                  </h3>
                  <span
                    className={clsx(
                      'rounded-full px-3 py-1 text-sm font-medium',
                      config.badgeClass
                    )}
                  >
                    {tierSponsors.length}
                  </span>
                </div>
                {config.special && config.subtitle && (
                  <p className="text-lg text-slate-600">{config.subtitle}</p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-8">
                {tierSponsors.map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'sponsor-card group flex items-center justify-center rounded-lg transition-all duration-300',
                      'hover:-translate-y-2 hover:scale-105',
                      config.cardSize,
                      config.class
                    )}
                  >
                    <div className="relative flex h-full w-full items-center justify-center p-6">
                      <img
                        src={sponsor.icon}
                        alt={sponsor.name}
                        loading="lazy"
                        className="object-contain transition-all duration-300 group-hover:scale-110"
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
