import { ArrowRight } from "lucide-react";

import { EventMomentsCollage } from "@/components/home/event-moments-collage";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { fetchGallery2026Pool, GALLERY_2026_URL } from "@/lib/event-gallery";
import {
  SECTION_TONE_CLASS,
  type SectionTone,
} from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

type EventMomentsProps = {
  tone?: SectionTone;
};

export async function EventMoments({ tone = "default" }: EventMomentsProps) {
  const pool = await fetchGallery2026Pool();

  return (
    <Section className={cn("overflow-hidden", SECTION_TONE_CLASS[tone])}>
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

      <EventMomentsCollage pool={pool} />
    </Section>
  );
}