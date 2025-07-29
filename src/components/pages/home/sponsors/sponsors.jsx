import clsx from 'clsx';
import React from 'react';
import { Award, ArrowRight } from 'lucide-react';

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

const SHOW_SPONSORS = true;

const tierConfig = {
  platinum: {
    title: 'Platinum',
    class: 'sponsor-card-platinum',
    badgeClass: 'sponsor-badge-platinum',
    cardSize: 'w-[240px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[180px] sm:h-[90px]',
  },
  gold: {
    title: 'Gold',
    class: 'sponsor-card-gold',
    badgeClass: 'sponsor-badge-gold',
    cardSize: 'w-[240px] h-[120px] md:w-[200px] md:h-[100px] sm:w-[180px] sm:h-[90px]',
  },
  silver: {
    title: 'Silver',
    class: 'sponsor-card-silver',
    badgeClass: 'sponsor-badge-silver',
    cardSize: 'w-[200px] h-[100px] md:w-[180px] md:h-[90px] sm:w-[160px] sm:h-[80px]',
  },
  bronze: {
    title: 'Bronze',
    class: 'sponsor-card-bronze',
    badgeClass: 'sponsor-badge-bronze',
    cardSize: 'w-[180px] h-[90px] md:w-[160px] md:h-[80px] sm:w-[140px] sm:h-[70px]',
  },
  evening: {
    title: 'Evening Event',
    class: 'sponsor-card-evening',
    badgeClass: 'sponsor-badge-evening',
    cardSize: 'w-[200px] h-[100px] md:w-[180px] md:h-[90px] sm:w-[160px] sm:h-[80px]',
  },
  partner: {
    title: 'Community & Media Partners',
    class: 'sponsor-card-partner',
    badgeClass: 'sponsor-badge-partner',
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

const DEFAULT_LOGO_WIDTH = 150;
const DEFAULT_LOGO_HEIGHT = 70;

const Sponsors = () => {
  if (!SHOW_SPONSORS) {
    return (
      <section id="sponsors" className="sponsors-section">
        <div className="sponsors-container">
          <div className="sponsors-header">
            <span className="sponsors-badge">
              <Award className="sponsors-badge-icon" />
              Sponsorship
            </span>
            <h2 className="sponsors-title">
              Become a Sponsor
              <span className="sponsors-title-accent"> 2025</span>
            </h2>
          </div>

          <div className="sponsors-content">
            <p className="sponsors-description">
              Support our local cloud native community by sponsoring CNS Munich
            </p>

            <div className="sponsors-cta">
              <button
                type="button"
                className="sponsors-cta-primary"
                onClick={() => {
                  window.location.href = `mailto:${contactEmail}`;
                }}
              >
                <span>Contact Us</span>
                <ArrowRight className="sponsors-cta-icon" />
              </button>
              <p className="sponsors-contact-text">
                Contact us at{' '}
                <a href={`mailto:${contactEmail}`} className="sponsors-contact-link">
                  {contactEmail}
                </a>{' '}
                to learn more about sponsorship opportunities
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show the full sponsors section when SHOW_SPONSORS is true
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="sponsors-container">
        <div className="sponsors-header">
          <span className="sponsors-badge">
            <Award className="sponsors-badge-icon" />
            Sponsors
          </span>
          <h2 className="sponsors-title">
            Our Sponsors
            <span className="sponsors-title-accent"> 2025</span>
          </h2>
        </div>

        <div className="sponsors-content">
          <p className="sponsors-description">
            Thank you to our amazing sponsors who make this event possible. Support our local cloud
            native community by sponsoring CNS Munich.
          </p>

          <div className="sponsors-cta">
            <a
              href="https://docs.google.com/presentation/d/1NhUXEXdfWjAt1DmFLjMPolwkuE6Y_BZiNQKWYvVmK5Q/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="sponsors-cta-primary"
            >
              <span>Sponsor Prospectus</span>
              <ArrowRight className="sponsors-cta-icon" />
            </a>
          </div>
        </div>

        <div className="sponsors-tiers">
          {Object.entries(tierConfig).map(([tier, config]) => {
            const tierSponsors = sponsorsList.filter((s) => s.tier === tier);

            if (tierSponsors.length === 0) return null;

            return (
              <div key={tier} className="sponsors-tier">
                <div className="sponsors-tier-header">
                  <span className={config.badgeClass}>{config.title}</span>
                </div>

                <div className="sponsors-tier-grid">
                  {tierSponsors.map((sponsor, index) => (
                    <a
                      key={index}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx('sponsor-card group', config.cardSize, config.class)}
                    >
                      <div className="sponsor-card-content">
                        <img
                          src={sponsor.icon}
                          alt={sponsor.name}
                          loading="lazy"
                          className="sponsor-logo"
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
