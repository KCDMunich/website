"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const PLAYLIST_ID = "PL54A_DPe8WtDLSA_EA7ETfprpRWzd2yqV"
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`

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
]

interface PlaylistVideo {
  id: string
  title: string
  thumbnail?: string
}

const FALLBACK_VIDEOS: PlaylistVideo[] = FALLBACK_VIDEO_IDS.map((id, index) => ({
  id,
  title: `Cloud Native Summit Munich – Sessions ${index + 1}`,
  thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
}))

export function ScheduleTeaser() {
  const [activeVideo, setActiveVideo] = useState<PlaylistVideo>(
    FALLBACK_VIDEOS[0]
  )

  useEffect(() => {
    let cancelled = false

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(
          `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
        )
        if (!response.ok) return

        const xml = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(xml, "text/xml")
        const entries = Array.from(doc.getElementsByTagName("entry"))

        const extractedVideos: PlaylistVideo[] = []

        for (const entry of entries) {
          const id = entry.getElementsByTagName("yt:videoId")[0]?.textContent
          const title = entry.getElementsByTagName("title")[0]?.textContent
          const thumbnail = entry
            .getElementsByTagName("media:thumbnail")[0]
            ?.getAttribute("url")

          if (!id) continue

          extractedVideos.push({
            id,
            title: title || "CNS Munich Session",
            ...(thumbnail ? { thumbnail } : {}),
          })
        }

        if (!cancelled && extractedVideos.length > 0) {
          const randomVideo =
            extractedVideos[
              Math.floor(Math.random() * extractedVideos.length)
            ]
          setActiveVideo(randomVideo)
        }
      } catch {
        // Silent fallback to predefined videos
      }
    }

    fetchPlaylist()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Section id="schedule-teaser" className="bg-muted/20">
      <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Replay past Sessions
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Revisit every talk, workshop, and community spotlight from last
            year&apos;s program while we prepare for the next gathering. The full
            schedule remains live, so you can catch anything you missed or replay
            standout sessions with your team.
          </p>
          <div className="mt-8">
            <Button
              nativeButton={false}
              render={<Link href="/schedule" />}
              size="lg"
            >
              View the schedule
            </Button>
          </div>
        </div>

        <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary/90">
                Watch last year&apos;s talks
              </p>
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Open playlist
                <ChevronRight className="size-4" />
              </a>
            </div>

            <div className="overflow-hidden rounded-xl bg-muted/30">
              {activeVideo ? (
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1&color=white&list=${PLAYLIST_ID}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="aspect-video w-full"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center text-sm text-muted-foreground">
                  Loading video…
                </div>
              )}
            </div>

            {activeVideo?.title && (
              <p className="text-sm font-medium text-foreground">
                {activeVideo.title}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}