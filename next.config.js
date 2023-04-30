const nextConfig = {
  experimental: {
    appDir: true,
    // Use the `raw-loader` for importing `.txt` files during tests
    test: /.txt$/,
    use: 'raw-loader',
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if your project has type errors
    ignoreBuildErrors: true,
  },
};

module.exports = {
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Merge the `nextConfig` object into the exports
  ...nextConfig,
};
