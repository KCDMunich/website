import Link from "next/link";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

const highlights = [
  { value: "5th", label: "Edition in Munich" },
  { value: "2", label: "Conference days" },
  { value: "100%", label: "Community-driven" },
];

export function About() {
  return (
    <Section className="bg-background">
      <MotionReveal>
        <SectionHeader
          eyebrow="About"
          title="Built by the community, for the community"
          description="Cloud Native Summit Munich brings together adopters and technologists from open source and cloud native ecosystems for two focused days in the heart of Bavaria."
        />
      </MotionReveal>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <MotionReveal delay={0.1}>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              CNS Munich is a local, community-organized event — the fifth
              edition gathering practitioners, platform engineers, and cloud
              native enthusiasts to learn, share, and connect.
            </p>
            <p>
              This event provides a platform for professionals and experts from
              all levels and backgrounds to share knowledge about cloud-native
              technologies, platform engineering, and open source.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/vision" />}
              size="lg"
              className="bg-primary text-primary-foreground"
            >
              Our vision
            </Button>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.15}>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-primary/5 px-6 py-8 text-center ring-1 ring-primary/10 lg:text-left"
              >
                <p className="font-heading text-4xl font-bold text-primary">
                  {value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}