import clsx from 'clsx';
import React from 'react';

import Adn from 'icons/adn_logo.png';
import ApeFactory from 'icons/apefactory.svg';
import aws from 'icons/aws.svg';
import Cncf from 'icons/cncf.svg';
import cnz from 'icons/cnz_logo.webp';
import GermanTechJobs from 'icons/germantech.svg';
import ItSchulungenCom from 'icons/its_logo_2020_tt_2_raw.png';
import Kubecareers from 'icons/kubecareers.svg';
import Kubeevents from 'icons/kubeevents_2.svg';
import liquid from 'icons/liquid.png';
import MetalStack from 'icons/metalstackcloud.webp';
import PerfectScale from 'icons/PerfectScale.png';
import PlatformEngineeringLabs from 'icons/platformengineeringlabs.png';
import QAware from 'icons/QAware_p.png';
import ReadHat from 'icons/red-hat.svg';
import Renao from 'icons/renao.webp';
import Sidero from 'icons/Sidero_Black.svg';
import solarwinds from 'icons/solarwinds.webp';
import Steadforce from 'icons/steadforce_logo.png';
import SysEleven from 'icons/syseleven.png';
import vCluster from 'icons/vCluster.svg';
import whiteduck from 'icons/whiteduck.png';
import './sponsor.css';

const SHOW_CURRENT_SPONSORS = false;

const tierConfig = {
  platinum: {
    title: 'Platinum',
    class: 'bg-white border border-gray-100 hover:border-gray-200/50',
    badgeClass: 'bg-gray-100 text-gray-700 border border-gray-200',
    cardSize: 'w-[240px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[180px] sm:h-[90px]',
  },
  gold: {
    title: 'Gold',
    class: 'bg-white border border-gray-100 hover:border-amber-200/50',
    badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200',
    cardSize: 'w-[240px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[180px] sm:h-[90px]',
  },
  silver: {
    title: 'Silver',
    class: 'bg-white border border-gray-100 hover:border-gray-200/50',
    badgeClass: 'bg-gray-100 text-gray-700 border border-gray-200',
    cardSize: 'w-[200px] h-[100px] md:w-[180px] md:h-[90px] sm:w-[160px] sm:h-[80px]',
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white border border-gray-100 hover:border-orange-200/50',
    badgeClass: 'bg-orange-100 text-orange-800 border border-orange-200',
    cardSize: 'w-[180px] h-[90px] md:w-[160px] md:h-[80px] sm:w-[140px] sm:h-[70px]',
  },
  evening: {
    title: 'Evening Event',
    class: 'bg-white border border-gray-100 hover:border-purple-200/50',
    badgeClass: 'bg-purple-100 text-purple-800 border border-purple-200',
    cardSize: 'w-[200px] h-[100px] md:w-[180px] md:h-[90px] sm:w-[160px] sm:h-[80px]',
  },

  partner: {
    title: 'Community & Media Partners',
    class: 'bg-white border border-gray-100 hover:border-green-200/50',
    badgeClass: 'bg-green-100 text-green-800 border border-green-200',
    cardSize: 'w-[180px] h-[90px] md:w-[160px] md:h-[80px] sm:w-[140px] sm:h-[70px]',
  },
};

