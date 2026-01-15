/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.placeholder.com', 'images.unsplash.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
