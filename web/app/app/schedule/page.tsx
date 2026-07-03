import { Suspense } from "react";

import { ScheduleLoading } from "@/components/schedule/schedule-loading";
import { ScheduleView } from "@/components/schedule/schedule-view";

export default function ScheduleAppPage() {
  return (
    <Suspense fallback={<ScheduleLoading />}>
      <ScheduleView variant="app" />
    </Suspense>
  );
}