import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  type SponsorTier,
} from "@/lib/sponsors-data";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const SPONSOR_CELL_SIZE = "h-[100px] w-[200px] sm:w-[220px]";

const TIER_LOGO_CLASS: Partial<Record<SponsorTier, string>> = {
  platinum:
    "max-h-[72px] max-w-[210px] sm:max-h-[78px] sm:max-w-[228px]",
  gold: "max-h-[64px] max-w-[190px] sm:max-h-[68px] sm:max-w-[200px]",
};

const DEFAULT_LOGO_CLASS =
  "max-h-[56px] max-w-[168px] sm:max-h-[60px] sm:max-w-[180px]";

type SponsorsProps = {
  tone?: SectionTone;
};

function SponsorLogoCard({ sponsor }: { sponsor: Sponsor }) {
  const logoSize = getLogoSize(sponsor);
  const logoClass = TIER_LOGO_CLASS[sponsor.tier] ?? DEFAULT_LOGO_CLASS;

  return (
    <Link
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex cursor-pointer items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1",
        SPONSOR_CELL_SIZE
      )}
      aria-label={sponsor.name}
    >
      <Image
        src={sponsor.icon}
        alt={sponsor.name}
        width={logoSize.width}
        height={logoSize.height}
        className={cn(
          "w-auto object-contain opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100",
          logoClass
        )}
      />
    </Link>
  );
}

function SponsorTierBand({
  tier,
  sponsors,
  showDivider,
  delay,
}: {
  tier: SponsorTier;
  sponsors: Sponsor[];
  showDivider: boolean;
  delay: number;
}) {
  if (sponsors.length === 0) return null;

  return (
    <MotionReveal delay={delay}>
      <div
        className={cn(
          showDivider && "border-t border-dashed border-primary/10 pt-12"
        )}
      >
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
          {tierConfig[tier].title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {sponsors.map((sponsor, index) => (
            <SponsorLogoCard
              key={`${sponsor.name}-${index}`}
              sponsor={sponsor}
            />
          ))}
        </div>
      </div>
    </MotionReveal>
  );
}

export function Sponsors({ tone = "default" }: SponsorsProps) {
  const visibleTiers = TIER_ORDER.filter((tier) =>
    sponsorsList.some((sponsor) => sponsor.tier === tier)
  );

  return (
    <Section
      id="sponsors"
      className={cn("overflow-hidden", SECTION_TONE_CLASS[tone])}
    >
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
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

      <div className="mt-12">
        {visibleTiers.map((tier, index) => (
          <SponsorTierBand
            key={tier}
            tier={tier}
            sponsors={sponsorsList.filter((sponsor) => sponsor.tier === tier)}
            showDivider={index > 0}
            delay={0.08 + index * 0.04}
          />
        ))}
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
              className="cursor-pointer font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {SPONSOR_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </MotionReveal>
    </Section>
  );
}