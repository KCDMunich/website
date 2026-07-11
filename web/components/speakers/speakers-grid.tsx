'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { LineupSpeakerCard, SpeakerCardSkeleton } from '@/components/speakers/speaker-ui';
import { Button } from '@/components/ui/button';
import { primeSpeakersData, loadSpeakersData } from '@/lib/speaker-data-cache';
import { getAnnouncedSpeakers, type Speaker } from '@/lib/speakers-data';
import { getSpeakerPath } from '@/lib/speaker-page';
import type { SitePresentation } from '@/lib/site-presentation';
import { cn } from '@/lib/utils';

const SPEAKERS_PER_PAGE = 30;

function shuffleSpeakers(array: Speaker[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function SpeakersGrid({ presentation }: { presentation: SitePresentation['program'] }) {
  const { announcedSpeakerIds, mode } = presentation;
  const router = useRouter();
  const [speakerData, setSpeakerData] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(mode !== 'hidden');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (mode === 'hidden') return;

    loadSpeakersData()
      .then((data) => {
        const visibleSpeakers =
          mode === 'preview'
            ? getAnnouncedSpeakers(data, announcedSpeakerIds)
            : shuffleSpeakers(data);
        setSpeakerData(visibleSpeakers);
        primeSpeakersData(visibleSpeakers);
      })
      .catch((error) => console.error('Error fetching speakers:', error))
      .finally(() => setIsLoading(false));
  }, [announcedSpeakerIds, mode]);

  if (mode === 'hidden') {
    return (
      <Section className="bg-background">
        <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
          Speaker announcements are not public yet. Please check back soon.
        </p>
      </Section>
    );
  }

  const openSpeaker = (speaker: Speaker) => {
    const href = getSpeakerPath(speaker);
    router.prefetch(href);
    router.push(href);
  };

  const prefetchSpeaker = (speaker: Speaker) => {
    router.prefetch(getSpeakerPath(speaker));
  };

  const indexOfLastSpeaker = currentPage * SPEAKERS_PER_PAGE;
  const indexOfFirstSpeaker = indexOfLastSpeaker - SPEAKERS_PER_PAGE;
  const currentSpeakers = speakerData.slice(indexOfFirstSpeaker, indexOfLastSpeaker);
  const totalPages = Math.ceil(speakerData.length / SPEAKERS_PER_PAGE);

  return (
    <Section className="bg-background">
      <MotionReveal>
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          {isLoading
            ? 'Loading speakers from the lineup…'
            : mode === 'preview'
              ? `${speakerData.length} early-announced speakers — more names coming soon.`
              : `${speakerData.length} practitioners sharing knowledge across cloud native, platform engineering, and open source.`}
        </p>
      </MotionReveal>

      {isLoading ? (
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <SpeakerCardSkeleton key={index} variant="wall" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {currentSpeakers.map((speaker, index) => (
              <MotionReveal key={speaker.id} delay={index * 0.02}>
                <LineupSpeakerCard
                  speaker={speaker}
                  variant="wall"
                  onClick={() => openSpeaker(speaker)}
                  onMouseEnter={() => prefetchSpeaker(speaker)}
                />
              </MotionReveal>
            ))}
          </div>

          {speakerData.length > SPEAKERS_PER_PAGE ? (
            <MotionReveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      currentPage === i + 1
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-primary/20 text-primary hover:bg-primary/5'
                    )}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </MotionReveal>
          ) : null}
        </>
      )}
    </Section>
  );
}
