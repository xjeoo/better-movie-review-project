import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/a/**')],
  },
}