const sponsorsList = [
  {
    name: 'ADN',
    icon: Adn,
    url: 'https://www.adn.de/',
    tier: 'bronze',
    logoWidth: 130,
    logoHeight: 100,
  },
  {
    name: 'APE Factory',
    icon: ApeFactory,
    url: 'https://www.apefactory.com/de',
    tier: 'gold',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'APE Factory',
    icon: ApeFactory,
    url: 'https://www.apefactory.com/de',
    tier: 'evening',
    logoWidth: 150,
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
    name: 'CNCF',
    icon: Cncf,
    url: 'https://www.cncf.io/',
    tier: 'evening',
    logoWidth: 180,
    logoHeight: 100,
  },
  {
    name: 'CNZ',
    icon: cnz,
    url: 'https://cloudnativezurich.ch/',
    tier: 'partner',
    logoWidth: 140,
    logoHeight: 100,
  },
  {
    name: 'German Tech Jobs',
    icon: GermanTechJobs,
    url: 'https://germantechjobs.de/en',
    tier: 'partner',
    logoWidth: 100,
    logoHeight: 100,
  },
  {
    name: 'IT-Schulungen.com',
    icon: ItSchulungenCom,
    url: 'https://www.it-schulungen.com/',
    tier: 'partner',
    logoWidth: 155,
    logoHeight: 100,
  },
  {
    name: 'Kube Careers',
    icon: Kubecareers,
    url: 'https://kube.careers/',
    tier: 'partner',
    logoWidth: 110,
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
    name: 'Liquid Reply',
    icon: liquid,
    url: 'https://www.reply.com/liquid-reply/en/',
    tier: 'platinum',
    logoWidth: 170,
    logoHeight: 130,
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
    name: 'PerfectScale',
    icon: PerfectScale,
    url: 'https://www.perfectscale.io/',
    tier: 'silver',
    logoWidth: 150,
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
    name: 'QAware',
    icon: QAware,
    url: 'https://www.qaware.de/',
    tier: 'silver',
    logoWidth: 100,
    logoHeight: 75,
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
    name: 'Renao',
    icon: Renao,
    url: 'https://renao.io/',
    tier: 'partner',
    logoWidth: 150,
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
    name: 'Steadforce',
    icon: Steadforce,
    url: 'https://www.steadforce.com/',
    tier: 'silver',
    logoWidth: 150,
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
    name: 'vCluster',
    icon: vCluster,
    url: 'https://www.vcluster.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'white duck',
    icon: whiteduck,
    url: 'https://whiteduck.de/',
    tier: 'platinum',
    logoWidth: 180,
    logoHeight: 130,
  },
  {
    name: 'Sidero',
    icon: Sidero,
    url: 'https://www.siderolabs.com/',
    tier: 'silver',
    logoWidth: 180,
    logoHeight: 130,
  },
];

// Sort sponsorsList alphabetically by name (case-insensitive)
sponsorsList.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

const contactEmail = 'team@cloudnativesummit.de';
const sponsorProspectusUrl =
  'https://docs.google.com/presentation/d/1QVKEiKgR_Q-grdpZ7QR85-xlvoydq3P6ijvpvKF4KmY/edit?slide=id.g3146e190d7b_0_63#slide=id.g3146e190d7b_0_63';

const uniqueSponsorsByName = (() => {
  const seen = new Set();
  return sponsorsList.filter((sponsor) => {
    if (seen.has(sponsor.name)) {
      return false;
    }
    seen.add(sponsor.name);
    return true;
  });
})();

const marqueeSponsors = [...uniqueSponsorsByName, ...uniqueSponsorsByName];

const DEFAULT_LOGO_WIDTH = 150;
const DEFAULT_LOGO_HEIGHT = 70;

