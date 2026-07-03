import { About } from "@/components/home/about";
import { EventMoments } from "@/components/home/event-moments";
import { Expect } from "@/components/home/expect";
import { Hero } from "@/components/home/hero";
import { Hotels } from "@/components/home/hotels";
import { ScheduleTeaser } from "@/components/home/schedule-teaser";
import { SpeakersTeaser } from "@/components/home/speakers-teaser";
import { Sponsors } from "@/components/home/sponsors";
import { Ticketing } from "@/components/home/ticketing";
import { Venue } from "@/components/home/venue";
import { SiteLayout } from "@/components/layout/site-layout";
import { SHOW_TICKETING_SECTION, SPEAKERS_SECTION_MODE } from "@/lib/constants";
import { alternatingSectionTone } from "@/lib/section-backgrounds";

export default function Home() {
  let sectionIndex = 0;

  return (
    <SiteLayout homepage>
      <Hero />
      <About tone={alternatingSectionTone(sectionIndex++)} />
      <EventMoments tone={alternatingSectionTone(sectionIndex++)} />
      <Expect tone={alternatingSectionTone(sectionIndex++)} />
      {SHOW_TICKETING_SECTION ? (
        <Ticketing tone={alternatingSectionTone(sectionIndex++)} />
      ) : null}
      {SPEAKERS_SECTION_MODE !== "off" ? (
        <SpeakersTeaser
          mode={SPEAKERS_SECTION_MODE}
          tone={alternatingSectionTone(sectionIndex++)}
        />
      ) : null}
      <ScheduleTeaser tone={alternatingSectionTone(sectionIndex++)} />
      <Sponsors tone={alternatingSectionTone(sectionIndex++)} />
      <Venue tone={alternatingSectionTone(sectionIndex++)} />
      <Hotels tone={alternatingSectionTone(sectionIndex++)} />
    </SiteLayout>
  );
}