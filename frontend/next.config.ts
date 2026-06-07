import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev/HMR when opening the app via your LAN IP (not just localhost).
  allowedDevOrigins: [
    "192.168.1.103",
    "192.168.1.103:3000",
    "http://192.168.1.103:3000",
  ],
};

export default nextConfig;
