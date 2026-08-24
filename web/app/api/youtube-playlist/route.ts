import { NextResponse } from 'next/server';

import { EVENT_CONFIG } from '@/lib/event-config';

export async function GET() {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${EVENT_CONFIG.archive.playlistId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'YouTube playlist request failed' }, { status: 502 });
    }

    return new NextResponse(await response.text(), {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/xml; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json({ error: 'YouTube playlist request failed' }, { status: 502 });
  }
}
