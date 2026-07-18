"use client";
import { useEffect } from "react";

type UseVisualViewportHeightOptions = {
  variableName?: string;
  fallbackValue?: string;
};

export function useVisualViewportHeight({
  variableName = "--visual-vh",
  fallbackValue = "100dvh",
}: UseVisualViewportHeightOptions = {}) {
  useEffect(() => {
    const root = document.documentElement;

    const setVisualViewportHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      root.style.setProperty(variableName, `${height}px`);
    };

    setVisualViewportHeight();

    window.visualViewport?.addEventListener("resize", setVisualViewportHeight);
    window.visualViewport?.addEventListener("scroll", setVisualViewportHeight);
    window.addEventListener("resize", setVisualViewportHeight);

    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        setVisualViewportHeight,
      );

      window.visualViewport?.removeEventListener(
        "scroll",
        setVisualViewportHeight,
      );

      window.removeEventListener("resize", setVisualViewportHeight);

      root.style.setProperty(variableName, fallbackValue);
    };
  }, [variableName, fallbackValue]);
}
