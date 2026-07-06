import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { SiteLayout } from '@/components/layout/site-layout';
import { ScheduleSessionPage } from '@/components/schedule/schedule-session-page';
import { createMetadata } from '@/lib/metadata';
import {
  findScheduleEventById,
  getPublicSessionPath,
  getSessionIdFromSlug,
  getSessionSlug,
  getSpeakersForSessionId,
} from '@/lib/schedule-session';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sessionId = getSessionIdFromSlug(slug);
  const event = await findScheduleEventById(sessionId);

  if (!event) {
    return createMetadata({
      title: 'Session | CNS Munich Schedule',
      description: 'Session details for Cloud Native Summit Munich.',
      pathname: `/schedule/session/${slug}`,
    });
  }

  const canonicalPath = getPublicSessionPath(event);
  const description =
    event.description?.replace(/\s+/g, ' ').trim().slice(0, 160) ||
    'Session details for Cloud Native Summit Munich.';

  return createMetadata({
    title: `${event.title} | CNS Munich Schedule`,
    description,
    pathname: canonicalPath,
  });
}

export default async function ScheduleSessionRoute({ params }: PageProps) {
  const { slug } = await params;
  const sessionId = getSessionIdFromSlug(slug);
  const event = await findScheduleEventById(sessionId);

  if (event) {
    const canonicalSlug = getSessionSlug(event.title, event.id);
    if (slug !== canonicalSlug) {
      redirect(`/schedule/session/${canonicalSlug}`);
    }
  }

  const speakers = event ? await getSpeakersForSessionId(sessionId) : [];

  return (
    <SiteLayout>
      <ScheduleSessionPage
        sessionId={sessionId}
        backHref="/schedule"
        initialEvent={event}
        initialSpeakers={speakers}
      />
    </SiteLayout>
  );
}