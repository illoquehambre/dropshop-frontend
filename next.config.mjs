/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { appDir: true },
    async rewrites() {
      return [
        {
          source: '/:path*',
          has: [{ type: 'host', value: '(?<tenant>[^\\.]+)\\.localhost' }],
          destination: '/store/:tenant/:path*',
        },
        {
          source: '/',
          has: [{ type: 'host', value: '(?<tenant>[^\\.]+)\\.localhost' }],
          destination: '/store/:tenant',
        },
      ];
    },
};

export default nextConfig;
