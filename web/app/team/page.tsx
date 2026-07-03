import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { SiteLayout } from "@/components/layout/site-layout";
import { TeamMembers } from "@/components/team/team-members";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description: "Experience the power of community at the CNS Munich!",
  pathname: "/team",
});

export default function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Team"
        title="Team"
        description="The Cloud Native Summit Munich is organized by a dedicated committee who are passionate about bringing people together and fostering a sense of community. Our goal is to provide a platform for like-minded individuals from all levels and backgrounds that is dedicated to learning, growth, and diversity."
      />
      <TeamMembers />
    </SiteLayout>
  );
}