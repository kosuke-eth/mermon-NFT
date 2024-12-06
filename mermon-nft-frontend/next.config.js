/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // 'fs'などのサーバーサイド専用モジュールを無効にする
      path: false, // 同様に他のサーバーサイドモジュールも無効にできる
    };

    return config;
  },
};

module.exports = nextConfig;
