import type { NextConfig } from "next";

const scheduleStatsOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_SCHEDULE_STATS_ENDPOINT
      ? new URL(process.env.NEXT_PUBLIC_SCHEDULE_STATS_ENDPOINT).origin
      : null;
  } catch {
    return null;
  }
})();

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://sessionize.com https://cdn.sessionize.com https://photos.adobe.io https://i.ytimg.com https://img.youtube.com https://cf.bstatic.com",
  `connect-src 'self' https://sessionize.com${scheduleStatsOrigin ? ` ${scheduleStatsOrigin}` : ''}${process.env.NODE_ENV === 'development' ? ' ws:' : ''}`,
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Match Vercel project setting — without this, dynamic routes 404 after slash redirect.
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/mission-statement",
        destination: "/vision",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
        ],
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sessionize.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sessionize.com",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "**.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "photos.adobe.io",
        pathname: "/v2/spaces/**",
      },
    ],
  },
};

export default nextConfig;
