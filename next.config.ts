import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "172.27.208.1"],
  async redirects() {
    return [
      {
        source: "/brand",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
