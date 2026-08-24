import type { MetadataRoute } from 'next';

import { getStaticPageSlugs } from '@/lib/markdown';
import { SITE_CONFIG } from '@/lib/metadata';
import { siteState } from '@/lib/site-state';

const STATIC_ROUTES = [
  '/',
  ...(siteState.navigation.showSchedule ? ['/schedule'] : []),
  ...(siteState.navigation.showSpeakers ? ['/speakers'] : []),
  '/team',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const markdownEntries: MetadataRoute.Sitemap = getStaticPageSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticEntries, ...markdownEntries];
}
