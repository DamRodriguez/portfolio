import { getSiteConfig, siteConfig } from "@/config/site";
import { Locale } from "@/i18n/routing";
import { ogLocales } from "@/utils/ogLocales";
import type { Metadata } from "next";

type CreateMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  locale?: string;
};

export function createMetadata({
  title,
  description = undefined,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  locale,
}: CreateMetadataProps = {}): Metadata {
  const localeToUse = (locale ?? siteConfig.defaultLocale) as Locale;
  const config = getSiteConfig(localeToUse);

  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title ? `${title} | ${config.name}` : config.title;

  return {
    title: title ?? {
      default: config.title,
      template: `%s | ${config.name}`,
    },

    applicationName: config.name,
    category: siteConfig.category,
    description: description ?? config.description,
    keywords: siteConfig.keywords,

    authors: [
      {
        name: siteConfig.creator.name,
        url: siteConfig.creator.url,
      },
    ],

    creator: siteConfig.creator.name,
    publisher: config.name,

    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: url,
      languages: {
        es: `${siteConfig.url}/es`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/${siteConfig.defaultLocale}`,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    icons: {
      icon: "/icons/favicon.ico",
      shortcut: "/icons/favicon.ico",
      apple: "/icons/favicon.ico",
    },

    openGraph: {
      title: fullTitle,
      description: description ?? config.description,
      url,
      siteName: config.name,
      locale: ogLocales[localeToUse as keyof typeof ogLocales] ?? ogLocales.es,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title ?? config.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? config.description,
      images: [image],
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
