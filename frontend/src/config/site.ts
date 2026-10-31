import { Locale } from "@/i18n/routing";

export const siteTranslations = {
  es: {
    name: "Damian Rodriguez",
    title: "Damian Rodriguez | Portfolio",
    description:
      "Software Developer de Buenos Aires, Argentina. Especializado en crear experiencias digitales de alto impacto.",
  },
  en: {
    name: "Damian Rodriguez",
    title: "Damian Rodriguez | Portfolio",
    description:
      "Software Developer based in Buenos Aires, Argentina. Specialized in crafting high-impact digital experiences.",
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
