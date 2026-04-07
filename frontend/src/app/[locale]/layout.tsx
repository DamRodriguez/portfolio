import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import Header from "@/components/layout/header/Header";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import clsx from "clsx";
import ProgressBarProvider from "@/components/other/ProgressBarProvider";
import { Open_Sans, Fira_Code } from "next/font/google";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "@/components/layout/ThemeProvider";
import ThemeTransitionBlocker from "@/components/other/ThemeTransitionBlocker";
import ThemeScript from "@/components/other/ThemeScript";
import VoiceflowChat from "@/components/other/VoiceflowChat";

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
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={clsx("antialiased min-h-svh flex flex-col", openSans.variable, firaCode.variable)}>
        <NextIntlClientProvider>
          <ThemeProvider>
            <ThemeTransitionBlocker />
            <ProgressBarProvider>
              <div className="min-w-[20rem] max-w-[120rem] mx-auto w-full font-open-sans theme-transition bg-white-bone dark:bg-black">
                <Header locale={locale} />
                <ToastContainer />
                {children}
                <VoiceflowChat locale={locale} />
              </div>
            </ProgressBarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
