"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react"

import { Section, SectionTitle } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const VENUE_IMAGES = [
  "/images/venue/venue-1.jpg",
  "/images/venue/venue-2.jpg",
  "/images/venue/venue-3.jpg",
  "/images/venue/venue-4.jpg",
]

const venueFeatures = [
  {
    icon: Users,
    title: "Catering",
    description: "Vegetarian & Vegan options",
  },
  {
    icon: Calendar,
    title: "2-Day Event",
    description: "With many activities",
  },
  {
    icon: MapPin,
    title: "Networking Event",
    description: "Connect with your peers",
  },
]

function ImageSlider({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setFade(true)
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          )
          setFade(false)
        }, 500)
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [images.length, isPaused])

  const goToPrevious = () => {
    setFade(true)
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
      setFade(false)
    }, 500)
  }

  const goToNext = () => {
    setFade(true)
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
      setFade(false)
    }, 500)
  }

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full transition-all duration-500 ease-in-out">
        <Image
          src={images[currentImageIndex]}
          alt={`Venue slide ${currentImageIndex + 1}`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, 1280px"
        />

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`size-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  )
}

export function Venue() {
  return (
    <Section className="bg-background">
      <SectionTitle>Venue Information</SectionTitle>

      <div className="flex flex-col gap-8">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <ImageSlider images={VENUE_IMAGES} />
        </div>

        <Card className="border-border/60 bg-muted/20">
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
            <div>
              <h3 className="text-2xl font-bold text-primary">
                smartvillage Bogenhausen
              </h3>
              <p className="text-lg text-muted-foreground">
                at Munich Arabellapark
              </p>
            </div>

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="text-left text-sm">
                <p>Rosenkavalierpl. 13</p>
                <p>81925 Munich</p>
              </div>
            </div>

            <Button
              nativeButton={false}
              render={
                <a
                  href="https://maps.google.com/?q=smartvillage+Bogenhausen+Rosenkavalierpl.+13+81925+Munich"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Open in Google Maps
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {venueFeatures.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/60">
              <CardContent className="flex gap-4 pt-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}