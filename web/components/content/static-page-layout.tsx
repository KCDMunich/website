import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/page-hero";
import { SiteLogo } from "@/components/layout/site-logo";
import { SiteLayout } from "@/components/layout/site-layout";
import { StaticPageContent } from "@/components/content/static-page";
import { getStaticPageBySlug } from "@/lib/markdown";

type StaticMarkdownPageProps = {
  showLegacyLogo?: boolean;
  slug: string;
};

export function StaticMarkdownPage({ showLegacyLogo = false, slug }: StaticMarkdownPageProps) {
  const page = getStaticPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <SiteLayout>
      <PageHero title={page.title} />
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {showLegacyLogo ? (
          <div className="mb-10 border-b border-primary/10 pb-8">
            <SiteLogo variant="legacy" />
          </div>
        ) : null}
        <StaticPageContent content={page.content} />
      </section>
    </SiteLayout>
  );
}
