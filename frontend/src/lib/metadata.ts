import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

type CreateMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: CreateMetadataProps = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  return {
    title: title ?? {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },

    description,
    keywords: siteConfig.keywords,

    authors: [
      {
        name: siteConfig.creator.name,
        url: siteConfig.creator.url,
      },
    ],

    creator: siteConfig.creator.name,
    publisher: siteConfig.name,

    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: url,
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
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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
