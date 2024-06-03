/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    ppr: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/dubinc/oss-gallery",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
