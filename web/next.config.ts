import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match Vercel project setting — without this, dynamic routes 404 after slash redirect.
  trailingSlash: true,
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
        hostname: "i.ytimg.com",
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
