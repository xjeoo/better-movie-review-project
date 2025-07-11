import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      pathname: '/a/**',
    },
    {
      protocol: 'https',
      hostname: 'image.tmdb.org',
      pathname: '/t/p/**',
    },
  ],
}

}
