import { NextResponse } from "next/server";

import {
  buildFallbackSnapshot,
  fetchFientaEventSnapshot,
  getFientaConfig,
} from "@/lib/fienta";

export async function GET() {
  const config = getFientaConfig();

  try {
    const snapshot = await fetchFientaEventSnapshot(config);

    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": config.eventId
          ? "s-maxage=300, stale-while-revalidate=3600"
          : "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        ...(config.eventId ? {} : { "X-Fienta-Configured": "false" }),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Fienta request failed";

    if (message.includes("not found") || message.includes("request failed")) {
      return NextResponse.json(buildFallbackSnapshot(config.fallbackCheckoutUrl), {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-Fienta-Configured": "false",
        },
      });
    }

    return NextResponse.json({ error: message }, { status: 502 });
  }
}