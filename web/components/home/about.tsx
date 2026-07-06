import Link from "next/link";
import { ArrowRight, Calendar, Heart, Users } from "lucide-react";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const highlights = [
  {
    value: "5th",
    label: "Edition in Munich",
    icon: Calendar,
  },
  {
    value: "2",
    label: "Conference days",
    icon: Users,
  },
  {
    value: "100%",
    label: "Community-driven",
    icon: Heart,
  },
];

type AboutProps = {
  tone?: SectionTone;
};

export function About({ tone = "default" }: AboutProps) {
  return (
    <Section
      id="about"
      className={cn(SECTION_TONE_CLASS[tone], "py-20 md:py-28 lg:py-32")}
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-20">
        <div>
          <MotionReveal>
            <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Built by the community,
              <br />
              <span className="text-[#0bbbef]">for the community</span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Cloud Native Summit Munich brings together adopters and
                technologists from open source and cloud native ecosystems for
                two focused days in the heart of Bavaria.
              </p>
              <p>
                CNS Munich is a local, community-organized event — the fifth
                edition gathering practitioners, platform engineers, and cloud
                native enthusiasts to learn, share, and connect.
              </p>
              <p>
                This event provides a platform for professionals and experts
                from all levels and backgrounds to share knowledge about
                cloud-native technologies, platform engineering, and open
                source.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <Button
              nativeButton={false}
              render={<Link href="/vision" />}
              size="lg"
              className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Our vision
              <ArrowRight className="size-4" />
            </Button>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.1} className="w-full">
          <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center gap-4 lg:max-w-none lg:gap-5">
            {highlights.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="grid grid-cols-[3rem_1fr] items-center gap-4 rounded-2xl bg-gradient-to-br from-primary/8 to-primary/[0.03] px-5 py-7 ring-1 ring-primary/10 transition-shadow hover:shadow-md sm:px-6 sm:py-8"
              >
                <div className="flex size-12 items-center justify-center justify-self-center rounded-xl bg-background/80 ring-1 ring-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-heading text-3xl font-bold leading-none text-primary">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}