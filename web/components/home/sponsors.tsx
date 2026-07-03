import Image from "next/image";
import Link from "next/link";

import { LogoMarquee } from "@/components/layout/logo-marquee";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getLogoSize,
  SPONSOR_CONTACT_EMAIL,
  SPONSOR_PROSPECTUS_URL,
  sponsorsList,
  tierConfig,
  TIER_ORDER,
} from "@/lib/sponsors-data";
import { cn } from "@/lib/utils";

const MARQUEE_TIERS = new Set(["platinum", "gold"]);

export function Sponsors() {
  const marqueeLogos = sponsorsList
    .filter((s) => MARQUEE_TIERS.has(s.tier))
    .map((s) => {
      const size = getLogoSize(s);
      return {
        name: s.name,
        icon: s.icon,
        url: s.url,
        width: size.width,
        height: size.height,
      };
    });

  const gridTiers = TIER_ORDER.filter((t) => !MARQUEE_TIERS.has(t));

  return (
    <Section id="sponsors" className="overflow-hidden bg-background">
      <MotionReveal>
        <SectionHeader
          eyebrow="Partners"
          title="Powered by our sponsors"
          description="Thank you to the organizations that make CNS Munich possible. Interested in supporting the community?"
        />
      </MotionReveal>

      <MotionReveal delay={0.08}>
        <div className="mb-12 flex flex-wrap items-center gap-4">
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
            className="bg-primary text-primary-foreground"
          >
            Sponsor prospectus
          </Button>
          <p className="text-sm text-muted-foreground">
            Or email{" "}
            <a
              href={`mailto:${SPONSOR_CONTACT_EMAIL}`}
              className="font-semibold text-primary hover:underline"
            >
              {SPONSOR_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </MotionReveal>

      {marqueeLogos.length > 0 ? (
        <MotionReveal delay={0.12}>
          <div className="mb-16">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Platinum & Gold
            </p>
            <LogoMarquee logos={marqueeLogos} speed="slow" />
          </div>
        </MotionReveal>
      ) : null}

      <div className="space-y-14">
        {gridTiers.map((tier) => {
          const config = tierConfig[tier];
          const tierSponsors = sponsorsList.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;

          return (
            <MotionReveal key={tier}>
              <div className="mb-6 flex justify-center">
                <Badge
                  variant="outline"
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold",
                    config.badgeClass
                  )}
                >
                  {config.title}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {tierSponsors.map((sponsor, index) => {
                  const logoSize = getLogoSize(sponsor);
                  return (
                    <Link
                      key={`${sponsor.name}-${index}`}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group flex items-center justify-center rounded-xl bg-card p-5 ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-md",
                        config.cardSize
                      )}
                      aria-label={sponsor.name}
                    >
                      <Image
                        src={sponsor.icon}
                        alt={sponsor.name}
                        width={logoSize.width}
                        height={logoSize.height}
                        className="object-contain opacity-85 transition-all group-hover:scale-105 group-hover:opacity-100"
                      />
                    </Link>
                  );
                })}
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}