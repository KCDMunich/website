import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/page-hero';
import { SiteLayout } from '@/components/layout/site-layout';
import { SpeakersGrid } from '@/components/speakers/speakers-grid';
import { createMetadata } from '@/lib/metadata';
import { siteState } from '@/lib/site-state';

export const metadata: Metadata = createMetadata({
  title: siteState.program.speakerEyebrow,
  description: siteState.program.speakerDescription,
  pathname: '/speakers',
  noIndex: siteState.program.noIndex,
});

export default function SpeakersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow={siteState.program.speakerEyebrow}
        title={
          <>
            {siteState.program.speakerTitleLead}
            <br />
            <span className="text-[#0bbbef]">{siteState.program.speakerTitleAccent}</span>
          </>
        }
        description={siteState.program.speakerDescription}
      />
      <SpeakersGrid presentation={siteState.program} />
    </SiteLayout>
  );
}
