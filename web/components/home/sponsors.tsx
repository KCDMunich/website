import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Eyebrow } from "@/components/layout/eyebrow";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  getLogoSize,
  SPONSOR_CONTACT_EMAIL,
  SPONSOR_PROSPECTUS_URL,
  sponsorsList,
  tierConfig,
  TIER_ORDER,
  type Sponsor,
} from "@/lib/sponsors-data";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const FEATURED_TIERS = new Set(["platinum", "gold"]);
const SPONSOR_CARD_SIZE = "h-[100px] w-[200px] sm:w-[220px]";

type SponsorsProps = {
  tone?: SectionTone;
};

function SponsorLogoCard({ sponsor }: { sponsor: Sponsor }) {
  const logoSize = getLogoSize(sponsor);

  return (
    <Link
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1",
        SPONSOR_CARD_SIZE
      )}
      aria-label={sponsor.name}
    >
      <Image
        src={sponsor.icon}
        alt={sponsor.name}
        width={logoSize.width}
        height={logoSize.height}
        className="max-h-[56px] w-auto max-w-[168px] object-contain opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-[60px] sm:max-w-[180px]"
      />
    </Link>
  );
}

export function Sponsors({ tone = "default" }: SponsorsProps) {
  const platinumSponsors = sponsorsList.filter((s) => s.tier === "platinum");
  const goldSponsors = sponsorsList.filter((s) => s.tier === "gold");

  const gridTiers = TIER_ORDER.filter((t) => !FEATURED_TIERS.has(t));

  return (
    <Section
      id="sponsors"
      className={cn("overflow-hidden", SECTION_TONE_CLASS[tone])}
    >
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>Partners</Eyebrow>
          </div>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Powered by partners,
            <br />
            <span className="text-[#0bbbef]">who make CNS possible</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Thank you to the organizations supporting Cloud Native Summit Munich.
            Interested in joining the community as a sponsor?
          </p>
        </MotionReveal>
      </div>

      {platinumSponsors.length > 0 ? (
        <MotionReveal delay={0.08}>
          <div className="mt-12">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
              {tierConfig.platinum.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {platinumSponsors.map((sponsor, index) => (
                <SponsorLogoCard
                  key={`${sponsor.name}-${index}`}
                  sponsor={sponsor}
                />
              ))}
            </div>
          </div>
        </MotionReveal>
      ) : null}

      {goldSponsors.length > 0 ? (
        <MotionReveal delay={0.1}>
          <div className="mt-12">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
              {tierConfig.gold.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {goldSponsors.map((sponsor, index) => (
                <SponsorLogoCard
                  key={`${sponsor.name}-${index}`}
                  sponsor={sponsor}
                />
              ))}
            </div>
          </div>
        </MotionReveal>
      ) : null}

      <div className="mt-12 space-y-12">
        {gridTiers.map((tier, tierIndex) => {
          const config = tierConfig[tier];
          const tierSponsors = sponsorsList.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;

          return (
            <MotionReveal key={tier} delay={0.1 + tierIndex * 0.04}>
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
                {config.title}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {tierSponsors.map((sponsor, index) => (
                  <SponsorLogoCard
                    key={`${sponsor.name}-${index}`}
                    sponsor={sponsor}
                  />
                ))}
              </div>
            </MotionReveal>
          );
        })}
      </div>

      <MotionReveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-3">
          <Button
            nativeButton={false}
            render={
              <a
                href={SPONSOR_PROSPECTUS_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sponsor prospectus
            <ArrowRight className="size-4" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Or email{" "}
            <a
              href={`mailto:${SPONSOR_CONTACT_EMAIL}`}
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {SPONSOR_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </MotionReveal>
    </Section>
  );
}