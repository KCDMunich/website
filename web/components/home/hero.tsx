import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";

import { Eyebrow } from "@/components/layout/eyebrow";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Button } from "@/components/ui/button";
import { FIENTA_TICKET_URL } from "@/lib/constants";

const HERO_VIDEO_ID = "R1dcUSnTmn8";

const HERO_VIDEO_SRC = `https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0`;

const stats = [
  { icon: Calendar, label: "2 days" },
  { icon: MapPin, label: "Munich" },
  { icon: Users, label: "Community-driven" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Full-bleed YouTube background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={HERO_VIDEO_SRC}
          title="Cloud Native Summit Munich highlight reel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/85 via-primary/70 to-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.22_0.045_220/0.4)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <MotionReveal>
            <Eyebrow variant="light" className="mb-6">
              June 29 – 30, 2026 · Munich
            </Eyebrow>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h1 className="text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
              Cloud Native
              <br />
              <span className="text-[#0bbbef]">Summit Munich</span>
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 drop-shadow-sm sm:text-xl">
              Two days of cloud-native talks, hands-on workshops, and genuine
              community — built by practitioners, for practitioners.
            </p>
          </MotionReveal>

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

          <MotionReveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                nativeButton={false}
                render={
                  <a
                    href={FIENTA_TICKET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Get your ticket
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/30 bg-black/20 px-8 text-base text-white backdrop-blur-sm hover:bg-black/30 hover:text-white"
                nativeButton={false}
                render={<Link href="/schedule" />}
              >
                View schedule
              </Button>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}