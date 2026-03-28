import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isGithub = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithub ? "/portfolio" : "",
  assetPrefix: isGithub ? "/portfolio/" : "",
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
