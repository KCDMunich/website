import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { ArrowRight } from "lucide-react";

import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  COLLAGE_PLACEMENTS,
  fetchGallery2026Pool,
  GALLERY_2026_URL,
  pickRandomGalleryImages,
} from "@/lib/event-gallery";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

type EventMomentsProps = {
  tone?: SectionTone;
};

export async function EventMoments({ tone = "default" }: EventMomentsProps) {
  noStore();
  const pool = await fetchGallery2026Pool();
  const images = pickRandomGalleryImages(pool, COLLAGE_PLACEMENTS.length);

  return (
    <Section className={cn("overflow-x-hidden", SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 flex justify-center">
          <Eyebrow>Photo gallery</Eyebrow>
        </div>
        <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
          More than just talks,
          <br />
          <span className="text-[#0bbbef]">it&apos;s the community</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Two days of sessions, workshops, and hallway conversations — captured
          at CNS Munich 2026 in smartvillage Bogenhausen.
        </p>
        <Button
          nativeButton={false}
          render={
            <a href={GALLERY_2026_URL} target="_blank" rel="noopener noreferrer" />
          }
          variant="outline"
          size="lg"
          className="mt-6 border-primary/20 text-primary hover:bg-primary/5"
        >
          View full gallery
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="mt-12 flex gap-4 overflow-x-auto px-1 pb-2 scrollbar-hidden sm:gap-5 lg:hidden">
        {images.map((image, index) => (
          <a
            key={image.src}
            href={GALLERY_2026_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white",
              "h-52 w-40 sm:h-60 sm:w-48",
              index % 2 === 0 ? "-rotate-2" : "rotate-2"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 160px, 192px"
            />
          </a>
        ))}
      </div>

      {/* Desktop: full-width organic collage — left-1/2/-translate-x-1/2 breaks out of max-w container */}
      <div className="relative left-1/2 mt-14 hidden min-h-[620px] w-screen max-w-[100vw] -translate-x-1/2 lg:block xl:min-h-[680px]">
        {images.map((image, index) => {
          const placement = COLLAGE_PLACEMENTS[index];
          if (!placement) return null;

          return (
            <a
              key={image.src}
              href={GALLERY_2026_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute cursor-pointer transition-[z-index] duration-300 hover:z-20"
              style={{
                top: placement.top,
                left: placement.left,
                width: placement.width,
                zIndex: placement.zIndex,
              }}
            >
              <div
                className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(0,66,88,0.25)] ring-4 ring-white transition-transform duration-300 hover:scale-[1.03]"
                style={{ transform: `rotate(${placement.rotate}deg)` }}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: placement.aspect }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 20vw, 16vw"
                  />
                </div>
              </div>
            </a>
          );
        })}
      </div>


    </Section>
  );
}