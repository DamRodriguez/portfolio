import ReduxStoreProvider from "@/components/provider/ReduxStoreProvider";
import { SmoothScrollProvider } from "@/components/provider/SmoothScrollProvider";
import ThemeProvider from "@/components/provider/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScrollProvider>
      <ReduxStoreProvider>
        <NextIntlClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </ReduxStoreProvider>
    </SmoothScrollProvider>
  );
}
