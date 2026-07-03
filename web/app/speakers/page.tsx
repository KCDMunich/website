import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { SiteLayout } from "@/components/layout/site-layout";
import { SpeakersGrid } from "@/components/speakers/speakers-grid";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Speakers",
  description:
    "Meet our speakers and learn from practitioners across cloud native, platform engineering, and open source at Cloud Native Summit Munich.",
  pathname: "/speakers",
});

export default function SpeakersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Speakers"
        title={
          <>
            Meet our
            <br />
            <span className="text-[#0bbbef]">speakers</span>
          </>
        }
        description="Practitioners and experts from the cloud native community — browse the full lineup and session topics."
      />
      <SpeakersGrid />
    </SiteLayout>
  );
}