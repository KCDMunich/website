import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { SiteLayout } from '@/components/layout/site-layout';
import { SpeakerDetailPage } from '@/components/speakers/speaker-detail-page';
import { findCompanyInfo } from '@/lib/speakers-data';
import { createMetadata } from '@/lib/metadata';
import {
  findSpeakerById,
  getPublicSpeakerPath,
  getSpeakerIdFromSlug,
  getSpeakerSlug,
} from '@/lib/speaker-page';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const speakerId = getSpeakerIdFromSlug(slug);
  const speaker = await findSpeakerById(speakerId);

  if (!speaker) {
    return createMetadata({
      title: 'Speaker | CNS Munich',
      description: 'Speaker profile for Cloud Native Summit Munich.',
      pathname: `/speakers/${slug}`,
    });
  }

  const canonicalPath = getPublicSpeakerPath(speaker);
  const company = findCompanyInfo(speaker);
  const description =
    speaker.bio?.replace(/\s+/g, ' ').trim().slice(0, 160) ||
    `${speaker.fullName}${company ? ` from ${company}` : ''} — speaker at Cloud Native Summit Munich.`;

  return createMetadata({
    title: `${speaker.fullName} | CNS Munich Speakers`,
    description,
    pathname: canonicalPath,
  });
}

export default async function SpeakerRoute({ params }: PageProps) {
  const { slug } = await params;
  const speakerId = getSpeakerIdFromSlug(slug);
  const speaker = await findSpeakerById(speakerId);

  if (speaker) {
    const canonicalSlug = getSpeakerSlug(speaker.fullName, speaker.id);
    if (slug !== canonicalSlug) {
      redirect(`/speakers/${canonicalSlug}`);
    }
  }

  return (
    <SiteLayout>
      <SpeakerDetailPage speakerId={speakerId} initialSpeaker={speaker} />
    </SiteLayout>
  );
}