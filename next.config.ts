import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {}
        }
      ]
    })
    return config;
  }
};

// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});
module.exports = withMDX({
  pageExtensions: ['tsx', 'mdx', 'ts', 'jsx']
});


export default nextConfig;
