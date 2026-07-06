'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import {
  AnnouncedSpeakerCard,
  LineupSpeakerCard,
  SpeakerCardSkeleton,
} from '@/components/speakers/speaker-ui';
import { Button } from '@/components/ui/button';
import type { SpeakersSectionMode } from '@/lib/constants';
import {
  LINEUP_SPEAKER_COUNT,
  PRE_ANNOUNCED_SPEAKER_IDS,
  getAnnouncedSpeakers,
  getLineupSpeakers,
  type Speaker,
} from '@/lib/speakers-data';
import { loadSpeakersData, primeSpeakersData } from '@/lib/speaker-data-cache';
import { getSpeakerPath } from '@/lib/speaker-page';
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

type SpeakersTeaserProps = {
  mode: Exclude<SpeakersSectionMode, 'off'>;
  tone?: SectionTone;
};

export function SpeakersTeaser({ mode, tone = 'default' }: SpeakersTeaserProps) {
  const router = useRouter();
  const [speakerData, setSpeakerData] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLineup = mode === 'lineup';

  useEffect(() => {
    loadSpeakersData()
      .then((data) => {
        setSpeakerData(data);
        primeSpeakersData(data);
      })
      .catch((error) => console.error('Error fetching speakers:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const displaySpeakers = useMemo(() => {
    if (!speakerData.length) return [];
    return isLineup
      ? getLineupSpeakers(speakerData)
      : getAnnouncedSpeakers(speakerData);
  }, [speakerData, isLineup]);

  const skeletonCount = isLineup
    ? LINEUP_SPEAKER_COUNT
    : Math.max(PRE_ANNOUNCED_SPEAKER_IDS.length, 2);

  const openSpeaker = (speaker: Speaker) => {
    const href = getSpeakerPath(speaker);
    router.prefetch(href);
    router.push(href);
  };

  const prefetchSpeaker = (speaker: Speaker) => {
    router.prefetch(getSpeakerPath(speaker));
  };

  return (
    <Section id="speakers" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          {isLineup ? (
            <>
              <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Meet our
                <br />
                <span className="text-[#0bbbef]">speakers</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {isLoading || speakerData.length === 0
                  ? 'Practitioners and experts from the cloud native community.'
                  : `${speakerData.length} speakers sharing knowledge across cloud native, platform engineering, and open source.`}
              </p>
            </>
          ) : (
            <>
              <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Meet the lineup,
                <br />
                <span className="text-[#0bbbef]">shaping cloud native</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Early speaker announcements — more names coming soon.
              </p>
            </>
          )}
        </MotionReveal>
      </div>

      {isLoading ? (
        <div
          className={cn(
            'mt-12 grid gap-3 sm:gap-4',
            isLineup
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              : 'grid-cols-2 lg:grid-cols-3',
          )}
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <SpeakerCardSkeleton
              key={index}
              compact={isLineup}
              variant={isLineup ? 'wall' : 'detailed'}
            />
          ))}
        </div>
      ) : displaySpeakers.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Speaker announcements coming soon.
        </p>
      ) : (
        <div
          className={cn(
            'mt-12 grid gap-3 sm:gap-4',
            isLineup
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              : 'grid-cols-2 lg:grid-cols-3',
          )}
        >
          {displaySpeakers.map((speaker, index) => (
            <MotionReveal key={speaker.id} delay={index * 0.04}>
              {isLineup ? (
                <LineupSpeakerCard
                  speaker={speaker}
                  variant="wall"
                  onClick={() => openSpeaker(speaker)}
                  onMouseEnter={() => prefetchSpeaker(speaker)}
                />
              ) : (
                <AnnouncedSpeakerCard
                  speaker={speaker}
                  onClick={() => openSpeaker(speaker)}
                  onMouseEnter={() => prefetchSpeaker(speaker)}
                />
              )}
            </MotionReveal>
          ))}
        </div>
      )}

      {isLineup ? (
        <MotionReveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button
              nativeButton={false}
              render={<Link href="/speakers" />}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View all speakers
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </MotionReveal>
      ) : null}
    </Section>
  );
}