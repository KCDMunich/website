import type { Metadata } from "next";

import { StaticMarkdownPage } from "@/components/content/static-page-layout";
import { createMetadata } from "@/lib/metadata";
import { getStaticPageBySlug } from "@/lib/markdown";

const SLUG = "imprint-data-privacy";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug(SLUG);
  return createMetadata({
    title: page?.title ?? "Imprint",
    pathname: `/${SLUG}`,
  });
}

export default function ImprintDataPrivacyPage() {
  return <StaticMarkdownPage slug={SLUG} />;
}