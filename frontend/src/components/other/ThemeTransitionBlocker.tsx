"use client";
import { useEffect } from "react";

export default function ThemeTransitionBlocker() {
  useEffect(() => {
    const t = setTimeout(() => {
      document.documentElement.classList.add("theme-ready");
    }, 200);

    return () => {
      document.documentElement.classList.remove("theme-ready");
      clearTimeout(t);
    };
  }, []);

  return null;
}