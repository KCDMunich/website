import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "CNS Munich",
  title: "Cloud Native Summit Munich",
  shortTitle: "CNS Munich",
  description:
    "Experience the power of community at the Cloud Native Summit Munich!",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.GATSBY_DEFAULT_SITE_URL ||
    "https://cloudnativesummit.de",
  image: "/images/social-preview.jpg",
  locale: "en",
  twitterHandle: "@cnsmunich",
  keywords: [
    "Cloud Native",
    "Kubernetes",
    "Munich",
    "Conference",
    "DevOps",
    "CNCF",
    "Summit",
  ],
} as const;

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = ""): string {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  pathname = "/",
  image = SITE_CONFIG.image,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.shortTitle}`
    : SITE_CONFIG.title;
  const pageDescription = description || SITE_CONFIG.description;
  const canonical = absoluteUrl(pathname);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...SITE_CONFIG.keywords],
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: canonical,
      siteName: SITE_CONFIG.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const rootMetadata = createMetadata();