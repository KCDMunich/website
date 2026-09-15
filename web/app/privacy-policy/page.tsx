import type { Metadata } from "next";

import { StaticMarkdownPage } from "@/components/content/static-page-layout";
import { createMetadata } from "@/lib/metadata";
import { getStaticPageBySlug } from "@/lib/markdown";

const SLUG = "privacy-policy";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug(SLUG);
  return createMetadata({
    title: page?.title ?? "Privacy Policy",
    description:
      "How Cloud Native Summit Munich processes personal data and protects the privacy of website visitors, attendees, speakers, and partners.",
    pathname: `/${SLUG}`,
  });
}

export default function PrivacyPolicyPage() {
  return <StaticMarkdownPage slug={SLUG} />;
}
