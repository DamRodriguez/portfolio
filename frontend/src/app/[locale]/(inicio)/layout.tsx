import HomeHeader from "@/components/layout/header/home/HomeHeader";
import BackgroundText from "@/components/other/BackgroundText";
import { getValidatedLocale } from "@/utils/getValidatedLocale";

type HomeLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function HomeLayout({
  children,
  params,
}: HomeLayoutProps) {
  const locale = await getValidatedLocale(params);
  return (
    <>
      <HomeHeader locale={locale} />
      <BackgroundText />
      {children}
    </>
  );
}
