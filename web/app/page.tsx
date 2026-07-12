import { About } from '@/components/home/about';
import { EventMoments } from '@/components/home/event-moments';
import { Expect } from '@/components/home/expect';
import { Hero } from '@/components/home/hero';
import { Hotels } from '@/components/home/hotels';
import { ScheduleTeaser } from '@/components/home/schedule-teaser';
import { SpeakersTeaser } from '@/components/home/speakers-teaser';
import { Sponsors } from '@/components/home/sponsors';
import { Ticketing } from '@/components/home/ticketing';
import { Venue } from '@/components/home/venue';
import { SiteLayout } from '@/components/layout/site-layout';
import { alternatingSectionTone, type SectionTone } from '@/lib/section-backgrounds';
import { siteState } from '@/lib/site-state';
import type { HomepageSectionId } from '@/lib/site-state-types';

function renderHomepageSection(section: HomepageSectionId, tone: SectionTone) {
  switch (section) {
    case 'about':
      return (
        <About
          key={section}
          recap={siteState.event.isRecap}
          tone={tone}
        />
      );
    case 'moments':
      return <EventMoments key={section} tone={tone} />;
    case 'expect':
      return <Expect key={section} tone={tone} />;
    case 'ticketing':
      return <Ticketing key={section} phase={siteState.ticketing.mode} tone={tone} />;
    case 'speakers':
      return <SpeakersTeaser key={section} presentation={siteState.program} tone={tone} />;
    case 'schedule':
      return <ScheduleTeaser key={section} presentation={siteState.program} tone={tone} />;
    case 'sponsors':
      return <Sponsors key={section} phase={siteState.sponsorship.phase} tone={tone} />;
    case 'venue':
      return <Venue key={section} archive={siteState.event.isRecap} tone={tone} />;
    case 'hotels':
      return <Hotels key={section} tone={tone} />;
    default: {
      const exhaustive: never = section;
      throw new Error(`Unhandled homepage section: ${exhaustive}`);
    }
  }
}

export default function Home() {
  return (
    <SiteLayout homepage>
      <Hero presentation={siteState.hero} />
      {siteState.homepage.sections.map((section, index) =>
        renderHomepageSection(section, alternatingSectionTone(index))
      )}
    </SiteLayout>
  );
}
