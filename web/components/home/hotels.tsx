import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

interface Hotel {
  name: string;
  distance?: string;
  amenities?: string[];
  imageUrl?: string;
  websiteUrl: string;
}

const hotels: Hotel[] = [
  {
    name: "Best Western Hotel Arabellapark München",
    distance: "2 min walk",
    amenities: ["Restaurant"],
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/319612311.jpg?k=c1a8b2e40962f6b49546a1295f4b9a5fd0d3350aa33d1da269de6cdcb6e86acd&o=&hp=1",
    websiteUrl: "https://hotel-arabellapark.de/",
  },
  {
    name: "Four Points by Sheraton Munich Arabellapark",
    amenities: ["Fitnessraum", "WLAN", "Frühstück"],
    websiteUrl:
      "https://www.marriott.com/en-us/hotels/mucap-four-points-munich-arabellapark/overview/",
  },
  {
    name: "The Westin Grand Munich",
    websiteUrl:
      "https://www.marriott.com/en-us/hotels/mucwi-the-westin-grand-munich/overview/",
  },
];

type HotelsProps = {
  tone?: SectionTone;
};

export function Hotels({ tone = "default" }: HotelsProps) {
  const [highlightedHotel, ...otherHotels] = hotels;

  return (
    <Section id="hotels" className={cn(SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Hotels close to,
            <br />
            <span className="text-[#0bbbef]">the venue</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Walking distance from smartvillage Bogenhausen — practical options
            around Munich Arabellapark.
          </p>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.08}>
        <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-primary/10 shadow-md">
          {highlightedHotel.imageUrl ? (
            <div className="relative aspect-[21/9] w-full sm:aspect-[2.4/1]">
              <Image
                src={highlightedHotel.imageUrl}
                alt={highlightedHotel.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          ) : null}
          <div className="bg-gradient-to-br from-primary/8 to-primary/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary sm:text-2xl">
                  {highlightedHotel.name}
                </h3>
                {highlightedHotel.distance ? (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground sm:text-base">
                    <MapPin className="size-4 text-[#0bbbef]" />
                    {highlightedHotel.distance}
                  </p>
                ) : null}
                {highlightedHotel.amenities &&
                highlightedHotel.amenities.length > 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {highlightedHotel.amenities.join(" · ")}
                  </p>
                ) : null}
              </div>
              <Button
                nativeButton={false}
                render={
                  <a
                    href={highlightedHotel.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                size="lg"
                className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Visit website
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </MotionReveal>

      {otherHotels.length > 0 ? (
        <div className="mt-8 space-y-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/70 sm:text-left">
            More hotels nearby
          </p>
          {otherHotels.map((hotel, index) => (
            <MotionReveal key={hotel.name} delay={0.12 + index * 0.04}>
              <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-primary/8 to-primary/[0.03] p-5 ring-1 ring-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h4 className="font-heading text-lg font-bold text-primary">
                    {hotel.name}
                  </h4>
                  {hotel.amenities && hotel.amenities.length > 0 ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {hotel.amenities.join(" · ")}
                    </p>
                  ) : null}
                </div>
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={hotel.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-primary/20 text-primary hover:bg-primary/5"
                >
                  Visit website
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </MotionReveal>
          ))}
        </div>
      ) : null}

      <MotionReveal delay={0.2}>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Back to{" "}
          <Link
            href="#venue"
            className="cursor-pointer font-semibold text-primary transition-colors hover:text-primary/80"
          >
            venue information
          </Link>
        </p>
      </MotionReveal>
    </Section>
  );
}