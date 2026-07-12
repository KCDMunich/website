import type { Metadata } from "next";
import localFont from "next/font/local";

import { TooltipProvider } from "@/components/ui/tooltip";
import { rootMetadata } from "@/lib/metadata";

import "./globals.css";

const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/plus-jakarta-sans-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/plus-jakarta-sans-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/plus-jakarta-sans-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/plus-jakarta-sans-italic-600.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
