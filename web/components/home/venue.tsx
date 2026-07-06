"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Utensils,
  Users,
} from "lucide-react";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const VENUE_IMAGES = [
  "/images/venue/venue-1.jpg",
  "/images/venue/venue-2.jpg",
  "/images/venue/venue-3.jpg",
  "/images/venue/venue-4.jpg",
];

const MAPS_URL =
  "https://maps.google.com/?q=smartvillage+Bogenhausen+Rosenkavalierpl.+13+81925+Munich";

const venueFeatures = [
  {
    icon: Utensils,
    title: "Catering",
    description: "Vegetarian & vegan options throughout the event.",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: Calendar,
    title: "2-day event",
    description: "Two full days of talks, workshops, and activities.",
    accent: "from-[#0bbbef]/15 to-primary/5",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with peers in an open, welcoming atmosphere.",
    accent: "from-primary/8 to-transparent",
  },
];

function ImageSlider({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
          setFade(false);
        }, 500);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [images.length, isPaused]);

  const goToPrevious = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 500);
  };

  const goToNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 500);
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full">
        <Image
          src={images[currentImageIndex]}
          alt={`smartvillage Bogenhausen — photo ${currentImageIndex + 1}`}
          fill
          className={cn(
            "object-cover transition-opacity duration-500",
            fade ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={currentImageIndex === 0}
        />

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              className={cn(
                "size-2 cursor-pointer rounded-full transition-colors",
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              )}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-primary/70"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-primary/70"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}

type VenueProps = {
  tone?: SectionTone;
};

export function Venue({ tone = "default" }: VenueProps) {
  return (
    <Section id="venue" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Meet us at,
            <br />
            <span className="text-[#0bbbef]">smartvillage Bogenhausen</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Two focused conference days at Munich Arabellapark — easy to reach
            and built for community, talks, and hallway conversations.
          </p>
        </MotionReveal>
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <MotionReveal delay={0.08} className="lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-primary/10 shadow-md">
            <ImageSlider images={VENUE_IMAGES} />
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12} className="lg:col-span-5">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              smartvillage Bogenhausen
            </h3>
            <p className="mt-2 text-lg text-muted-foreground">
              at Munich Arabellapark
            </p>

            <div className="mt-6 flex items-start gap-3 text-muted-foreground">
              <MapPin className="mt-0.5 size-5 shrink-0 text-[#0bbbef]" />
              <div className="text-left text-sm leading-relaxed sm:text-base">
                <p>Rosenkavalierpl. 13</p>
                <p>81925 Munich, Germany</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button
                nativeButton={false}
                render={
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" />
                }
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Open in Google Maps
                <ArrowRight className="size-4" />
              </Button>
              <Button
                nativeButton={false}
                render={<a href="#hotels" />}
                variant="outline"
                size="lg"
                className="border-primary/20 text-primary hover:bg-primary/5"
              >
                Nearby hotels
              </Button>
            </div>
          </div>
        </MotionReveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {venueFeatures.map(({ icon: Icon, title, description, accent }, i) => (
          <MotionReveal key={title} delay={0.14 + i * 0.06}>
            <div
              className={cn(
                "group flex h-full flex-col rounded-2xl bg-gradient-to-br p-6 ring-1 ring-primary/10 transition-all hover:-translate-y-1 hover:shadow-md sm:p-8",
                accent
              )}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#ffffff]/80 ring-1 ring-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary">
                {title}
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}