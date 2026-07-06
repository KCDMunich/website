"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  Heart,
  MapPin,
  Play,
  Share2,
} from "lucide-react";
import { useState } from "react";

import { SocialIcon } from "@/components/speakers/speaker-ui";
import { Button } from "@/components/ui/button";
import type { Speaker } from "@/lib/speakers-data";
import {
  getEventLocationLabel,
  getEventTypeLabel,
  type ScheduleEvent,
} from "@/lib/sessionize";
import { cn } from "@/lib/utils";

type ScheduleSessionDetailProps = {
  event: ScheduleEvent;
  speakers: Speaker[];
  backHref: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  sharePath?: string;
};

function findSpeakerProfile(speakers: Speaker[], speakerId: number | string) {
  return speakers.find((speaker) => String(speaker.id) === String(speakerId));
}

function findCompany(speaker: Speaker) {
  return (
    speaker.questionAnswers?.find(
      (entry) => entry.question?.toLowerCase() === "company"
    )?.answer || ""
  );
}

function findTagline(speaker: Speaker) {
  const preferred = ["job title", "title", "position", "role"];
  const match = speaker.questionAnswers?.find((entry) =>
    preferred.includes(entry.question?.toLowerCase() ?? "")
  );
  return match?.answer || "";
}

function SessionSpeakerProfile({ speaker }: { speaker: Speaker }) {
  const company = findCompany(speaker);
  const tagline = findTagline(speaker);

  return (
    <section className="overflow-hidden rounded-3xl border border-border/70 bg-card">
      <div className="border-b border-border/60 bg-muted/25 px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
          <div className="relative size-36 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border/60 sm:size-40">
            {speaker.profilePicture ? (
              <Image
                src={speaker.profilePicture}
                alt={speaker.fullName}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl font-bold text-primary">
                {speaker.fullName.charAt(0)}
              </div>
            )}
          </div>

          <div className="min-w-0 text-center sm:text-left">
            <h2 className="font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {speaker.fullName}
            </h2>
            {tagline ? (
              <p className="mt-3 text-lg leading-snug text-foreground">{tagline}</p>
            ) : null}
            {company ? (
              <p className="mt-2 text-base font-semibold text-[#0bbbef]">{company}</p>
            ) : null}
          </div>
        </div>
      </div>

      {speaker.bio ? (
        <div className="px-6 py-8 sm:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0bbbef]">
            The speaker
          </p>
          <p className="max-w-2xl whitespace-pre-line text-base leading-7 text-muted-foreground">
            {speaker.bio}
          </p>
        </div>
      ) : null}

      {speaker.links?.length ? (
        <div className="border-t border-border/60 px-6 py-5 sm:px-8">
          <ul className="flex flex-wrap gap-3">
            {speaker.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-muted/50"
                >
                  <SocialIcon url={link.url} />
                  <span>{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export function ScheduleSessionDetail({
  event,
  speakers,
  backHref,
  isFavorite = false,
  onToggleFavorite,
  sharePath,
}: ScheduleSessionDetailProps) {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const shareUrl =
    typeof window !== "undefined" && sharePath
      ? `${window.location.origin}${sharePath}`
      : "";

  const handleShare = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, url: shareUrl });
        return;
      } catch {
        // User cancelled
      }
    }

    await handleCopy();
  };

  const handleCopy = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyMessage("Link copied");
      window.setTimeout(() => setCopyMessage(null), 2200);
    } catch {
      setCopyMessage("Could not copy link");
      window.setTimeout(() => setCopyMessage(null), 2200);
    }
  };

  const sessionSpeakers =
    event.speakers
      ?.map((speaker) => findSpeakerProfile(speakers, speaker.id))
      .filter((speaker): speaker is Speaker => Boolean(speaker)) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <section className="hero-mesh border-b border-white/10 px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to schedule
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#0bbbef]">
                {getEventTypeLabel(event.type)}
              </p>
              <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-[#0bbbef]" />
                  {event.time} – {event.endTime}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[#0bbbef]" />
                  {getEventLocationLabel(event).replace(/^Room:\s*/, "")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4 text-[#0bbbef]" />
                  {event.duration} min
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onToggleFavorite ? (
                <Button
                  variant="outline"
                  className={cn(
                    "border-white/20 bg-white/10 text-white hover:bg-white/15",
                    isFavorite && "border-[#0bbbef]/40 bg-[#0bbbef]/15"
                  )}
                  onClick={onToggleFavorite}
                >
                  <Heart
                    className={cn("size-4", isFavorite && "fill-current text-[#0bbbef]")}
                  />
                  {isFavorite ? "Saved" : "Save session"}
                </Button>
              ) : null}
              <Button
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
                onClick={handleShare}
              >
                <Share2 className="size-4" />
                Share
              </Button>
              <Button
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
                onClick={handleCopy}
              >
                <Copy className="size-4" />
                Copy link
              </Button>
            </div>
          </div>
          {copyMessage ? (
            <p className="mt-4 text-sm font-medium text-[#0bbbef]">{copyMessage}</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <div className="space-y-8">
            {sessionSpeakers.length > 0 ? (
              sessionSpeakers.map((speaker) => (
                <SessionSpeakerProfile key={speaker.id} speaker={speaker} />
              ))
            ) : (
              <section className="rounded-3xl border border-border/70 bg-card p-8 text-sm text-muted-foreground">
                Speaker profiles will appear here once available.
              </section>
            )}
          </div>

          <section className="overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-8 sm:px-8 lg:sticky lg:top-24">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0bbbef]">
              The talk
            </p>
            {event.description ? (
              <div className="whitespace-pre-line text-base leading-7 text-foreground">
                {event.description}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Session details will be published soon.
              </p>
            )}

            {event.recordingUrl && event.recordingThumbnail ? (
              <a
                href={event.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 block overflow-hidden rounded-2xl ring-1 ring-border/70"
              >
                <div className="relative aspect-video w-full bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.recordingThumbnail}
                    alt={`Watch recording of ${event.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/35 transition-colors group-hover:bg-primary/45">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">
                      <Play className="size-4 fill-current" />
                      Watch recording
                    </span>
                  </div>
                </div>
              </a>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}