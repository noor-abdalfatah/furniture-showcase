import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Serve the already-resized Pexels JPEGs as-is. Next's optimizer re-compresses them, which made them look soft.
  images: {
    unoptimized: true,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Serwist via Turbopack integration: Next 16 builds with Turbopack by default.
export default withSerwist(nextConfig);
