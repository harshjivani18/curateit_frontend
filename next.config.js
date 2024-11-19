/** @type {import('next').NextConfig} */

// const securityHeaders = [
//   {
//     key: 'X-Frame-Options',
//     value: 'allow-from localhost *.curateit.com curateit.com'
//   },
// ]

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`

const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
  images: {
    domains: [
      new URL(process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN).hostname,
      // new URL(process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL).hostname,
      // new URL(process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN).hostname,
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ]
  },
  experimental: {
    esmExternals: false,
    webpackBuildWorker: true,
  },
  // compress: true,
  // productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false,
  reactStrictMode: false
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeader.replace(/\n/g, ''),
  //         },
  //       ],
  //     },
  //   ]
  // },

  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/(.*)',
  //       headers: securityHeaders,
  //     },
  //   ]
  // }
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = nextConfig;
