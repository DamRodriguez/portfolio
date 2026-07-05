import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  return routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/`,
    lastModified: new Date(),
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}
