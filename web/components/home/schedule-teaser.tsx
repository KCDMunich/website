'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { ArrowRight, Play } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { EVENT_CONFIG } from '@/lib/event-config';
import type { SitePresentation } from '@/lib/site-presentation';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

const PLAYLIST_URL = EVENT_CONFIG.archive.playlistUrl;
const PREVIEW_COUNT = 5;
const subscribeToOrigin = () => () => {};

const FALLBACK_VIDEO_IDS = [
  'X9OH76DK6H8',
  'VcY_0b0lchk',
  'byehnUkET6I',
  'j1kyiO27r0s',
  'I3XqMW0jOB0',
];

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
}

const FALLBACK_VIDEOS: PlaylistVideo[] = FALLBACK_VIDEO_IDS.map((id, index) => ({
  id,
  title: `Cloud Native Summit Munich – Session ${index + 1}`,
  thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
}));

function getThumbnailUrl(videoId: string, thumbnail?: string) {
  return thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

type ScheduleTeaserProps = {
  presentation: SitePresentation['program'];
  tone?: SectionTone;
};

export function ScheduleTeaser({ presentation, tone = 'default' }: ScheduleTeaserProps) {
  const [videos, setVideos] = useState<PlaylistVideo[]>(FALLBACK_VIDEOS);
  const [activeVideoId, setActiveVideoId] = useState(FALLBACK_VIDEOS[0].id);
  const embedOrigin = useSyncExternalStore(
    subscribeToOrigin,
    () => window.location.origin,
    () => null
  );

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId]
  );

  const previewVideos = useMemo(() => videos.slice(0, PREVIEW_COUNT), [videos]);
  useEffect(() => {
    let cancelled = false;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch('/api/youtube-playlist/');
        if (!response.ok) return;

        const xml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const entries = Array.from(doc.getElementsByTagName('entry'));

        const extractedVideos: PlaylistVideo[] = [];

        for (const entry of entries) {
          const id = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
          const title = entry.getElementsByTagName('title')[0]?.textContent;
          const thumbnail = entry.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url');

          if (!id) continue;

          extractedVideos.push({
            id,
            title: title || 'CNS Munich Session',
            thumbnail: getThumbnailUrl(id, thumbnail ?? undefined),
          });
        }

        if (!cancelled && extractedVideos.length > 0) {
          setVideos(extractedVideos);
          const visibleVideos = extractedVideos.slice(0, PREVIEW_COUNT);
          const randomVideo = visibleVideos[Math.floor(Math.random() * visibleVideos.length)];
          setActiveVideoId(randomVideo.id);
        }
      } catch {
        // Silent fallback to predefined videos
      }
    };

    fetchPlaylist();

    return () => {
      cancelled = true;
    };
  }, []);

  if (presentation.mode === 'published') {
    return (
      <Section id="schedule-teaser" className={cn(SECTION_TONE_CLASS[tone])}>
        <div className="mx-auto max-w-3xl text-center">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0bbbef]">
              {presentation.scheduleEyebrow}
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {presentation.scheduleTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {presentation.scheduleDescription}
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/schedule" />}
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Explore the schedule
              <ArrowRight className="size-4" />
            </Button>
          </MotionReveal>
        </div>
      </Section>
    );
  }

  return (
    <Section id="schedule-teaser" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {presentation.isArchive ? 'The sessions live on,' : 'Replay past sessions,'}
            <br />
            <span className="text-[#0bbbef]">
              {presentation.isArchive ? 'wherever you are' : 'on your schedule'}
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {presentation.isArchive
              ? `Revisit the talks, workshops, and community stories from CNS Munich ${EVENT_CONFIG.archive.edition} — free to watch and share.`
              : `Talks and community spotlights from CNS Munich ${EVENT_CONFIG.archive.edition} — free to watch while we shape the next edition.`}
          </p>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.08}>
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-2xl ring-1 ring-primary/10 shadow-md">
            {activeVideo && embedOrigin ? (
              <iframe
                key={activeVideo.id}
                title={activeVideo.title}
                src={`https://www.youtube.com/embed/${activeVideo.id}?feature=oembed&rel=0&enablejsapi=1&origin=${encodeURIComponent(embedOrigin)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="aspect-video w-full"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-primary/5 text-sm text-muted-foreground">
                Loading video...
              </div>
            )}
          </div>

          {activeVideo?.title ? (
            <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
              {activeVideo.title}
            </p>
          ) : null}
        </div>
      </MotionReveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {previewVideos.map((video, index) => {
          const isActive = video.id === activeVideoId;

          return (
            <MotionReveal key={video.id} delay={index * 0.04}>
              <button
                type="button"
                onClick={() => setActiveVideoId(video.id)}
                aria-label={`Play ${video.title}`}
                aria-pressed={isActive}
                className={cn(
                  'group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl text-left shadow-md ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                  isActive ? 'ring-primary' : 'ring-primary/10'
                )}
              >
                <Image
                  src={video.thumbnail}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 15vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm">
                    <Play className="size-4 fill-current" />
                  </span>
                </div>
                {isActive ? (
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/20 sm:text-xs">
                      <span className="size-1.5 rounded-full bg-[#0bbbef]" />
                      Playing
                    </span>
                  </div>
                ) : null}
              </button>
            </MotionReveal>
          );
        })}
      </div>

      <MotionReveal delay={0.2}>
        <div className="mt-10 flex justify-center">
          <Button
            nativeButton={false}
            render={<a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer" />}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            YouTube playlist
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </MotionReveal>
    </Section>
  );
}
