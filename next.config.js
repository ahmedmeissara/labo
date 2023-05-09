const nextConfig = {
  experimental: {
    appDir: true,
    // Use the `raw-loader` for importing `.txt` files during tests
    test: /.txt$/,
    use: 'raw-loader',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
