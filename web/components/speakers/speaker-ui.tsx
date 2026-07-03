"use client";

import Image from "next/image";
import { Globe } from "lucide-react";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Speaker } from "@/lib/speakers-data";
import { cn } from "@/lib/utils";

export function findCompanyInfo(speaker: Speaker) {
  const company = speaker.questionAnswers.find((q) => q.question === "Company");
  return company?.answer || "Speaker";
}

export function SocialIcon({
  url,
  isWhite = false,
}: {
  url: string;
  isWhite?: boolean;
}) {
  const className = cn("size-4", isWhite ? "text-white" : "text-primary");

  if (url.includes("github.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2Z" />
      </svg>
    );
  }
  if (url.includes("twitter.com") || url.includes("x.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (url.includes("linkedin.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (url.includes("youtube.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  return <Globe className={className} />;
}

type SpeakerCardVariant = "wall" | "detailed";

export function SpeakerCardSkeleton({
  compact = false,
  variant = "detailed",
}: {
  compact?: boolean;
  variant?: SpeakerCardVariant;
}) {
  if (variant === "wall") {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-primary/10">
        <div className="aspect-square animate-pulse bg-primary/10" />
      </div>
    );
  }

  if (compact) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-primary/10">
        <div className="aspect-square animate-pulse bg-primary/10" />
        <div className="space-y-3 p-4">
          <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-primary/10" />
          <div className="mx-auto h-3 w-1/2 animate-pulse rounded bg-primary/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 to-primary/[0.03] ring-1 ring-primary/10">
      <div className="aspect-[4/5] animate-pulse bg-primary/10" />
      <div className="space-y-3 p-4">
        <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-primary/10" />
        <div className="mx-auto h-3 w-1/2 animate-pulse rounded bg-primary/10" />
        <div className="h-10 animate-pulse rounded-lg bg-primary/10" />
      </div>
    </div>
  );
}

export function AnnouncedSpeakerCard({
  speaker,
  onClick,
}: {
  speaker: Speaker;
  onClick: () => void;
}) {
  const company = findCompanyInfo(speaker);
  const firstTwoLinks = speaker.links?.slice(0, 2) || [];
  const hasSession =
    Array.isArray(speaker.sessions) && speaker.sessions.length > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 to-primary/[0.03] text-left ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={speaker.profilePicture}
          alt={speaker.fullName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-heading text-lg font-bold leading-tight text-white">
                {speaker.fullName}
              </h3>
              <p className="mt-0.5 truncate text-sm font-medium text-white/80">
                {company}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {firstTwoLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/35"
                  onClick={(event) => event.stopPropagation()}
                >
                  <SocialIcon url={link.url} isWhite />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {hasSession ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
              Session
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-foreground">
              {speaker.sessions[0].name}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Sessions coming soon</p>
        )}
      </div>
    </button>
  );
}

export function LineupSpeakerCard({
  speaker,
  onClick,
  variant = "detailed",
}: {
  speaker: Speaker;
  onClick: () => void;
  variant?: SpeakerCardVariant;
}) {
  const company = findCompanyInfo(speaker);
  const firstTwoLinks = speaker.links?.slice(0, 2) || [];
  const hasSession =
    Array.isArray(speaker.sessions) && speaker.sessions.length > 0;

  if (variant === "wall") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Image
          src={speaker.profilePicture}
          alt={speaker.fullName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 15vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-heading text-sm font-bold leading-tight text-white sm:text-base">
                {speaker.fullName}
              </h3>
              <p className="mt-0.5 truncate text-xs font-medium text-[#0bbbef] sm:text-sm">
                {company}
              </p>
            </div>
            {firstTwoLinks.length > 0 ? (
              <div className="flex shrink-0 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {firstTwoLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/35"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <SocialIcon url={link.url} isWhite />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={speaker.profilePicture}
          alt={speaker.fullName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 15vw"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-3">
            <div className="flex gap-2">
              {firstTwoLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-full bg-white/20 p-2 transition-colors hover:bg-white/40"
                  onClick={(event) => event.stopPropagation()}
                >
                  <SocialIcon url={link.url} isWhite />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3 text-center sm:p-4">
        <h3 className="text-sm font-bold text-foreground sm:text-base">
          {speaker.fullName}
        </h3>
        <p className="text-xs font-medium text-primary sm:text-sm">{company}</p>
        <div className="mt-2 rounded-lg bg-muted/50 p-2">
          {hasSession ? (
            <>
              <p className="mb-1 text-xs font-medium uppercase text-primary">
                Session
              </p>
              <p className="line-clamp-2 text-xs font-medium text-foreground sm:text-sm">
                {speaker.sessions[0].name}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground sm:text-sm">
              Sessions coming soon
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export function SpeakerDialogContent({ speaker }: { speaker: Speaker }) {
  const company = findCompanyInfo(speaker);
  const validSessions = Array.isArray(speaker.sessions)
    ? speaker.sessions.filter(
        (session) =>
          typeof session === "object" &&
          typeof session.id === "number" &&
          typeof session.name === "string"
      )
    : [];

  return (
    <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
      <DialogHeader>
        <p className="text-sm font-medium text-primary">{company}</p>
        <DialogTitle className="text-2xl">{speaker.fullName}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 rounded-xl bg-muted/30 p-4">
        <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-lg">
          <Image
            src={speaker.profilePicture}
            alt={speaker.fullName}
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {speaker.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <SocialIcon url={link.url} />
              <span className="text-xs">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">About</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {speaker.bio || "No bio available."}
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Sessions</h3>
        <div className="space-y-2">
          {validSessions.length > 0 ? (
            validSessions.map((session) => (
              <div key={session.id} className="rounded-lg bg-muted/30 p-3">
                <h4 className="font-semibold text-foreground">{session.name}</h4>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No sessions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}