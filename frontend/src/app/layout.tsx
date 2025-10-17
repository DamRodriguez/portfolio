import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Damian Rodriguez",
  description: "Portfolio personal de Damian Rodriguez",
};

type RootLayoutProps = {
  children: React.ReactNode,
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {

  return (
    <>
      {children}
    </>
  );
}
