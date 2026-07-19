"use client";

export type PortfolioThemeMode = "light" | "dark";

type ThemeSwitchOptions = {
  targetTheme: PortfolioThemeMode;
  setTheme: (theme: string) => void;
  triggerElement?: HTMLElement | null;
  clickX?: number;
  clickY?: number;
};

declare global {
  interface Window {
    __portfolioSetTheme?: (theme: PortfolioThemeMode) => void;
  }
}

function getTransitionOrigin(triggerElement?: HTMLElement | null) {
  if (triggerElement) {
    const rect = triggerElement.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export async function applyThemeTransition({
  targetTheme,
  setTheme,
  triggerElement,
  clickX,
  clickY,
}: ThemeSwitchOptions) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  if (root.classList.contains("theme-switching")) {
    return;
  }

  let x: number, y: number;
  if (typeof clickX === "number" && typeof clickY === "number") {
    x = clickX;
    y = clickY;
  } else {
    const origin = getTransitionOrigin(triggerElement);
    x = origin.x;
    y = origin.y;
  }

  const direction = targetTheme === "dark" ? "to-dark" : "to-light";

  const xPercent = (x / window.innerWidth) * 100;
  const yPercent = (y / window.innerHeight) * 100;
  root.style.setProperty("--theme-transition-x", `${xPercent}%`);
  root.style.setProperty("--theme-transition-y", `${yPercent}%`);
  root.style.setProperty("--theme-transition-speed", "1s");
  root.setAttribute("data-theme-transition", direction);
  root.classList.add("theme-switching");

  const cleanUp = () => {
    root.classList.remove("theme-switching");
    root.removeAttribute("data-theme-transition");
    root.style.removeProperty("--theme-transition-x");
    root.style.removeProperty("--theme-transition-y");
    root.style.removeProperty("--theme-transition-speed");
  };

  if (!document.startViewTransition) {
    setTheme(targetTheme);
    window.setTimeout(cleanUp, 600);
    return;
  }

  const transition = document.startViewTransition(() => {
    setTheme(targetTheme);
  });

  try {
    await transition.finished;
  } catch (error) {
    console.error("Theme transition error:", error);
  } finally {
    cleanUp();
  }
}

export function registerPortfolioThemeHandler(
  handler: (theme: PortfolioThemeMode) => void,
) {
  if (typeof window === "undefined") return;
  window.__portfolioSetTheme = handler;
}
