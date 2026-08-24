import type { MetadataRoute } from 'next';

import { getStaticPageSlugs } from '@/lib/markdown';
import { absoluteUrl, SITE_CONFIG } from '@/lib/metadata';
import { getScheduleEvents, getFullSpeakers } from '@/lib/schedule-session';
import { getSessionPath } from '@/lib/schedule-session';
import { getSpeakerPath } from '@/lib/speaker-page';
import { siteState } from '@/lib/site-state';

const STATIC_ROUTES = [
  '/',
  ...(siteState.navigation.showSchedule ? ['/schedule'] : []),
  ...(siteState.navigation.showSpeakers ? ['/speakers'] : []),
  '/team',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route === '/' ? '/' : `${route}/`}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const markdownEntries: MetadataRoute.Sitemap = getStaticPageSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}/`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  if (siteState.program.noIndex) {
    return [...staticEntries, ...markdownEntries];
  }

  try {
    const [sessions, speakers] = await Promise.all([getScheduleEvents(), getFullSpeakers()]);
    const sessionEntries: MetadataRoute.Sitemap = sessions.map((session) => ({
      url: absoluteUrl(getSessionPath(session)),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    }));
    const speakerEntries: MetadataRoute.Sitemap = speakers.map((speaker) => ({
      url: absoluteUrl(getSpeakerPath(speaker)),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    }));

    return [...staticEntries, ...markdownEntries, ...sessionEntries, ...speakerEntries];
  } catch (error) {
    console.error('Could not add archive detail routes to sitemap.', error);
    return [...staticEntries, ...markdownEntries];
  }
}
