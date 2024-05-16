/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true,
    // instrumentationHook: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
