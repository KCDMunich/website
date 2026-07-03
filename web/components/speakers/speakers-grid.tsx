"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  SESSIONIZE_SPEAKERS_URL,
  type Speaker,
  type SpeakerSession,
} from "@/lib/speakers-data";
import { cn } from "@/lib/utils";

const SPEAKERS_PER_PAGE = 30;

function findCompanyInfo(speaker: Speaker) {
  const company = speaker.questionAnswers.find((q) => q.question === "Company");
  return company?.answer || "Speaker";
}

function SocialIcon({ url, isWhite = false }: { url: string; isWhite?: boolean }) {
  const className = cn("size-6", isWhite ? "text-white" : "text-[#283058]");

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

function isValidSession(session: unknown): session is SpeakerSession {
  return (
    typeof session === "object" &&
    session !== null &&
    typeof (session as SpeakerSession).id === "number" &&
    typeof (session as SpeakerSession).name === "string"
  );
}

function SpeakerCard({
  speaker,
  onClick,
}: {
  speaker: Speaker;
  onClick: () => void;
}) {
  const company = findCompanyInfo(speaker);
  const firstTwoLinks = speaker.links?.slice(0, 2) || [];
  const hasSession = Array.isArray(speaker.sessions) && speaker.sessions.length > 0;

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={speaker.profilePicture}
          alt={speaker.fullName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-3 sm:p-4">
            <div className="mb-2 flex gap-2">
              {firstTwoLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/20 p-1.5 transition-colors hover:bg-white/40 sm:p-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SocialIcon url={link.url} isWhite />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-3 text-center sm:p-4">
        <h3 className="text-sm font-bold text-gray-900 sm:text-lg">{speaker.fullName}</h3>
        <p className="text-xs font-medium text-[#283058] sm:text-sm">{company}</p>
        <div className="mt-2 rounded-lg bg-gray-50 p-2">
          {hasSession ? (
            <div>
              <p className="mb-1 text-xs font-medium text-[#283058]">SESSION</p>
              <p className="line-clamp-2 text-xs font-medium text-gray-800 sm:text-sm">
                {speaker.sessions[0].name}
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-600 sm:text-sm">Sessions coming soon</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SpeakerDialog({ speaker }: { speaker: Speaker }) {
  const company = findCompanyInfo(speaker);
  const validSessions = Array.isArray(speaker.sessions)
    ? speaker.sessions.filter(isValidSession)
    : [];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-start">
        <p className="mb-1 text-sm font-medium text-[#283058]">{company}</p>
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{speaker.fullName}</h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
            <Image
              src={speaker.profilePicture}
              alt={speaker.fullName}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {speaker.links?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200"
              >
                <SocialIcon url={link.url} />
                <span className="inline text-xs">{link.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">About</h3>
          <div className="whitespace-pre-line text-sm text-gray-600 sm:text-base">
            {speaker.bio || "No bio available."}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Sessions</h3>
          <div className="space-y-3">
            {validSessions.length > 0 ? (
              validSessions.map((session) => (
                <div key={session.id} className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-bold text-gray-900">{session.name}</h4>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sessions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(SESSIONIZE_SPEAKERS_URL)
      .then((response) => response.json())
      .then((data: Speaker[]) => {
        setSpeakerData(shuffleSpeakers(data));
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const indexOfLastSpeaker = currentPage * SPEAKERS_PER_PAGE;
  const indexOfFirstSpeaker = indexOfLastSpeaker - SPEAKERS_PER_PAGE;
  const currentSpeakers = speakerData.slice(indexOfFirstSpeaker, indexOfLastSpeaker);
  const totalPages = Math.ceil(speakerData.length / SPEAKERS_PER_PAGE);

  return (
    <div className="container mx-auto mb-8 px-4 py-12 sm:py-20">
      {speakerData.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6">
            {currentSpeakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                onClick={() => setSelectedSpeaker(speaker)}
              />
            ))}
          </div>

          {speakerData.length > SPEAKERS_PER_PAGE && (
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    currentPage === i + 1
                      ? "bg-[#283058] text-white hover:bg-[#283058]/90"
                      : "border-[#283058] text-[#283058] hover:bg-[#283058] hover:text-white"
                  )}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}

          <Dialog
            open={selectedSpeaker !== null}
            onOpenChange={(open) => {
              if (!open) setSelectedSpeaker(null);
            }}
          >
            <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto p-0 sm:max-w-2xl">
              {selectedSpeaker && <SpeakerDialog speaker={selectedSpeaker} />}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}