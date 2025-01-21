import withPWA from 'next-pwa';
import path from 'path';

const nextPWA = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // 개발 환경에서 비활성화
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config: { cache: boolean }) => {
    config.cache = false; // Webpack 캐시 비활성화
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "_variables.scss"; @import "_mixins.scss";`,
  },
};

export default nextPWA(nextConfig);
