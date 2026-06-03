import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  sassOptions: {
    implementation: 'sass',
    includePaths: ['styles'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    optimizePackageImports: ['@reduxjs/toolkit', 'react-redux', 'react-window'],
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = config.optimization ?? {};
      config.optimization.moduleIds = 'deterministic';
      config.optimization.runtimeChunk = 'single';

      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20_000,
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },
          redux: {
            name: 'redux',
            test: /[\\/]node_modules[\\/](@reduxjs|react-redux|redux|redux-thunk|immer|reselect)[\\/]/,
            priority: 30,
          },
          virtualization: {
            name: 'virtualization',
            test: /[\\/]node_modules[\\/]react-window[\\/]/,
            priority: 30,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
