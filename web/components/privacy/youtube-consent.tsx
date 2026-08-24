'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Play, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

const YOUTUBE_SESSION_KEY = 'cns-youtube-consent';

type YouTubeConsentContextValue = {
  allowed: boolean;
  allow: () => void;
};

const YouTubeConsentContext = createContext<YouTubeConsentContextValue | null>(null);

export function YouTubeConsentProvider({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let restoreTimeout: number | undefined;

    try {
      if (sessionStorage.getItem(YOUTUBE_SESSION_KEY) === 'granted') {
        restoreTimeout = window.setTimeout(() => setAllowed(true), 0);
      }
    } catch {
      // Videos stay disabled when browser storage is unavailable.
    }

    return () => {
      if (restoreTimeout !== undefined) window.clearTimeout(restoreTimeout);
    };
  }, []);

  const allow = useCallback(() => {
    try {
      sessionStorage.setItem(YOUTUBE_SESSION_KEY, 'granted');
    } catch {
      // Consent still applies for the current page even without browser storage.
    }
    setAllowed(true);
  }, []);

  const value = useMemo(() => ({ allowed, allow }), [allowed, allow]);

  return (
    <YouTubeConsentContext.Provider value={value}>{children}</YouTubeConsentContext.Provider>
  );
}

function useYouTubeConsent() {
  const context = useContext(YouTubeConsentContext);
  if (!context) {
    throw new Error('YouTube consent components must be wrapped in YouTubeConsentProvider.');
  }
  return context;
}

type YouTubeHeroMediaProps = {
  title: string;
  videoId: string;
};

export function YouTubeHeroMedia({ title, videoId }: YouTubeHeroMediaProps) {
  const { allowed } = useYouTubeConsent();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Image
        src="/images/venue/venue-1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {allowed && !reduceMotion ? (
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=5&controls=0&rel=0&playsinline=1&iv_load_policy=3&cc_load_policy=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      ) : null}
    </>
  );
}

export function YouTubeHeroConsentControl() {
  const { allowed, allow } = useYouTubeConsent();
  const reduceMotion = useReducedMotion();

  if (allowed) return null;

  return (
    <div className="absolute bottom-5 right-4 z-10 flex max-w-[calc(100%-2rem)] flex-col items-end gap-1.5 sm:bottom-7 sm:right-6">
      <button
        type="button"
        onClick={allow}
        className="inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2.5 text-xs font-semibold text-white shadow-lg ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0bbbef] sm:text-sm"
      >
        <Play className="size-3.5 fill-current" aria-hidden="true" />
        {reduceMotion ? 'Enable YouTube videos' : 'Load background video'}
      </button>
      <Link
        href="/privacy-policy/#youtube"
        className="rounded bg-black/35 px-2 py-1 text-[10px] text-white/80 backdrop-blur-sm hover:text-white"
      >
        YouTube privacy information
      </Link>
    </div>
  );
}

type YouTubeEmbedProps = {
  className?: string;
  thumbnail: string;
  title: string;
  videoId: string;
};

export function YouTubeEmbed({ className, thumbnail, title, videoId }: YouTubeEmbedProps) {
  const { allowed, allow } = useYouTubeConsent();

  if (allowed) {
    return (
      <iframe
        key={videoId}
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&color=white`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className={cn('aspect-video w-full', className)}
      />
    );
  }

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden bg-primary', className)}>
      <Image src={thumbnail} alt="" fill sizes="(max-width: 1024px) 100vw, 896px" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-primary/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-white">
        <div className="flex size-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
          <ShieldCheck className="size-5 text-[#0bbbef]" aria-hidden="true" />
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
          YouTube is disabled until you choose to load it. Your choice applies to this browser tab.
        </p>
        <button
          type="button"
          onClick={allow}
          className="inline-flex items-center gap-2 rounded-full bg-[#0bbbef] px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-[#35c8f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Play className="size-4 fill-current" aria-hidden="true" />
          Load video from YouTube
        </button>
        <Link href="/privacy-policy/#youtube" className="text-xs text-white/75 underline hover:text-white">
          Privacy information
        </Link>
      </div>
    </div>
  );
}
