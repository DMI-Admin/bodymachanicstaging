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
};

export default nextConfig;
