import Image from "next/image";
import Link from "next/link";

import { LINKS, MENUS } from "@/lib/constants";

import { BlueskyIcon, DiscordIcon } from "./icons";
import { SiteLogo } from "./site-logo";

const SOCIAL_LINKS = [
  {
    label: "Google Maps",
    href: LINKS.googlemaps.to,
    iconSrc: "/icons-src/google-maps-icon.inline.svg",
    className: "h-4 w-4",
  },
  {
    label: "LinkedIn",
    href: LINKS.linkedin.to,
    iconSrc: "/icons-src/linkedin-logo.inline.svg",
    className: "h-5 w-5",
  },
  {
    label: "X",
    href: LINKS.twitter.to,
    iconSrc: "/icons-src/twitter-logo.inline.svg",
    className: "h-5 w-5",
  },
  {
    label: "YouTube",
    href: LINKS.youtube.to,
    iconSrc: "/icons-src/youtube.inline.svg",
    className: "h-7 w-5",
  },
  {
    label: "Discord",
    href: LINKS.discord.to,
    icon: DiscordIcon,
    className: "h-5 w-5",
  },
  {
    label: "Bluesky",
    href: LINKS.bluesky.to,
    icon: BlueskyIcon,
    className: "h-5 w-5",
  },
] as const;

export function SiteFooter() {
  return (
    <footer
      id="sponsors"
      className="mt-auto border-t border-border bg-background"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-8 sm:flex-row sm:items-start sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <SiteLogo size="sm" />
        </Link>

        <nav aria-label="Footer">
          <ul className="grid min-w-fit grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {MENUS.footer.map((item) => (
              <li key={item.text}>
                {item.external ? (
                  <a
                    href={item.to}
                    target={item.target ?? "_blank"}
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link
                    href={item.to}
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-4 sm:items-end">
          <a
            href="mailto:team@cloudnativesummit.de"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Contact us
          </a>

          <ul className="flex items-center gap-2">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex size-9 items-center justify-center rounded-lg text-primary transition-colors hover:bg-muted hover:text-primary/80"
                >
                  {"iconSrc" in item ? (
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={20}
                      height={20}
                      className={item.className}
                    />
                  ) : (
                    <item.icon className={item.className} />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}