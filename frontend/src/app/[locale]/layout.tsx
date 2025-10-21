import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import Header from "@/components/layout/header/Header";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import clsx from "clsx";
import ProgressBarProvider from "@/components/other/ProgressBarProvider";
import { Open_Sans, Fira_Code } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

type LocaleLayoutProps = {
  children: React.ReactNode,
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={clsx("antialiased min-h-svh flex flex-col bg-black", openSans.variable, firaCode.variable)}>
        <NextIntlClientProvider>
          <ProgressBarProvider>
            <div className="min-w-[20rem] max-w-[120rem] mx-auto w-full font-open-sans">
              <Header locale={locale} />
              {children}
            </div>
          </ProgressBarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
