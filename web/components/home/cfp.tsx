import { ArrowUpRight, Lightbulb, Mic2, Wrench } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

const proposalThemes = [
  {
    icon: Lightbulb,
    title: 'Share what worked',
    description: 'Practical lessons, honest trade-offs, and ideas others can apply.',
  },
  {
    icon: Mic2,
    title: 'Choose your format',
    description: 'Talks, lightning talks, panel discussions, and workshops are welcome.',
  },
  {
    icon: Wrench,
    title: 'Bring real experience',
    description: 'Cloud native, open source, platform engineering, AI, and the work around them.',
  },
] as const;

type CfpProps = {
  href: string;
  tone?: SectionTone;
};

export function Cfp({ href, tone = 'default' }: CfpProps) {
  return (
    <Section id="call-for-proposals" className={cn('scroll-mt-24', SECTION_TONE_CLASS[tone])}>
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Your experience,
            {' '}
            <br />
            <span className="text-[#0bbbef]">shared in Munich</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            The Call for Proposals for CNS Munich 2027 is open. Help shape two days of useful,
            community-driven learning.
          </p>
          <Button
            nativeButton={false}
            render={<a href={href} target="_blank" rel="noopener noreferrer" />}
            size="lg"
            className="mt-8 min-h-11 bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Submit your proposal
            <ArrowUpRight className="size-4" aria-hidden />
          </Button>
        </MotionReveal>

        <div className="divide-y divide-primary/10 border-y border-primary/10">
          {proposalThemes.map(({ icon: Icon, title, description }, index) => (
            <MotionReveal key={title} delay={0.06 + index * 0.06}>
              <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:items-start sm:gap-6 sm:py-7">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/8 ring-1 ring-primary/10">
                  <Icon className="size-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">{title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
