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
import { SHOW_TICKETING_SECTION } from "@/lib/constants";

export default function Home() {
  return (
    <SiteLayout homepage>
      <Hero />
      <About />
      <EventMoments />
      <Expect />
      {SHOW_TICKETING_SECTION ? <Ticketing /> : null}
      <SpeakersTeaser />
      <ScheduleTeaser />
      <Sponsors />
      <Venue />
      <Hotels />
    </SiteLayout>
  );
}