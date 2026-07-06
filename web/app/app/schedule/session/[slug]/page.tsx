import { redirect } from 'next/navigation';

import { ScheduleSessionPage } from '@/components/schedule/schedule-session-page';
import {
  findScheduleEventById,
  getPublicSessionPath,
  getSessionIdFromSlug,
  getSessionPath,
  getSessionSlug,
} from '@/lib/schedule-session';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ScheduleAppSessionRoute({ params }: PageProps) {
  const { slug } = await params;
  const sessionId = getSessionIdFromSlug(slug);
  const event = await findScheduleEventById(sessionId);

  if (event) {
    const canonicalSlug = getSessionSlug(event.title, event.id);
    if (slug !== canonicalSlug) {
      redirect(getSessionPath(event, { app: true }));
    }
  }

  return (
    <ScheduleSessionPage sessionId={sessionId} backHref="/app/schedule" />
  );
}