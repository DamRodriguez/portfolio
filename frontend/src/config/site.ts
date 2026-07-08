// Site configuration with i18n support
export const siteTranslations = {
  es: {
    name: "Damian Rodriguez",
    title: "Damian Rodriguez | Portfolio",
    description:
      "Portfolio de Damian Rodriguez, Frontend Developer especializado en React, Next.js, TypeScript y Tailwind CSS. Desarrollo aplicaciones modernas, responsivas y optimizadas para rendimiento y experiencia de usuario.",
  },
  en: {
    name: "Damian Rodriguez",
    title: "Damian Rodriguez | Portfolio",
    description:
      "Portfolio of Damian Rodriguez, Frontend Developer specialized in React, Next.js, TypeScript and Tailwind CSS. I develop modern, responsive applications optimized for performance and user experience.",
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
    "Frontend Developer",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Portfolio",
    "Portfolio Developer",
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
    "Argentina",
    "damrod",
    "Frontend Developer Argentina",
    "Frontend Developer React",
    "Frontend Developer Argentina",
    "React Developer",
    "Next.js Developer",
    "React Developer Argentina",
    "Next.js Developer Argentina",
    "Damian Rodriguez Portfolio",
    "React Developer Portfolio",
    "Frontend Engineer",
    "TypeScript Developer",
  ],
};

export function getSiteConfig(locale: string) {
  return (
    siteTranslations[locale as keyof typeof siteTranslations] ??
    siteTranslations.es
  );
}
