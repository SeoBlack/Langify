/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  // Optimize for production
  swcMinify: true,
};

module.exports = nextConfig;
