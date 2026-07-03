import type { Metadata } from "next";

import { StaticMarkdownPage } from "@/components/content/static-page-layout";
import { createMetadata } from "@/lib/metadata";
import { getStaticPageBySlug } from "@/lib/markdown";

const SLUG = "vision";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug(SLUG);
  return createMetadata({
    title: page?.title ?? "Our Vision",
    pathname: `/${SLUG}`,
  });
}

export default function VisionPage() {
  return <StaticMarkdownPage slug={SLUG} />;
}