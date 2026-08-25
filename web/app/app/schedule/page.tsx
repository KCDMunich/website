import { Suspense } from 'react';

import { ScheduleLoading } from '@/components/schedule/schedule-loading';
import { ScheduleView } from '@/components/schedule/schedule-view';
import { siteState } from '@/lib/site-state';

export default function ScheduleAppPage() {
  return (
    <Suspense fallback={<ScheduleLoading />}>
      <ScheduleView
        isEventLive={siteState.event.isLive}
        presentation={siteState.program}
        variant="app"
      />
    </Suspense>
  );
}
