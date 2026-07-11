import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ScheduleLoading } from '@/components/schedule/schedule-loading';
import { ScheduleView } from '@/components/schedule/schedule-view';
import { SiteLayout } from '@/components/layout/site-layout';
import { createMetadata } from '@/lib/metadata';
import { siteState } from '@/lib/site-state';

export const metadata: Metadata = createMetadata({
  title: siteState.program.scheduleTitle,
  description: siteState.program.scheduleDescription,
  pathname: '/schedule',
  noIndex: siteState.program.noIndex,
});

export default function SchedulePage() {
  return (
    <SiteLayout>
      <Suspense fallback={<ScheduleLoading />}>
        <ScheduleView presentation={siteState.program} variant="default" />
      </Suspense>
    </SiteLayout>
  );
}
