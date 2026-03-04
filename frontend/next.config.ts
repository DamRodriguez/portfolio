import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isGithub = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithub ? "/portfolio" : "",
  assetPrefix: isGithub ? "/portfolio/" : "",
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
