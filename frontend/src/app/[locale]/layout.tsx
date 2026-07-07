import GoogleAnalytics from "@/components/other/GoogleAnalytics";
import ThemeScript from "@/components/other/ThemeScript";
import ThemeTransitionBlocker from "@/components/other/ThemeTransitionBlocker";
import VoiceflowChat from "@/components/other/VoiceflowChat";
import Providers from "@/components/provider/Providers";
import PersonSchema from "@/components/seo/PersonSchema";
import { routing } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import "@/styles/globals.css";
import { getValidatedLocale } from "@/utils/getValidatedLocale";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import clsx from "clsx";
import { Metadata } from "next";
import { Fira_Code, Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

type RootLocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return createMetadata({
    path: `/${locale}`,
  });
}

export default async function RootLocaleLayout({
  children,
  params,
}: RootLocaleLayoutProps) {
  const locale = await getValidatedLocale(params);

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={clsx(
          "antialiased min-h-dvh flex flex-col bg-white-bone dark:bg-black",
          openSans.variable,
          firaCode.variable,
        )}
      >
        <Providers>
          <div className="min-w-[20rem] max-w-[120rem] mx-auto w-full font-open-sans overflow-clip">
            <ToastContainer />
            {children}
          </div>
          <ThemeTransitionBlocker />
          <PersonSchema />
          <GoogleAnalytics />
          <VercelAnalytics />
          <VoiceflowChat locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
