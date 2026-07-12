import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Handshake, Mail } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { EVENT_CONFIG } from '@/lib/event-config';
import {
  getLogoSize,
  SPONSOR_CONTACT_EMAIL,
  SPONSOR_PROSPECTUS_URL,
  sponsorsList,
  tierConfig,
  TIER_ORDER,
  type Sponsor,
  type SponsorTier,
} from '@/lib/sponsors-data';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';
import type { SponsorshipPhase } from '@/lib/site-state-types';

const SPONSOR_CELL_SIZE = 'h-[100px] w-[200px] sm:w-[220px]';

const TIER_LOGO_CLASS: Partial<Record<SponsorTier, string>> = {
  platinum: 'max-h-[72px] max-w-[210px] sm:max-h-[78px] sm:max-w-[228px]',
  gold: 'max-h-[64px] max-w-[190px] sm:max-h-[68px] sm:max-w-[200px]',
};

const DEFAULT_LOGO_CLASS = 'max-h-[56px] max-w-[168px] sm:max-h-[60px] sm:max-w-[180px]';

type SponsorsProps = {
  phase: SponsorshipPhase;
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
        'group flex cursor-pointer items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1',
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
          'w-auto object-contain opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100',
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
      <div className={cn(showDivider && 'border-t border-dashed border-primary/10 pt-12')}>
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
          {tierConfig[tier].title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {sponsors.map((sponsor, index) => (
            <SponsorLogoCard key={`${sponsor.name}-${index}`} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </MotionReveal>
  );
}

export function Sponsors({ phase, tone = 'default' }: SponsorsProps) {
  const visibleTiers = TIER_ORDER.filter((tier) =>
    sponsorsList.some((sponsor) => sponsor.tier === tier)
  );

  return (
    <Section id="sponsors" className={cn('overflow-hidden', SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Thank you to our,
            <br />
            <span className="text-[#0bbbef]">{EVENT_CONFIG.archive.edition} partners</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            These organizations helped make two days of learning, connection, and community in
            Munich possible.
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

      {phase === 'recruiting' ? (
        <MotionReveal delay={0.2}>
          <div className="relative mt-16 overflow-hidden rounded-3xl bg-primary px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12 lg:px-14">
            <div
              className="absolute -right-24 -top-24 size-72 rounded-full bg-[#0bbbef]/20 blur-3xl"
              aria-hidden
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
              <div className="max-w-2xl">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Handshake className="size-6 text-[#0bbbef]" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0bbbef]">
                  Partnerships for {EVENT_CONFIG.sponsorship.edition}
                </p>
                <h3 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Help shape the next CNS Munich
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/75">
                  Meet a focused cloud native community, support accessible knowledge sharing, and
                  create meaningful conversations with practitioners. We are now speaking with
                  partners for our next edition.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={`mailto:${SPONSOR_CONTACT_EMAIL}?subject=CNS%20Munich%20${EVENT_CONFIG.sponsorship.edition}%20sponsorship%20interest`}
                    />
                  }
                  size="lg"
                  className="bg-[#0bbbef] text-primary hover:bg-[#35c8f2]"
                >
                  <Mail className="size-4" />
                  Register your interest
                </Button>
                {SPONSOR_PROSPECTUS_URL ? (
                  <Button
                    nativeButton={false}
                    render={
                      <a href={SPONSOR_PROSPECTUS_URL} target="_blank" rel="noopener noreferrer" />
                    }
                    variant="outline"
                    size="lg"
                    className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Sponsor prospectus
                    <ArrowRight className="size-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </MotionReveal>
      ) : null}
    </Section>
  );
}
