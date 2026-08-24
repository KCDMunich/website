import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata';
import { siteState } from '@/lib/site-state';

export const metadata: Metadata = createMetadata({
  title: siteState.event.isLive ? 'Live Schedule' : siteState.program.scheduleTitle,
  description: siteState.program.scheduleDescription,
  pathname: '/app/schedule',
  noIndex: siteState.program.noIndex,
});

export default function ScheduleAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
