const nextConfig = {
  experimental: {
    appDir: true,
    // Use the `raw-loader` for importing `.txt` files during tests
    test: /.txt$/,
    use: 'raw-loader',
  }}
  module.exports = nextConfig
