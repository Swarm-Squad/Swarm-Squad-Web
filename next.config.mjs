/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle next-mdx-remote so it uses the same React runtime as the app
  // (otherwise it resolves node_modules React and RSC rendering fails).
  transpilePackages: ['next-mdx-remote'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
