"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useCurrentTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === "dark";
  const isLight = currentTheme === "light";

  return {
    currentTheme,
    theme,
    resolvedTheme,
    setTheme,
    isDark,
    isLight,
    mounted,
  };
}
