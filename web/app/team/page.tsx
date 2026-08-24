import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { SiteLayout } from "@/components/layout/site-layout";
import { TeamMembers } from "@/components/team/team-members";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description:
    "Meet the volunteer committee behind Cloud Native Summit Munich — practitioners who organize the community conference in Munich.",
  pathname: "/team",
});

export default function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Team"
        title={
          <>
            Meet the people
            <br />
            <span className="text-[#0bbbef]">behind the summit</span>
          </>
        }
        description="A dedicated committee of cloud native practitioners who bring the Munich community together — for learning, growth, and diversity."
      />
      <TeamMembers />
    </SiteLayout>
  );
}