import ReduxStoreProvider from "@/components/provider/ReduxStoreProvider";
import { SmoothScrollProvider } from "@/components/provider/SmoothScrollProvider";
import "@/styles/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SmoothScrollProvider>
      <ReduxStoreProvider>{children}</ReduxStoreProvider>
    </SmoothScrollProvider>
  );
}
