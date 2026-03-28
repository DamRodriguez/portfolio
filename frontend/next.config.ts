import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isGithub = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGithub ? "export" : undefined,
  images: {
    unoptimized: isGithub,
    formats: ['image/avif', 'image/webp'],
  },
  basePath: isGithub ? "/portfolio" : "",
  assetPrefix: isGithub ? "/portfolio/" : "",
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
