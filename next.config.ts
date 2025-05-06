import type { NextConfig } from "next";


const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx", "ts", "jsx"],
});


const nextConfig: NextConfig = {
  /* config options here */
};



