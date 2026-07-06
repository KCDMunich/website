'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';

import { SocialIcon, findCompanyInfo } from '@/components/speakers/speaker-ui';
import { Button } from '@/components/ui/button';
import type { Speaker } from '@/lib/speakers-data';
import { getSessionPath } from '@/lib/schedule-session';
import {
  getPublicSpeakerPath,
  getValidSpeakerSessions,
} from '@/lib/speaker-page';
import { cn } from '@/lib/utils';

function findTagline(speaker: Speaker) {
  const preferred = ['job title', 'title', 'position', 'role'];
  const match = speaker.questionAnswers?.find((entry) =>
    preferred.includes(entry.question?.toLowerCase() ?? ''),
  );
  return match?.answer || '';
}

type SpeakerDetailProps = {
  speaker: Speaker;
  backHref?: string;
};

export function SpeakerDetail({ speaker, backHref = '/speakers' }: SpeakerDetailProps) {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const company = findCompanyInfo(speaker);
  const tagline = findTagline(speaker);
  const sessions = getValidSpeakerSessions(speaker);
  const sharePath = getPublicSpeakerPath(speaker);
  const shareUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${sharePath}` : '';

  const handleShare = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({ title: speaker.fullName, url: shareUrl });
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
      setCopyMessage('Link copied');
      window.setTimeout(() => setCopyMessage(null), 2200);
    } catch {
      setCopyMessage('Could not copy link');
      window.setTimeout(() => setCopyMessage(null), 2200);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="hero-mesh border-b border-white/10 px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to speakers
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              <div className="relative size-36 shrink-0 overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-2 ring-white/20 sm:size-40">
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
                  <div className="flex h-full items-center justify-center text-4xl font-bold text-white">
                    {speaker.fullName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0bbbef]">
                  Speaker
                </p>
                <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {speaker.fullName}
                </h1>
                {tagline ? (
                  <p className="mt-3 text-lg text-white/85">{tagline}</p>
                ) : null}
                {company ? (
                  <p className="mt-2 text-base font-semibold text-[#0bbbef]">{company}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start lg:justify-end">
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
              {copyMessage ? (
                <span className="text-sm text-white/70">{copyMessage}</span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
          <section className="overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-8 sm:px-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0bbbef]">
              About
            </p>
            <p className="whitespace-pre-line text-base leading-7 text-muted-foreground">
              {speaker.bio || 'Bio coming soon.'}
            </p>

            {speaker.links?.length ? (
              <ul className="mt-8 flex flex-wrap gap-3 border-t border-border/60 pt-6">
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
            ) : null}
          </section>

          <section
            className={cn(
              'overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-8 sm:px-8',
              'lg:sticky lg:top-24',
            )}
          >
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0bbbef]">
              Sessions at CNS Munich
            </p>

            {sessions.length > 0 ? (
              <ul className="space-y-3">
                {sessions.map((session) => (
                  <li key={session.id}>
                    <Link
                      href={getSessionPath({ id: session.id, title: session.name })}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-muted/20 px-4 py-4 transition-colors hover:border-primary/20 hover:bg-muted/40"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {session.name}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
                <Calendar className="mb-2 size-5 text-primary/70" />
                Sessions will be announced soon.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}