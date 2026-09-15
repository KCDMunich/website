import { Mic2, Sparkles, Users, Wrench } from "lucide-react";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Mic2,
    title: "Technical talks",
    description:
      "Deep dives from practitioners across cloud native, platform engineering, and AI.",
    className: "lg:col-span-2",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: Wrench,
    title: "Hands-on workshops",
    description:
      "Learn by doing with sponsor-led and community workshops.",
    className: "lg:col-span-1",
    accent: "from-[#0bbbef]/15 to-primary/5",
  },
  {
    icon: Users,
    title: "Community networking",
    description:
      "Meet peers, speakers, and organizers in an open, welcoming atmosphere.",
    className: "lg:col-span-1",
    accent: "from-primary/8 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Open source & innovation",
    description:
      "Kubernetes, CNCF projects, platform engineering, and AI engineering.",
    className: "lg:col-span-2",
    accent: "from-primary/10 to-[#0bbbef]/8",
  },
];

type ExpectProps = {
  tone?: SectionTone;
};

export function Expect({ tone = "default" }: ExpectProps) {
  return (
    <Section id="expect" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            What to expect,
            {' '}
            <br />
            <span className="text-[#0bbbef]">from two focused days</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Learning, collaboration, and real-world cloud native craft — built
            for practitioners who want more than slides.
          </p>
        </MotionReveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {features.map(({ icon: Icon, title, description, className, accent }, i) => (
          <MotionReveal key={title} delay={i * 0.06} className={className}>
            <div
              className={cn(
                "group flex h-full flex-col rounded-2xl bg-gradient-to-br p-6 ring-1 ring-primary/10 transition-all hover:-translate-y-1 hover:shadow-md sm:p-8",
                accent
              )}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-background/80 ring-1 ring-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary">
                {title}
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
