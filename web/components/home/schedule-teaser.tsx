'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { YouTubeEmbed } from '@/components/privacy/youtube-consent';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { EVENT_CONFIG } from '@/lib/event-config';
import type { SitePresentation } from '@/lib/site-presentation';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

const PLAYLIST_URL = EVENT_CONFIG.archive.playlistUrl;
const PREVIEW_COUNT = 5;
interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
}

const FALLBACK_VIDEOS: PlaylistVideo[] = [
  ['X9OH76DK6H8', '3+1 ways to do MlOps with Kubernetes - Kateryna Hrytsaienko'],
  [
    'VcY_0b0lchk',
    "In Short: Distributed by DNA: Why Europe's Cloud Market Will and Probably Should Be Decentralized",
  ],
  ['byehnUkET6I', 'Designing Organizations to Prevent Incidents - Adelina Stanciu'],
  [
    'j1kyiO27r0s',
    'Don’t Debug, Reset: Managing Kubernetes the Declarative Way with Talos Linux - Daniel Bodky',
  ],
  [
    'I3XqMW0jOB0',
    'How We Run 8,000+ GPUs on Kubernetes with Slurm - Fagani Hajizada & Giulio Calzolari',
  ],
  [
    'eWBGPnGhKLY',
    'The Limits of Vibe Coding: AI, Hype, and the Future of Real Software Engineering - Christian Gläser',
  ],
  [
    'JrAOHnJ6fn0',
    'Build Your Own Cloud Native DBaaS: Leveraging GitOps and CNPG - Shiva Deep Gundoju',
  ],
  [
    'fNMNj96JItQ',
    'Your Backstage, Your Problems, Your Metrics - Thomas Schuetz & Katharina Sick',
  ],
  ['sRbaMwAb3ps', "The AI-Empowered Team: A PM's Guide to What Actually Works - Dominik Schmidle"],
  ['Ko2IIWk5RPE', 'The Evolution of GitOps in Platform Engineering - Koray Oksay & Artem Lajko'],
  ['T5gfXqeZufA', 'Keynote: The Evolution to Platform Engineering 2.0 - Bjoern Brundert'],
  ['Zqrc1zrg9uQ', 'eBPF on Wheels - Container Security for Automotive Use Cases - Reinhard Kugler'],
  [
    'r4tro8X_wy0',
    'Sovereignty through Mastery: Building a Multi-Cloud IDP for Digital Autonomy - Andreas Grub',
  ],
  ['0RmPD7stN4M', "Don't Just Flip the Switch: Measure What Happens Next - Lukas Reining & André Silva"],
  [
    'Ns4KF88U-sM',
    'Inside Neoclouds & AI Factories: Architecting Kubernetes for GPUs & Extreme Scale - Lukas Gentele',
  ],
].map(([id, title]) => ({
  id,
  title,
  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
}));

function getThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function shuffleVideos(videos: PlaylistVideo[]) {
  const shuffled = [...videos];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

type ScheduleTeaserProps = {
  presentation: SitePresentation['program'];
  tone?: SectionTone;
};

export function ScheduleTeaser({ presentation, tone = 'default' }: ScheduleTeaserProps) {
  const [videos, setVideos] = useState<PlaylistVideo[]>(FALLBACK_VIDEOS);
  const [activeVideoId, setActiveVideoId] = useState(FALLBACK_VIDEOS[0].id);

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId]
  );

  const previewVideos = useMemo(() => videos.slice(0, PREVIEW_COUNT), [videos]);
  useEffect(() => {
    let cancelled = false;

    const showRandomizedVideos = (nextVideos: PlaylistVideo[]) => {
      if (cancelled || nextVideos.length === 0) return;

      const randomizedVideos = shuffleVideos(nextVideos);
      setVideos(randomizedVideos);
      setActiveVideoId(randomizedVideos[0].id);
    };

    const fetchPlaylist = async () => {
      try {
        const response = await fetch('/api/youtube-playlist');
        if (!response.ok) {
          showRandomizedVideos(FALLBACK_VIDEOS);
          return;
        }

        const xml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const entries = Array.from(doc.getElementsByTagName('entry'));

        const extractedVideos: PlaylistVideo[] = [];

        for (const entry of entries) {
          const id = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
          const title = entry.getElementsByTagName('title')[0]?.textContent;

          if (!id) continue;

          extractedVideos.push({
            id,
            title: title || 'CNS Munich Session',
            thumbnail: getThumbnailUrl(id),
          });
        }

        showRandomizedVideos(extractedVideos.length > 0 ? extractedVideos : FALLBACK_VIDEOS);
      } catch {
        showRandomizedVideos(FALLBACK_VIDEOS);
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
            {' '}
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
            {activeVideo ? (
              <YouTubeEmbed
                videoId={activeVideo.id}
                title={activeVideo.title}
                thumbnail={activeVideo.thumbnail}
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-primary/5 text-sm text-muted-foreground">
                No video available
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
