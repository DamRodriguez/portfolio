import ReduxStoreProvider from "@/components/provider/ReduxStoreProvider";
import "@/styles/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return <ReduxStoreProvider>{children}</ReduxStoreProvider>;
}
