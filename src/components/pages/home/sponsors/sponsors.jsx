import clsx from 'clsx';
import React from 'react';

import ApeFactory from 'icons/apefactory.svg';
import Dash0Logo from 'icons/dash0.png';
import Broadcom from 'icons/broadcom.png';
import NutanixLogo from 'icons/NutanixLogo.svg';
import ESolutionsLogo from 'icons/e-solutions.png';
import GermanTechJobs from 'icons/germantech.svg';
import KubeEventsLogo from 'icons/kubeevents_logo.svg';
import LearnCubeLogo from 'icons/learncube.webp';
import Liquid from 'icons/liquid.png';
import Tcslabs from 'icons/tsclabs-dark-large.webp';
import Whiteduck from 'icons/whiteduck.png';
import xcellentLogo from 'icons/x-cellent.png';
import EonLogo from 'icons/eon.jpg';
import Steadforce from 'icons/steadforce_logo.png';
import Metalstack from 'icons/metalstack.svg';

import './sponsor.css';

const SHOW_CURRENT_SPONSORS = true;

const tierConfig = {
  platinum: {
    title: 'Platinum',
    class: 'bg-white',
    badgeClass: 'bg-gray-100 text-gray-700 border border-gray-200',
    cardSize: 'w-[250px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[220px] sm:h-[100px]',
  },
  gold: {
    title: 'Gold',
    class: 'bg-white',
    badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200',
    cardSize: 'w-[250px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[200px] sm:h-[100px]',
  },
  silver: {
    title: 'Silver',
    class: 'bg-white',
    badgeClass: 'bg-gray-100 text-gray-700 border border-gray-200',
    cardSize: 'w-[300px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[260px] sm:h-[100px]',
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white',
    badgeClass: 'bg-orange-100 text-orange-800 border border-orange-200',
    cardSize: 'w-[250px] h-[120px] md:w-[160px] md:h-[80px] sm:w-[160px] sm:h-[80px]',
  },
  evening: {
    title: 'Evening Event',
    class: 'bg-white',
    badgeClass: 'bg-purple-100 text-purple-800 border border-purple-200',
    cardSize: 'w-[250px] h-[120px] md:w-[180px] md:h-[90px] sm:w-[190px] sm:h-[90px]',
  },

  partner: {
    title: 'Community & Media Partners',
    class: 'bg-white',
    badgeClass: 'bg-green-100 text-green-800 border border-green-200',
    cardSize: 'w-[250px] h-[90px] md:w-[160px] md:h-[80px] sm:w-[133px] sm:h-[90px]',
  },

  organizer: {
    title: 'Organizers',
    class: 'bg-white',
    badgeClass: 'bg-blue-100 text-blue-800 border border-blue-200',
    cardSize: 'w-[250px] h-[120px] md:w-[160px] md:h-[80px] sm:w-[160px] sm:h-[80px]',
  },
};

const sponsorsList = [
  {
    name: 'APE Factory',
    icon: ApeFactory,
    url: 'https://www.apefactory.com/de',
    tier: 'gold',
    logoRatio: 1,
  },
  {
    name: 'Broadcom',
    icon: Broadcom,
    url: 'https://www.broadcom.com/',
    tier: 'platinum',
    logoRatio: 4,
    logoHeight: 95,
    logoMaxWidth: 290,
  },
  {
    name: 'Dash0',
    icon: Dash0Logo,
    url: 'https://www.dash0.com/',
    tier: 'gold',
    logoRatio: 5.26,
  },
  {
    name: 'e.solutions GmbH',
    icon: ESolutionsLogo,
    url: 'https://www.esolutions.de/',
    tier: 'silver',
    logoRatio: 5.26,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: 'Eon',
    icon: EonLogo,
    url: 'https://www.eon.com/en/about-us/careers/our-companies/digital-technology.html',
    tier: 'gold',
    logoRatio: 1.9,
  },
  {
    name: 'Eon',
    icon: EonLogo,
    url: 'https://www.eon.com/en/about-us/careers/our-companies/digital-technology.html',
    tier: 'partner',
    logoRatio: 1.9,
  },
  {
    name: 'GermanTechJobs',
    icon: GermanTechJobs,
    url: 'https://germantechjobs.de/',
    tier: 'partner',
    logoRatio: 1.6,
  },
  {
    name: 'kube Events',
    icon: KubeEventsLogo,
    url: 'https://kube.events/',
    tier: 'partner',
    logoRatio: 3,
  },
  {
    name: 'learncube.com',
    icon: LearnCubeLogo,
    url: 'https://learncube.com/',
    tier: 'partner',
    logoRatio: 5,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: 'Liquid Reply',
    icon: Liquid,
    url: 'https://www.reply.com/liquid-reply/en/',
    tier: 'organizer',
    logoRatio: 2.3,
  },
  {
    name: 'Nutanix',
    icon: NutanixLogo,
    url: 'https://www.nutanix.com/',
    tier: 'platinum',
    logoRatio: 7.77,
  },
  {
    name: 'Steadforce',
    icon: Steadforce,
    url: 'https://www.steadforce.com/',
    tier: 'silver',
    logoRatio: 8.93,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: 'tsc labs',
    icon: Tcslabs,
    url: 'https://www.tsc-labs.eu/',
    tier: 'partner',
    logoRatio: 2.11,
  },
  {
    name: 'white duck GmbH',
    icon: Whiteduck,
    url: 'https://www.whiteduck.de/',
    tier: 'organizer',
    logoRatio: 3.75,
  },
  {
    name: 'Metalstack',
    icon: Metalstack,
    url: 'https://metalstack.cloud/',
    tier: 'gold',
    logoRatio: 3.54,
  },
];

