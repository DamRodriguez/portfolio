import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Damian Rodriguez",
  description: "Portfolio personal de Damian Rodriguez",
  openGraph: {
    title: "Portfolio - Damian Rodriguez",
    description: "Portfolio personal de Damian Rodriguez",
    url: process.env.NEXT_PUBLIC_BASE_PATH,
    siteName: "Damian Rodriguez Portfolio",
    images: [
      {
        url: "/code.png",
        width: 1200,
        height: 630,
        alt: "Imagen de Damian Rodriguez Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Damian Rodriguez",
    description: "Portfolio personal de Damian Rodriguez",
    images: ["/code.png"],
  },
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
