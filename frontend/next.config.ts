import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isGithub = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithub || isProd ? "/portfolio" : "",
  assetPrefix: isGithub || isProd ? "/portfolio/" : "",
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