// Sort sponsorsList alphabetically by name (case-insensitive)
sponsorsList.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

const contactEmail = 'team@cloudnativesummit.de';
const sponsorProspectusUrl =
  'https://docs.google.com/presentation/d/1QVKEiKgR_Q-grdpZ7QR85-xlvoydq3P6ijvpvKF4KmY/edit?usp=sharing';

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

const LOGO_BASE = {
  platinum: { height: 90, maxWidth: 220 },
  gold: { height: 80, maxWidth: 200 },
  silver: { height: 85, maxWidth: 210 },
  bronze: { height: 70, maxWidth: 180 },
  evening: { height: 75, maxWidth: 190 },
  partner: { height: 80, maxWidth: 200 },
  organizer: { height: 80, maxWidth: 200 },
};

const getLogoSize = (sponsor) => {
  const ratio = sponsor.logoRatio || 2;
  const base = LOGO_BASE[sponsor.tier] || LOGO_BASE.gold;
  const height = sponsor.logoHeight || base.height;
  const maxWidth = sponsor.logoMaxWidth || base.maxWidth;
  const width = Math.min(Math.round(height * ratio), maxWidth);
  return { width, height };
};

const Sponsors = () => {
  if (!SHOW_CURRENT_SPONSORS) {
    return (
      <section id="sponsors" className="safe-paddings bg-white py-16 sm:py-12">
        <div className="container">
          <div className="mb-16 md:mb-12 sm:mb-8">
            <h2 className="text-left text-5xl font-bold leading-tight text-primary-1 md:text-4xl sm:text-3xl">
              Become a Sponsor
            </h2>
            <p className="mt-6 max-w-3xl text-left text-xl leading-relaxed text-slate-600 md:mt-4 md:text-lg sm:mt-3 sm:text-base">
              Support our local cloud native community by sponsoring CNS Munich!
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-start gap-4 md:mt-6 md:gap-3 sm:mt-4 sm:gap-2">
              <a
                className="button px-6 py-3 text-base sm:px-4 sm:py-2 sm:text-sm"
                href={sponsorProspectusUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sponsor Prospectus
              </a>
            </div>

            <p className="mt-4 text-left text-sm text-gray-600 sm:text-xs">
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
            <div className="mb-6 text-left md:mb-4 sm:mb-3">
              <h3 className="text-2xl font-semibold text-gray-900 md:text-xl sm:text-lg">
                Previous Sponsors
              </h3>
              <p className="mt-2 max-w-2xl text-base text-gray-500 md:text-sm sm:text-xs">
                A glimpse at the organisations that helped us make previous editions happen.
              </p>
            </div>

            <div className="sponsor-slider">
              <div className="sponsor-slider-track" aria-label="Previous sponsors carousel">
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
                      className="sponsor-logo"
                      style={{
                        '--logo-width': `${getLogoSize(sponsor).width}px`,
                        '--logo-height': `${getLogoSize(sponsor).height}px`,
                      }}
                    />
                  </a>
                ))}
              </div>
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
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="text-left">
            <h2 className="section-title text-4xl font-bold text-gray-900 lg:text-5xl md:text-3xl sm:text-2xl">
              Our sponsors
            </h2>
            <p className="mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 md:mb-8 md:text-lg sm:mb-6 sm:max-w-lg sm:text-base">
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
              'container mb-20',
              config.premium && 'relative mb-32 md:mb-24 sm:mb-16',
              config.noBackground && 'mb-16 md:mb-12 sm:mb-8'
            )}
          >
            {config.premium && !config.noBackground && (
              <div className="absolute inset-0 -mx-8 -my-8 rounded-3xl bg-gradient-to-r from-primary-1/5 via-primary-1/10 to-primary-1/5 md:-mx-4 md:-my-4 sm:-mx-2 sm:-my-2" />
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
                        <div className="h-3 w-3 rounded-full bg-white shadow-inner" />
                      </div>
                      <div className="h-1 w-8 bg-gradient-to-r from-slate-400 to-transparent" />
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
                      <div className="h-1 w-8 bg-gradient-to-l from-slate-400 to-transparent" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-slate-400 to-slate-500 ">
                        <div className="h-3 w-3 rounded-full bg-white shadow-inner" />
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
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-slate-400 to-transparent md:w-16 sm:w-12" />
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
                      config.premium && 'platinum-premium',
                      `sponsor-card--${tier}`
                    )}
                  >
                    <div className="relative flex h-full w-full items-center justify-center p-6 md:p-4 sm:p-3">
                      <img
                        src={sponsor.icon}
                        alt={sponsor.name}
                        loading="lazy"
                        className="sponsor-logo object-contain transition-all duration-300 group-hover:scale-110"
                        style={{
                          '--logo-width': `${getLogoSize(sponsor).width}px`,
                          '--logo-height': `${getLogoSize(sponsor).height}px`,
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
