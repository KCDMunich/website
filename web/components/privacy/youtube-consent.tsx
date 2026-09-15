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

import { buildYouTubeEmbedUrl } from '@/lib/youtube';
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
        src={buildYouTubeEmbedUrl(videoId)}
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
