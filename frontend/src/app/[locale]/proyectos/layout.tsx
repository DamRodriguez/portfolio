import ProjectsHeader from "@/components/layout/header/projects/ProjectsHeader";
import { routes } from "@/constants/routes";
import { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import { getValidatedLocale } from "@/utils/getValidatedLocale";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Proyectos",
  description: "Todos los proyectos de Damián Rodriguez",
  path: routes.allProjects,
});

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
