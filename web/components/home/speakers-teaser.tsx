"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Globe } from "lucide-react"

import { MotionReveal } from "@/components/layout/motion-reveal"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  PRE_ANNOUNCED_SPEAKER_IDS,
  SESSIONIZE_SPEAKERS_URL,
  SPEAKER_SESSION_MAP,
  type Speaker,
} from "@/lib/speakers-data"
import { cn } from "@/lib/utils"

function findCompanyInfo(speaker: Speaker) {
  const company = speaker.questionAnswers.find((q) => q.question === "Company")
  return company?.answer || "Speaker"
}

function SocialIcon({ url, isWhite = false }: { url: string; isWhite?: boolean }) {
  const className = cn("size-4", isWhite ? "text-white" : "text-primary")

  if (url.includes("github.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2Z" />
      </svg>
    )
  }
  if (url.includes("twitter.com") || url.includes("x.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
  if (url.includes("linkedin.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  if (url.includes("youtube.com")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  return <Globe className={className} />
}

function filterFeaturedSpeakers(speakers: Speaker[]) {
  return speakers
    .filter((speaker) => PRE_ANNOUNCED_SPEAKER_IDS.includes(speaker.id))
    .map((speaker) => {
      const sessionIds = SPEAKER_SESSION_MAP[speaker.id]
      if (sessionIds && Array.isArray(speaker.sessions)) {
        return {
          ...speaker,
          sessions: speaker.sessions.filter((session) =>
            sessionIds.includes(session.id)
          ),
        }
      }
      return speaker
    })
}

function SpeakerCard({
  speaker,
  onClick,
}: {
  speaker: Speaker
  onClick: () => void
}) {
  const company = findCompanyInfo(speaker)
  const firstTwoLinks = speaker.links?.slice(0, 2) || []
  const hasSession =
    Array.isArray(speaker.sessions) && speaker.sessions.length > 0

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={speaker.profilePicture}
          alt={speaker.fullName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
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
                  className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/40"
                  onClick={(event) => event.stopPropagation()}
                >
                  <SocialIcon url={link.url} isWhite />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="space-y-2 pt-4 text-center">
        <h3 className="font-bold text-foreground">{speaker.fullName}</h3>
        <p className="text-sm font-medium text-primary">{company}</p>
        <div className="rounded-lg bg-muted/50 p-2">
          {hasSession ? (
            <div>
              <p className="mb-1 text-xs font-medium uppercase text-primary">
                Session
              </p>
              <p className="line-clamp-2 text-sm font-medium text-foreground">
                {speaker.sessions[0].name}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sessions coming soon
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function SpeakerDialogContent({ speaker }: { speaker: Speaker }) {
  const company = findCompanyInfo(speaker)
  const validSessions = Array.isArray(speaker.sessions)
    ? speaker.sessions.filter(
        (session) =>
          typeof session === "object" &&
          typeof session.id === "number" &&
          typeof session.name === "string"
      )
    : []

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
              className="flex items-center gap-2 rounded-full bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
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
  )
}

export function SpeakersTeaser() {
  const [speakerData, setSpeakerData] = useState<Speaker[]>([])
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

  useEffect(() => {
    fetch(SESSIONIZE_SPEAKERS_URL)
      .then((response) => response.json())
      .then((data: Speaker[]) => {
        setSpeakerData(data)
      })
      .catch((error) => console.error("Error fetching speakers:", error))
  }, [])

  const featuredSpeakers = filterFeaturedSpeakers(speakerData)

  return (
    <Section id="speakers" className="overflow-hidden bg-background">
      <MotionReveal>
        <SectionHeader
          eyebrow="Speakers"
          title="Meet the lineup"
          description="Practitioners and experts from the cloud native community."
        />
      </MotionReveal>

      {featuredSpeakers.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading speakers…</p>
        </div>
      ) : (
        <>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hidden sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {featuredSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="w-[220px] shrink-0 snap-start sm:w-[240px]"
              >
                <SpeakerCard
                  speaker={speaker}
                  onClick={() => setSelectedSpeaker(speaker)}
                />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button
              nativeButton={false}
              render={<a href="/speakers" />}
              size="lg"
              className="bg-primary text-primary-foreground"
            >
              View all speakers
            </Button>
          </div>
        </>
      )}

      <Dialog
        open={selectedSpeaker !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSpeaker(null)
        }}
      >
        <DialogContent className="max-w-2xl sm:max-w-2xl">
          {selectedSpeaker && (
            <SpeakerDialogContent speaker={selectedSpeaker} />
          )}
        </DialogContent>
      </Dialog>
    </Section>
  )
}