const Sponsors = () => {
  if (!SHOW_CURRENT_SPONSORS) {
    return (
      <section id="sponsors" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-12">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-3xl sm:text-2xl">
            Become a Sponsor
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-500 md:mb-6 md:text-base sm:mb-4 sm:text-sm">
            We are finalising the next edition of CNS Munich. Support the community and join our
            roster of partners.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-3 sm:gap-2">
            <a
              className="button px-6 py-3 text-base sm:px-4 sm:py-2 sm:text-sm"
              href={sponsorProspectusUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sponsor Prospectus
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600 sm:text-xs">
            Or email us directly at{' '}
            <a
              href={`mailto:${contactEmail}`}
              className="font-semibold text-primary-1 hover:underline"
            >
              {contactEmail}
            </a>
            .
          </p>
        </div>

        <div className="mt-16 md:mt-12 sm:mt-10">
          <div className="mb-6 text-center md:mb-4 sm:mb-3">
            <h3 className="text-2xl font-semibold text-gray-900 md:text-xl sm:text-lg">
              Our Past Sponsors
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-base text-gray-500 md:text-sm sm:text-xs">
              A glimpse at the organisations that helped us make previous editions happen.
            </p>
          </div>

          <div className="sponsor-slider">
            <div className="sponsor-slider-track" aria-label="Past sponsors carousel">
              {marqueeSponsors.map((sponsor, index) => (
                <a
                  key={`${sponsor.name}-${index}`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-slider-item"
                >
                  <img
                    src={sponsor.icon}
                    alt={sponsor.name}
                    loading="lazy"
                    style={{
                      maxWidth: `${sponsor.logoWidth || DEFAULT_LOGO_WIDTH}px`,
                      maxHeight: `${sponsor.logoHeight || DEFAULT_LOGO_HEIGHT}px`,
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show the full sponsors section when current sponsors are ready
  return (
    <section
      id="sponsors"
      className="safe-paddings relative bg-white pb-20 pt-20 lg:pb-32 md:py-16 sm:py-12"
    >
      <div className="container px-4 lg:px-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="section-title text-4xl font-bold text-gray-900 lg:text-5xl md:text-3xl sm:text-2xl">
              Our sponsors
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 md:mb-8 md:text-lg sm:mb-6 sm:max-w-lg sm:text-base">
              Thank you to our amazing sponsors who make this event possible. Support our local
              cloud native community by sponsoring CNS Munich.
            </p>
            <div className="mb-16 md:mb-12 sm:mb-8">
              <a
                href={sponsorProspectusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button inline-block px-6 py-3 text-base sm:px-4 sm:py-2 sm:text-sm"
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
          <div
            key={tier}
            className={clsx(
              'container mb-20 px-4 lg:px-8 sm:px-6',
              config.premium && 'relative mb-32 md:mb-24 sm:mb-16',
              config.noBackground && 'mb-16 md:mb-12 sm:mb-8'
            )}
          >
            {config.premium && !config.noBackground && (
              <div className="absolute inset-0 -mx-8 -my-8 rounded-3xl bg-gradient-to-r from-primary-1/5 via-primary-1/10 to-primary-1/5 md:-mx-4 md:-my-4 sm:-mx-2 sm:-my-2"></div>
            )}
            <div className="relative mx-auto max-w-7xl">
              <div
                className={clsx(
                  config.noBackground
                    ? 'mb-12 text-center md:mb-8 sm:mb-6'
                    : 'mb-16 text-center md:mb-12 sm:mb-8'
                )}
              >
                <div
                  className={clsx(
                    'flex items-center justify-center gap-4 md:gap-3 sm:gap-2',
                    config.noBackground ? 'mb-4 md:mb-3 sm:mb-2' : 'mb-6 md:mb-4 sm:mb-3'
                  )}
                >
                  {config.premium && !config.noBackground && (
                    <div className="flex items-center gap-2 md:hidden">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-slate-400 to-slate-500 ">
                        <div className="h-3 w-3 rounded-full bg-white shadow-inner"></div>
                      </div>
                      <div className="h-1 w-8 bg-gradient-to-r from-slate-400 to-transparent"></div>
                    </div>
                  )}
                  <h3
                    className={clsx(
                      'font-bold',
                      config.special && !config.noBackground
                        ? 'text-4xl text-primary-1 md:text-3xl sm:text-2xl'
                        : 'text-3xl text-gray-900 md:text-2xl sm:text-xl',
                      config.premium &&
                        !config.noBackground &&
                        'bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 bg-clip-text text-5xl text-transparent md:text-4xl sm:text-3xl'
                    )}
                  >
                    {config.title}
                  </h3>
                  {config.premium && !config.noBackground && (
                    <div className="flex items-center gap-2 md:hidden">
                      <div className="h-1 w-8 bg-gradient-to-l from-slate-400 to-transparent"></div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-slate-400 to-slate-500 ">
                        <div className="h-3 w-3 rounded-full bg-white shadow-inner"></div>
                      </div>
                    </div>
                  )}
                </div>
                {config.subtitle && (
                  <p
                    className={clsx(
                      'text-lg text-slate-600 md:text-base sm:text-sm',
                      config.premium &&
                        !config.noBackground &&
                        'text-xl font-medium text-primary-1/80 md:text-lg sm:text-base'
                    )}
                  >
                    {config.subtitle}
                  </p>
                )}
                {config.premium && !config.noBackground && (
                  <div className="mt-4 flex justify-center md:mt-3 sm:mt-2">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-slate-400 to-transparent shadow-sm md:w-16 sm:w-12"></div>
                  </div>
                )}
              </div>

              <div
                className={clsx(
                  'flex flex-wrap justify-center',
                  config.premium ? 'gap-12 md:gap-8 sm:gap-4' : 'gap-8 md:gap-6 sm:gap-4'
                )}
              >
                {tierSponsors.map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'sponsor-card group flex items-center justify-center rounded-lg transition-all duration-300',
                      'md:hover:scale-102 hover:-translate-y-2 hover:scale-105 md:hover:-translate-y-1',
                      config.cardSize,
                      config.class,
                      config.premium && 'platinum-premium'
                    )}
                  >
                    <div className="relative flex h-full w-full items-center justify-center p-6 md:p-4 sm:p-3">
                      <img
                        src={sponsor.icon}
                        alt={sponsor.name}
                        loading="lazy"
                        className="sponsor-logo object-contain transition-all duration-300 group-hover:scale-110"
                        style={{
                          maxWidth: `${sponsor.logoWidth || DEFAULT_LOGO_WIDTH}px`,
                          maxHeight: `${sponsor.logoHeight || DEFAULT_LOGO_HEIGHT}px`,
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
