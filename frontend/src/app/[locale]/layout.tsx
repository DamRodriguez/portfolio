import Header from "@/components/layout/header/Header";
import ThemeProvider from "@/components/layout/ThemeProvider";
import GoogleAnalytics from "@/components/other/GoogleAnalytics";
import ProgressBarProvider from "@/components/other/ProgressBarProvider";
import ThemeScript from "@/components/other/ThemeScript";
import ThemeTransitionBlocker from "@/components/other/ThemeTransitionBlocker";
import VoiceflowChat from "@/components/other/VoiceflowChat";
import PersonSchema from "@/components/seo/PersonSchema";
import { routing } from "@/i18n/routing";
import clsx from "clsx";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Fira_Code, Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
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
      <body
        className={clsx(
          "antialiased min-h-svh flex flex-col",
          openSans.variable,
          firaCode.variable,
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider>
            <ThemeTransitionBlocker />
            <ProgressBarProvider>
              <div className="min-w-[20rem] max-w-[120rem] pt-header-mobile xl:pt-header-desktop mx-auto w-full font-open-sans bg-white-bone dark:bg-black">
                <Header locale={locale} />
                <ToastContainer />
                <PersonSchema />
                {children}
              </div>
              <GoogleAnalytics />
              <VoiceflowChat locale={locale} />
            </ProgressBarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
