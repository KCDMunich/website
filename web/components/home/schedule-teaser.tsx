"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

import { Eyebrow } from "@/components/layout/eyebrow";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const PLAYLIST_ID = "PL54A_DPe8WtDLSA_EA7ETfprpRWzd2yqV";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
const PREVIEW_COUNT = 5;

const FALLBACK_VIDEO_IDS = [
  "g-sZwa52DNE",
  "CHb3TLEV8ZU",
  "vmKlVABhdwc",
  "mHDBsS9c9MM",
  "n5LsBJwARbU",
  "WJzMyA47lfo",
  "SDelo4VdPUk",
  "SPPJHwavM0c",
  "lkK4ACNg22g",
  "aLdgVrnMxcs",
  "XETuwndd_mw",
  "cIZ90x7aNJE",
  "L2d_busMOJA",
  "PwqyYbGXYG8",
  "xWSEGsB7uFI",
  "0inKO9yA950",
  "PF2diWKfjWo",
  "GiZzkSnDc-E",
  "LwYqFrLnBeM",
  "n_o4dxHrNDM",
  "NfqV0Lb00Zc",
  "E_r56x92KZw",
  "HV9KsLz-odw",
  "pg2DKYc9n_o",
  "iiGRMPMBKVQ",
  "Rh6cjzEB1-4",
  "EztpUoi0hgU",
  "X9U0b7RVafM",
  "QMhkueuHnpE",
  "3N_XBNAycqw",
  "mr83OyjqaCQ",
  "KkjQI20IFtE",
  "kFyRUae2hV4",
  "46-cPZz8VH0",
  "tWHHmb-v6Y0",
  "RLyO18tG8GI",
  "RYdsuTD8Wjs",
  "eLGBAd7fHdM",
  "iSMk7a62wUc",
  "aEqj_Ok5B58",
  "fDBNJ2N9fqw",
  "4CcNPHT_-nA",
  "nMlmUFKN7Bo",
  "MpU-vo4K7BQ",
  "sgYc8Vt6eaU",
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
  tone?: SectionTone;
};

export function ScheduleTeaser({ tone = "default" }: ScheduleTeaserProps) {
  const [videos, setVideos] = useState<PlaylistVideo[]>(FALLBACK_VIDEOS);
  const [activeVideoId, setActiveVideoId] = useState(FALLBACK_VIDEOS[0].id);

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId]
  );

  const previewVideos = useMemo(() => videos.slice(0, PREVIEW_COUNT), [videos]);

  useEffect(() => {
    let cancelled = false;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(
          `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
        );
        if (!response.ok) return;

        const xml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        const entries = Array.from(doc.getElementsByTagName("entry"));

        const extractedVideos: PlaylistVideo[] = [];

        for (const entry of entries) {
          const id = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
          const title = entry.getElementsByTagName("title")[0]?.textContent;
          const thumbnail = entry
            .getElementsByTagName("media:thumbnail")[0]
            ?.getAttribute("url");

          if (!id) continue;

          extractedVideos.push({
            id,
            title: title || "CNS Munich Session",
            thumbnail: getThumbnailUrl(id, thumbnail ?? undefined),
          });
        }

        if (!cancelled && extractedVideos.length > 0) {
          setVideos(extractedVideos);
          const randomVideo =
            extractedVideos[
              Math.floor(Math.random() * extractedVideos.length)
            ];
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

  return (
    <Section id="schedule-teaser" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>On demand</Eyebrow>
          </div>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Replay past sessions,
            <br />
            <span className="text-[#0bbbef]">on your schedule</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Talks, workshops, and community spotlights from previous CNS Munich
            editions — free to watch while we shape the 2026 program.
          </p>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.08}>
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-2xl ring-1 ring-primary/10 shadow-md">
            {activeVideo ? (
              <iframe
                key={activeVideo.id}
                title={activeVideo.title}
                src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1&color=white&list=${PLAYLIST_ID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="aspect-video w-full"
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
                  "group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl text-left shadow-md ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  isActive
                    ? "ring-primary"
                    : "ring-primary/10"
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
            render={
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
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