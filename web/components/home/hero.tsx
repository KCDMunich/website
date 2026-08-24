import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Camera,
  MapPin,
  Play,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Eyebrow } from '@/components/layout/eyebrow';
import { MotionReveal } from '@/components/layout/motion-reveal';
import { Button } from '@/components/ui/button';
import { EVENT_CONFIG } from '@/lib/event-config';
import type { SitePresentation } from '@/lib/site-presentation';
import type { ActionIcon, SiteAction } from '@/lib/site-state-types';

const HERO_VIDEO_SRC = `https://www.youtube.com/embed/${EVENT_CONFIG.archive.heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${EVENT_CONFIG.archive.heroVideoId}&start=5&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0`;

const ACTION_ICONS: Record<ActionIcon, LucideIcon> = {
  arrow: ArrowRight,
  calendar: Calendar,
  camera: Camera,
  map: MapPin,
  play: Play,
  ticket: Ticket,
  users: Users,
};

const stats = [
  { icon: Calendar, label: '2 days' },
  { icon: MapPin, label: EVENT_CONFIG.upcoming.location },
  { icon: Users, label: 'Community-driven' },
];

function ActionLink({ action }: { action: SiteAction }) {
  if (action.external) {
    return <a href={action.href} target="_blank" rel="noopener noreferrer" />;
  }

  return <Link href={action.href} />;
}

type HeroProps = {
  presentation: SitePresentation['hero'];
};

export function Hero({ presentation }: HeroProps) {
  const PrimaryIcon = ACTION_ICONS[presentation.primaryAction.icon];
  const SecondaryIcon = presentation.secondaryAction
    ? ACTION_ICONS[presentation.secondaryAction.icon]
    : null;

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={HERO_VIDEO_SRC}
          title="Cloud Native Summit Munich highlight reel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/88 via-primary/72 to-primary/94" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,transparent_0%,oklch(0.18_0.045_220/0.52)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-primary/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <MotionReveal>
            <Eyebrow variant="light" className="mb-6">
              {presentation.eyebrow}
            </Eyebrow>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h1 className="text-balance font-heading text-4xl font-bold leading-[1.02] tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl lg:text-8xl">
              {presentation.titleLead}
              {' '}
              <br />
              <span className="text-[#0bbbef]">{presentation.titleAccent}</span>
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 drop-shadow-sm sm:text-xl">
              {presentation.description}
            </p>
          </MotionReveal>

          {presentation.showStats ? (
            <MotionReveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                {stats.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-sm font-medium text-white/95 ring-1 ring-white/15 backdrop-blur-md"
                  >
                    <Icon className="size-4 text-[#0bbbef]" />
                    {label}
                  </span>
                ))}
              </div>
            </MotionReveal>
          ) : null}

          <MotionReveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 bg-[#0bbbef] px-8 text-base font-semibold text-primary hover:bg-[#35c8f2]"
                nativeButton={false}
                render={<ActionLink action={presentation.primaryAction} />}
              >
                <PrimaryIcon className="size-4" />
                {presentation.primaryAction.label}
              </Button>

              {presentation.secondaryAction && SecondaryIcon ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-black/20 px-8 text-base text-white backdrop-blur-sm hover:bg-black/30 hover:text-white"
                  nativeButton={false}
                  render={<ActionLink action={presentation.secondaryAction} />}
                >
                  <SecondaryIcon className="size-4" />
                  {presentation.secondaryAction.label}
                </Button>
              ) : null}
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
