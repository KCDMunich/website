export type SponsorTier =
  | "platinum"
  | "gold"
  | "silver"
  | "bronze"
  | "evening"
  | "partner"
  | "organizer"

export interface Sponsor {
  name: string
  icon: string
  url: string
  tier: SponsorTier
  logoRatio?: number
  logoHeight?: number
  logoMaxWidth?: number
}

export const SPONSOR_CONTACT_EMAIL = "team@cloudnativesummit.de"

export const SPONSOR_PROSPECTUS_URL =
  "https://docs.google.com/presentation/d/1QVKEiKgR_Q-grdpZ7QR85-xlvoydq3P6ijvpvKF4KmY/edit?usp=sharing"

export const tierConfig: Record<
  SponsorTier,
  {
    title: string
    badgeClass: string
    cardSize: string
  }
> = {
  platinum: {
    title: "Platinum",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    cardSize: "h-[120px] w-[250px] md:h-[100px] md:w-[200px] sm:h-[100px] sm:w-[220px]",
  },
  gold: {
    title: "Gold",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    cardSize: "h-[120px] w-[250px] md:h-[100px] md:w-[200px] sm:h-[100px] sm:w-[200px]",
  },
  silver: {
    title: "Silver",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    cardSize: "h-[120px] w-[300px] md:h-[100px] md:w-[200px] sm:h-[100px] sm:w-[260px]",
  },
  bronze: {
    title: "Bronze",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
    cardSize: "h-[120px] w-[250px] md:h-[80px] md:w-[160px] sm:h-[80px] sm:w-[160px]",
  },
  evening: {
    title: "Evening Event",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-200",
    cardSize: "h-[120px] w-[250px] md:h-[90px] md:w-[180px] sm:h-[90px] sm:w-[190px]",
  },
  partner: {
    title: "Community & Media Partners",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    cardSize: "h-[90px] w-[250px] md:h-[80px] md:w-[160px] sm:h-[90px] sm:w-[133px]",
  },
  organizer: {
    title: "Organizers",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
    cardSize: "h-[120px] w-[250px] md:h-[80px] md:w-[160px] sm:h-[80px] sm:w-[160px]",
  },
}

const LOGO_BASE: Record<
  SponsorTier,
  { height: number; maxWidth: number }
> = {
  platinum: { height: 90, maxWidth: 220 },
  gold: { height: 80, maxWidth: 200 },
  silver: { height: 85, maxWidth: 210 },
  bronze: { height: 70, maxWidth: 180 },
  evening: { height: 75, maxWidth: 190 },
  partner: { height: 80, maxWidth: 200 },
  organizer: { height: 80, maxWidth: 200 },
}

export function getLogoSize(sponsor: Sponsor) {
  const ratio = sponsor.logoRatio || 2
  const base = LOGO_BASE[sponsor.tier] || LOGO_BASE.gold
  const height = sponsor.logoHeight || base.height
  const maxWidth = sponsor.logoMaxWidth || base.maxWidth
  const width = Math.min(Math.round(height * ratio), maxWidth)
  return { width, height }
}

export const sponsorsList = [
  {
    name: "APE Factory",
    icon: "/icons-src/apefactory.svg",
    url: "https://www.apefactory.com/de",
    tier: "gold",
    logoRatio: 1,
  },
  {
    name: "Broadcom",
    icon: "/icons-src/broadcom.png",
    url: "https://www.broadcom.com/",
    tier: "platinum",
    logoRatio: 2,
    logoHeight: 95,
    logoMaxWidth: 160,
  },
  {
    name: "chainguard",
    icon: "/icons-src/chainguard.svg",
    url: "https://www.chainguard.dev/",
    tier: "silver",
    logoRatio: 3.5,
  },
  {
    name: "Dash0",
    icon: "/icons-src/dash0.png",
    url: "https://www.dash0.com/",
    tier: "gold",
    logoRatio: 5.26,
  },
  {
    name: "PerfectScale",
    icon: "/icons-src/PerfectScale.png",
    url: "https://www.perfectscale.io/",
    tier: "gold",
    logoRatio: 4,
    logoHeight: 100,
    logoMaxWidth: 260,
  },
  {
    name: "e.solutions GmbH",
    icon: "/icons-src/e-solutions.png",
    url: "https://www.esolutions.de/",
    tier: "silver",
    logoRatio: 5.26,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: "Eon",
    icon: "/icons-src/eon.jpg",
    url: "https://www.eon.com/en/about-us/careers/our-companies/digital-technology.html",
    tier: "gold",
    logoRatio: 1.9,
  },
  {
    name: "Eon",
    icon: "/icons-src/eon.jpg",
    url: "https://www.eon.com/en/about-us/careers/our-companies/digital-technology.html",
    tier: "partner",
    logoRatio: 1.9,
  },
  {
    name: "GermanTechJobs",
    icon: "/icons-src/germantech.svg",
    url: "https://germantechjobs.de/",
    tier: "partner",
    logoRatio: 1.6,
  },
  {
    name: "Grafana Labs",
    icon: "/icons-src/grafana-header-logo.svg",
    url: "https://grafana.com/",
    tier: "silver",
    logoRatio: 6.13,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: "IT-Schulungen",
    icon: "/icons-src/it_Schulungen.png",
    url: "https://www.it-schulungen.com/",
    tier: "partner",
    logoRatio: 4,
  },
  {
    name: "kube Events",
    icon: "/icons-src/kubeevents_logo.svg",
    url: "https://kube.events/",
    tier: "partner",
    logoRatio: 3,
  },
  {
    name: "learncube.com",
    icon: "/icons-src/learncube.webp",
    url: "https://learncube.com/",
    tier: "partner",
    logoRatio: 5,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: "Liquid Reply",
    icon: "/icons-src/liquid.png",
    url: "https://www.reply.com/liquid-reply/en/",
    tier: "organizer",
    logoRatio: 2.3,
  },
  {
    name: "Nutanix",
    icon: "/icons-src/NutanixLogo.svg",
    url: "https://www.nutanix.com/",
    tier: "platinum",
    logoRatio: 7.77,
  },
  {
    name: "Steadforce",
    icon: "/icons-src/steadforce_logo.png",
    url: "https://www.steadforce.com/",
    tier: "silver",
    logoRatio: 8.93,
    logoHeight: 95,
    logoMaxWidth: 260,
  },
  {
    name: "tsc labs",
    icon: "/icons-src/tsclabs-dark-large.webp",
    url: "https://www.tsc-labs.eu/",
    tier: "partner",
    logoRatio: 2.11,
  },
  {
    name: "white duck GmbH",
    icon: "/icons-src/whiteduck.png",
    url: "https://www.whiteduck.de/",
    tier: "organizer",
    logoRatio: 3.75,
  },
  {
    name: "Metalstack",
    icon: "/icons-src/metalstack.svg",
    url: "https://metalstack.cloud/",
    tier: "gold",
    logoRatio: 3.54,
  },
]
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) as Sponsor[]

export const TIER_ORDER: SponsorTier[] = [
  "platinum",
  "gold",
  "silver",
  "bronze",
  "evening",
  "partner",
  "organizer",
]