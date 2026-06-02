import { siteConfig } from "@/config/site";

export default function sitemap() {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
