import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from "@/components/speakers/speaker-ui";
import type { TeamMember, TeamOrganizer } from "@/lib/team-data";
import { cn } from "@/lib/utils";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${member.name} on LinkedIn`}
      className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Image
        src={member.photo}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-sm font-bold leading-tight text-white sm:text-base">
              {member.name}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-xs font-medium text-[#0bbbef] sm:text-sm">
              {member.role}
            </p>
            {member.organization ? (
              <p className="mt-0.5 line-clamp-1 text-xs text-white/75">
                {member.organization}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 rounded-full bg-white/20 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <SocialIcon url={member.linkedin} isWhite />
          </div>
        </div>
      </div>
    </a>
  );
}

const ORGANIZER_CELL_SIZE = "h-[100px] w-[200px] sm:w-[240px]";

export function TeamOrganizerCard({ organizer }: { organizer: TeamOrganizer }) {
  return (
    <Link
      href={organizer.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={organizer.name}
      className={cn(
        "group flex cursor-pointer items-center justify-center rounded-2xl p-4 ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/[0.03] hover:shadow-sm",
        ORGANIZER_CELL_SIZE
      )}
    >
      <Image
        src={organizer.logo}
        alt={organizer.name}
        width={220}
        height={72}
        className="max-h-[64px] w-auto max-w-[200px] object-contain opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-[72px] sm:max-w-[220px]"
      />
    </Link>
  );
}