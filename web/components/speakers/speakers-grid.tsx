"use client";

import { useEffect, useState } from "react";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import {
  LineupSpeakerCard,
  SpeakerCardSkeleton,
  SpeakerDialogContent,
} from "@/components/speakers/speaker-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SESSIONIZE_SPEAKERS_URL, type Speaker } from "@/lib/speakers-data";
import { cn } from "@/lib/utils";

const SPEAKERS_PER_PAGE = 30;

function shuffleSpeakers(array: Speaker[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function SpeakersGrid() {
  const [speakerData, setSpeakerData] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(SESSIONIZE_SPEAKERS_URL)
      .then((response) => response.json())
      .then((data: Speaker[]) => {
        setSpeakerData(shuffleSpeakers(data));
      })
      .catch((error) => console.error("Error fetching speakers:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const indexOfLastSpeaker = currentPage * SPEAKERS_PER_PAGE;
  const indexOfFirstSpeaker = indexOfLastSpeaker - SPEAKERS_PER_PAGE;
  const currentSpeakers = speakerData.slice(
    indexOfFirstSpeaker,
    indexOfLastSpeaker
  );
  const totalPages = Math.ceil(speakerData.length / SPEAKERS_PER_PAGE);

  return (
    <Section className="bg-background">
      <MotionReveal>
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          {isLoading
            ? "Loading speakers from the lineup…"
            : `${speakerData.length} practitioners sharing knowledge across cloud native, platform engineering, and open source.`}
        </p>
      </MotionReveal>

      {isLoading ? (
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <SpeakerCardSkeleton key={index} compact />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {currentSpeakers.map((speaker, index) => (
              <MotionReveal key={speaker.id} delay={index * 0.02}>
                <LineupSpeakerCard
                  speaker={speaker}
                  onClick={() => setSelectedSpeaker(speaker)}
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
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      currentPage === i + 1
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-primary/20 text-primary hover:bg-primary/5"
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

      <Dialog
        open={selectedSpeaker !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSpeaker(null);
        }}
      >
        <DialogContent className="max-w-2xl sm:max-w-2xl">
          {selectedSpeaker ? (
            <SpeakerDialogContent speaker={selectedSpeaker} />
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}