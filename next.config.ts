import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
      },
      {
        protocol: 'https',
        hostname: 'qr.sepay.vn',
      },
    ],
  },
};

export default nextConfig;
