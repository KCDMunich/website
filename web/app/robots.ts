import type { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
