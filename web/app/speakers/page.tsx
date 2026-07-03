import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { SiteLayout } from "@/components/layout/site-layout";
import { SpeakersGrid } from "@/components/speakers/speakers-grid";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Speaker Lineup",
  description:
    "Meet our fantastic speakers and learn from their experience at Cloud Native Summit Munich.",
  pathname: "/speakers",
});

export default function SpeakersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Speakers"
        title="Speaker Lineup"
        description="Meet our fantastic speakers and learn from their experience."
      />
      <SpeakersGrid />
    </SiteLayout>
  );
}