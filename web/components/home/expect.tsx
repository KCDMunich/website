import { Mic2, Sparkles, Users, Wrench } from "lucide-react";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Mic2,
    title: "Technical talks",
    description: "Deep dives from practitioners across cloud native, platform engineering, and AI.",
    className: "lg:col-span-2",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: Wrench,
    title: "Hands-on workshops",
    description: "Learn by doing with sponsor-led and community workshops.",
    className: "lg:col-span-1",
    accent: "from-[#0bbbef]/15 to-primary/5",
  },
  {
    icon: Users,
    title: "Community networking",
    description: "Meet peers, speakers, and organizers in an open, welcoming atmosphere.",
    className: "lg:col-span-1",
    accent: "from-primary/8 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Open source & innovation",
    description: "Kubernetes, CNCF projects, platform engineering, and AI engineering.",
    className: "lg:col-span-2",
    accent: "from-primary/10 to-[#0bbbef]/8",
  },
];

export function Expect() {
  return (
    <Section className="bg-muted/40">
      <MotionReveal>
        <SectionHeader
          eyebrow="Experience"
          title="What to expect"
          description="Two days designed for learning, collaboration, and real-world cloud native craft."
          align="center"
          className="mx-auto"
        />
      </MotionReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {features.map(({ icon: Icon, title, description, className, accent }, i) => (
          <MotionReveal key={title} delay={i * 0.06} className={className}>
            <div
              className={cn(
                "group flex h-full flex-col rounded-2xl bg-gradient-to-br p-6 ring-1 ring-border/70 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-8",
                accent
              )}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-background/80 ring-1 ring-border/60">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">{title}</h3>
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