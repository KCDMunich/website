import { About } from "@/components/home/about";
import { Expect } from "@/components/home/expect";
import { Hero } from "@/components/home/hero";
import { Hotels } from "@/components/home/hotels";
import { ScheduleTeaser } from "@/components/home/schedule-teaser";
import { SpeakersTeaser } from "@/components/home/speakers-teaser";
import { Sponsors } from "@/components/home/sponsors";
import { Ticketing } from "@/components/home/ticketing";
import { Venue } from "@/components/home/venue";
import { SiteLayout } from "@/components/layout/site-layout";

export default function Home() {
  return (
    <SiteLayout homepage>
      <Hero />
      <About />
      <Expect />
      <Ticketing />
      <SpeakersTeaser />
      <ScheduleTeaser />
      <Sponsors />
      <Venue />
      <Hotels />
    </SiteLayout>
  );
}