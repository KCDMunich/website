'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SpeakerDetail } from '@/components/speakers/speaker-detail';
import { SpeakerDetailSkeleton } from '@/components/speakers/speaker-detail-skeleton';
import type { Speaker } from '@/lib/speakers-data';
import { getCachedSpeaker, loadSpeakersData } from '@/lib/speaker-data-cache';

type SpeakerDetailPageProps = {
  speakerId: string;
  backHref?: string;
  initialSpeaker?: Speaker | null;
};

export function SpeakerDetailPage({
  speakerId,
  backHref = '/speakers',
  initialSpeaker = null,
}: SpeakerDetailPageProps) {
  const router = useRouter();
  const [speaker, setSpeaker] = useState<Speaker | null>(
    initialSpeaker ?? getCachedSpeaker(speakerId),
  );
  const [isLoading, setIsLoading] = useState(!speaker);

  useEffect(() => {
    let cancelled = false;

    const resolveSpeaker = async () => {
      const cached = getCachedSpeaker(speakerId);
      if (cached && !cancelled) {
        setSpeaker(cached);
        setIsLoading(false);
      } else if (initialSpeaker && !cancelled) {
        setIsLoading(false);
      }

      try {
        const speakers = await loadSpeakersData();
        if (cancelled) return;

        const match =
          speakers.find((entry) => String(entry.id) === String(speakerId)) ?? null;
        setSpeaker(match);
      } catch (error) {
        console.error('Error loading speaker:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    resolveSpeaker();

    return () => {
      cancelled = true;
    };
  }, [initialSpeaker, speakerId]);

  useEffect(() => {
    if (!isLoading && !speaker) {
      router.replace(backHref);
    }
  }, [isLoading, speaker, router, backHref]);

  if (isLoading && !speaker) {
    return <SpeakerDetailSkeleton />;
  }

  if (!speaker) {
    return null;
  }

  return <SpeakerDetail speaker={speaker} backHref={backHref} />;
}