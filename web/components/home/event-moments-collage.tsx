"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  COLLAGE_PLACEMENTS,
  GALLERY_2026_URL,
  pickRandomGalleryImages,
  type GalleryImage,
} from "@/lib/event-gallery";
import { cn } from "@/lib/utils";

type EventMomentsCollageProps = {
  pool: GalleryImage[];
};

export function EventMomentsCollage({ pool }: EventMomentsCollageProps) {
  const [images, setImages] = useState<GalleryImage[] | null>(null);

  useEffect(() => {
    setImages(pickRandomGalleryImages(pool, COLLAGE_PLACEMENTS.length));
  }, [pool]);

  const isLoading = images === null;
  const slots = isLoading
    ? Array.from({ length: COLLAGE_PLACEMENTS.length }, (_, index) => ({
        key: `placeholder-${index}`,
        image: null,
      }))
    : images.map((image) => ({ key: image.src, image }));

  return (
    <>
      {/* Mobile: horizontal scroll strip */}
      <div className="mt-12 flex gap-4 overflow-x-auto px-1 pb-2 scrollbar-hidden sm:gap-5 lg:hidden">
        {slots.map(({ key, image }, index) => (
          <a
            key={key}
            href={GALLERY_2026_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={isLoading || undefined}
            tabIndex={isLoading ? -1 : undefined}
            className={cn(
              "relative shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl bg-muted shadow-lg ring-4 ring-white",
              "h-52 w-40 sm:h-60 sm:w-48",
              index % 2 === 0 ? "-rotate-2" : "rotate-2",
              isLoading && "pointer-events-none animate-pulse"
            )}
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                quality={75}
                className="object-cover"
                sizes="(max-width: 640px) 160px, 192px"
              />
            ) : null}
          </a>
        ))}
      </div>

      {/* Desktop: mood-board scaled to layout width (no full-bleed overflow) */}
      <div className="relative mx-auto mt-14 hidden aspect-[1200/540] w-full max-w-5xl lg:block xl:max-w-6xl 2xl:max-w-7xl">
        {slots.map(({ key, image }, index) => {
          const placement = COLLAGE_PLACEMENTS[index];
          if (!placement) return null;

          return (
            <a
              key={key}
              href={GALLERY_2026_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={isLoading || undefined}
              tabIndex={isLoading ? -1 : undefined}
              className={cn(
                "absolute cursor-pointer transition-[z-index] duration-300 hover:z-20",
                isLoading && "pointer-events-none"
              )}
              style={{
                top: placement.top,
                left: placement.left,
                width: placement.width,
                zIndex: placement.zIndex,
              }}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(0,66,88,0.25)] ring-4 ring-white transition-transform duration-300 hover:scale-[1.03]",
                  isLoading && "animate-pulse"
                )}
                style={{ transform: `rotate(${placement.rotate}deg)` }}
              >
                <div
                  className="relative w-full bg-muted"
                  style={{ aspectRatio: placement.aspect }}
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      quality={75}
                      className="object-cover"
                      sizes="(min-width: 1280px) 20vw, 16vw"
                    />
                  ) : null}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}