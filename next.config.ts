import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
