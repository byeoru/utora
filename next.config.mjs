/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true,
    instrumentationHook: true,
    scrollRestoration: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
