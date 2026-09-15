'use client';

import { useEffect, useRef, useState } from 'react';

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

export function SpeakersGrid({ presentation }: { presentation: SitePresentation['program'] }) {
  const { announcedSpeakerIds, mode } = presentation;
  const gridStartRef = useRef<HTMLDivElement>(null);
  const [speakerData, setSpeakerData] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadSpeakersData()
      .then((data) => {
        const visibleSpeakers =
          mode === 'preview'
            ? getAnnouncedSpeakers(data, announcedSpeakerIds)
            : [...data].sort((a, b) => a.fullName.localeCompare(b.fullName));
        setSpeakerData(visibleSpeakers);
        primeSpeakersData(visibleSpeakers);
      })
      .catch((error) => console.error('Error fetching speakers:', error))
      .finally(() => setIsLoading(false));
  }, [announcedSpeakerIds, mode]);

  const indexOfLastSpeaker = currentPage * SPEAKERS_PER_PAGE;
  const indexOfFirstSpeaker = indexOfLastSpeaker - SPEAKERS_PER_PAGE;
  const currentSpeakers = speakerData.slice(indexOfFirstSpeaker, indexOfLastSpeaker);
  const totalPages = Math.ceil(speakerData.length / SPEAKERS_PER_PAGE);

  const selectPage = (page: number) => {
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      gridStartRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

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
          <div
            ref={gridStartRef}
            className="mt-10 scroll-mt-28 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
          >
            {currentSpeakers.map((speaker, index) => (
              <MotionReveal key={speaker.id} delay={index * 0.02}>
                <LineupSpeakerCard
                  speaker={speaker}
                  variant="wall"
                  href={getSpeakerPath(speaker)}
                />
              </MotionReveal>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Speaker page {currentPage} of {totalPages}
          </p>

          {speakerData.length > SPEAKERS_PER_PAGE ? (
            <MotionReveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => selectPage(i + 1)}
                    aria-label={`Show speaker page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
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
