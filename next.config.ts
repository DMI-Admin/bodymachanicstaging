import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emits .next/standalone/server.js — a self-contained Node server that runs
  // without installing node_modules on the host. See DEPLOY.md.
  output: "standalone",
  images: {
    // Images in public/images are pre-sized WebP (see scripts/optimize-images.mjs),
    // so serve them as-is instead of spending server CPU and memory resizing
    // them on a host that caps per-process memory.
    unoptimized: true,
  },
  // On staging (NOINDEX=true), tell crawlers to skip every response — images
  // included, which the page's robots meta tag can't cover.
  async headers() {
    if (process.env.NOINDEX !== "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
