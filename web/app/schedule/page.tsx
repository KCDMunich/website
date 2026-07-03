import type { Metadata } from "next";
import { Suspense } from "react";

import { ScheduleLoading } from "@/components/schedule/schedule-loading";
import { ScheduleView } from "@/components/schedule/schedule-view";
import { SiteLayout } from "@/components/layout/site-layout";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "CNS Munich - Event Schedule for June 29th and 30th, 2026",
  description:
    "Explore the detailed agenda for CNS Munich in Munich on June 29th and 30th, 2026. Listen to expert talks, and connect with Kubernetes and Cloud Native professionals. Plan your day now!",
  pathname: "/schedule",
});

export default function SchedulePage() {
  return (
    <SiteLayout>
      <Suspense fallback={<ScheduleLoading />}>
        <ScheduleView variant="default" />
      </Suspense>
    </SiteLayout>
  );
}