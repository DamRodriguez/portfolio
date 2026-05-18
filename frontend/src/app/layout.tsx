import ReduxStoreProvider from "@/components/provider/ReduxStoreProvider";
import { createMetadata } from "@/lib/metadata";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata();

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return <ReduxStoreProvider>{children}</ReduxStoreProvider>;
}
