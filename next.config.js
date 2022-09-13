/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: {
        allowFutureImage: true
    }
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'blush.design', 'tokens.buildspace.so', 'ipfs.io'],
  }
}

module.exports = nextConfig
