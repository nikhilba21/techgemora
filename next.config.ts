import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/rummy',
        destination: '/rummy-game-development',
        permanent: true,
      },
      {
        source: '/hire-reactjs-developers',
        destination: '/hire-react-developers',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
