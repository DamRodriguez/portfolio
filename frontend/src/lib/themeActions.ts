"use client";

export type PortfolioThemeMode = "light" | "dark";

type ThemeSwitchOptions = {
  targetTheme: PortfolioThemeMode;
  setTheme: (theme: string) => void;
  triggerElement?: HTMLElement | null;
  originX?: number;
  originY?: number;
};

declare global {
  interface Window {
    __portfolioSetTheme?: (theme: PortfolioThemeMode) => void;
  }
}

export function applyThemeTransition({
  targetTheme,
  setTheme,
  triggerElement,
  originX,
  originY,
}: ThemeSwitchOptions) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  if (root.classList.contains("theme-switching")) {
    return;
  }

  let x: number, y: number;
  if (typeof originX === "number" && typeof originY === "number") {
    x = originX;
    y = originY;
  } else if (triggerElement) {
    const rect = triggerElement.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  } else {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  root.classList.add("theme-switching");

  const cleanUp = () => {
    root.classList.remove("theme-switching");
  };

  if (!document.startViewTransition) {
    setTheme(targetTheme);
    window.setTimeout(cleanUp, 600);
    return;
  }

  const transition = document.startViewTransition(() => {
    setTheme(targetTheme);
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });

  transition.finished.finally(cleanUp);
}

export function registerPortfolioThemeHandler(
  handler: (theme: PortfolioThemeMode) => void,
) {
  if (typeof window === "undefined") return;
  window.__portfolioSetTheme = handler;
}
