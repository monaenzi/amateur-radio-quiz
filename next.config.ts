import type { NextConfig } from 'next'
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  clientsClaim: true,
  cacheOnFrontEndNav: false,
})

const nextConfig: NextConfig = {
  turbopack: {},
}

export default withPWA(nextConfig)
