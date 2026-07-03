import type { Metadata } from "next";

import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "CNS Munich - Event Schedule for June 29th and 30th, 2026",
  description:
    "Explore the detailed agenda for CNS Munich in Munich on June 29th and 30th, 2026. Listen to expert talks, and connect with Kubernetes and Cloud Native professionals. Plan your day now!",
  pathname: "/app/schedule",
});

export default function ScheduleAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-background">{children}</div>;
}