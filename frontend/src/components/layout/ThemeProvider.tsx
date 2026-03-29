"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FC, ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const ThemeProvider: FC<ProvidersProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;