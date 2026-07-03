"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/layout/eyebrow";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { TeamMemberCard, TeamOrganizerCard } from "@/components/team/team-ui";
import { DISCORD_URL } from "@/lib/constants";
import { TEAM_MEMBERS, TEAM_ORGANIZERS } from "@/lib/team-data";

export function TeamMembers() {
  return (
    <>
      <Section className="bg-[#ffffff] pb-12 md:pb-16">
        <MotionReveal>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            A volunteer committee of practitioners who plan, run, and grow the
            summit — keeping it community-driven year after year.
          </p>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <MotionReveal key={member.id} delay={index * 0.04}>
              <TeamMemberCard member={member} />
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-dashed border-primary/10 bg-[#ffffff] pt-0">
        <MotionReveal>
          <div className="text-center">
            <Eyebrow className="mb-4">Organizers</Eyebrow>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Brought to you by
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Cloud Native Summit Munich is organized with support from our
              founding partners in the Munich cloud native community.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {TEAM_ORGANIZERS.map((organizer) => (
              <TeamOrganizerCard key={organizer.name} organizer={organizer} />
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <p className="mx-auto mt-10 max-w-lg text-center text-sm text-muted-foreground">
            Want to help shape the next edition?{" "}
            <Link
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-0.5 font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Join our Discord
              <ArrowUpRight className="size-3.5 text-[#0bbbef]" />
            </Link>
          </p>
        </MotionReveal>
      </Section>
    </>
  );
}