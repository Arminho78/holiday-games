import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/games/**",
        // omit `search` so cache-bust query strings (?v=mtime) are allowed
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.scratch.mit.edu",
        pathname: "/getthumbnail.jpeg",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/games/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
