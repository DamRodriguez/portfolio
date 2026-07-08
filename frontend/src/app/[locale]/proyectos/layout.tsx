import ProjectsHeader from "@/components/layout/header/projects/ProjectsHeader";
import { routes } from "@/constants/routes";
import { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import { getValidatedLocale } from "@/utils/getValidatedLocale";
import { Metadata } from "next";

const projectTitles = {
  es: "Proyectos",
  en: "Projects",
};

const projectDescriptions = {
  es: "Todos los proyectos de Damián Rodriguez",
  en: "All projects by Damian Rodriguez",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description =
    projectDescriptions[locale as keyof typeof projectDescriptions] ??
    projectDescriptions.es;

  const title =
    projectTitles[locale as keyof typeof projectTitles] ?? projectTitles.es;

  return createMetadata({
    title,
    description,
    path: routes.allProjects,
    locale,
  });
}

type ProjectsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function ProjectsLayout({
  children,
  params,
}: ProjectsLayoutProps) {
  const locale = await getValidatedLocale(params);

  return (
    <>
      <ProjectsHeader locale={locale} />
      {children}
    </>
  );
}
