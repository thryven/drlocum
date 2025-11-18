
/**
 * @fileoverview Configuration for Next.js application.
 * This file configures the core behavior of the Next.js application, such as build options,
 * image optimization.
 */

import type { NextConfig } from 'next'
import { version } from './package.json'

/**
 * Core Next.js configuration.
 */
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote-client'],
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Enhanced security headers for stronger protection
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        ],
      },
    ]
  },
  redirects: async () => [
    {
      source: '/quick-reference',
      destination: '/',
      permanent: true,
    },
    {
      source: '/quick-reference/paediatric',
      destination: '/',
      permanent: true,
    },
  ],
}
export default nextConfig
