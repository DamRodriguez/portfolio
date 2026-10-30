import { Locale } from "@/i18n/routing";

export const siteTranslations = {
  es: {
    name: "Damian Rodriguez",
    title: "Damian Rodriguez | Portfolio",
    description:
      "Portfolio de Damian Rodriguez, Software Developer especializado en React, Next.js, TypeScript y Tailwind CSS. Desarrollo aplicaciones modernas, responsivas y optimizadas para rendimiento y experiencia de usuario.",
  },
  en: {
    name: "Damian Rodriguez",
    title: "Damian Rodriguez | Portfolio",
    description:
      "Portfolio of Damian Rodriguez, Software Developer specialized in React, Next.js, TypeScript and Tailwind CSS. I develop modern, responsive applications optimized for performance and user experience.",
  },
};

export const siteConfig = {
  url: "https://damrod.dev",
  ogImage: "https://damrod.dev/images/code.png",
  category: "technology",
  creator: {
    name: "Damian Rodriguez",
    url: "https://damrod.dev",
  },
  defaultLocale: "es",
  keywords: [
    "Damian Rodriguez",
    "Software Developer",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Software Developer Portfolio",
    "Portfolio Developer",
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
    "Argentina",
    "damrod",
    "Software Developer Argentina",
    "Software Developer React",
    "Software Developer Argentina",
    "React Developer",
    "Next.js Developer",
    "React Developer Argentina",
    "Next.js Developer Argentina",
    "Damian Rodriguez Portfolio",
    "React Developer Portfolio",
    "Software Engineer",
    "TypeScript Developer",
  ],
};

export function getSiteConfig(locale: Locale) {
  return (
    siteTranslations[locale as keyof typeof siteTranslations] ??
    siteTranslations.es
  );
}
