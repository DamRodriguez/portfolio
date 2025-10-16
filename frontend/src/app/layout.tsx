import type { Metadata } from "next";
import "@/styles/globals.css";
import clsx from "clsx";
import ProgressBarProvider from "@/components/other/ProgressBarProvider";
import Header from "@/components/layout/header/Header";
import { Open_Sans, Fira_Code } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Portfolio - Damian Rodriguez",
  description: "Portfolio personal de Damian Rodriguez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={clsx("antialiased min-h-svh flex flex-col overflow-x-hidden bg-black", openSans.variable, firaCode.variable)}
      >
        <ProgressBarProvider>
          <div className="min-w-[20rem] max-w-[120rem] mx-auto w-full font-open-sans">
            <Header />
            {children}
          </div>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
