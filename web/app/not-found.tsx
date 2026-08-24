import type { Metadata } from "next";
import Link from "next/link";

import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page Not Found",
  description: "Sorry, we couldn't find the page you're looking for",
  pathname: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-semibold uppercase text-muted-foreground">404 error</p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-6">
            <Button render={<Link href="/" />}>Go back home</Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}