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

function getTransitionOrigin(triggerElement?: HTMLElement | null) {
  // 1. Elemento fixed dedicado (portal del ThemeToggle) → coordenadas viewport REALES, sin transforms heredados
  const originElement = document.querySelector("[data-theme-origin]") as HTMLElement | null;
  if (originElement) {
    const rect = originElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    return { x, y, endRadius };
  }

  // 2. Fallback: triggerElement pasado (botón real del header)
  const rect = triggerElement?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  return { x, y, endRadius };
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

  // Si se pasan coordenadas explícitas, úsalas directamente (click handler mide en el momento exacto)
  // Si no, calcula desde triggerElement (para chat widget u otros orígenes)
  let { x, y, endRadius } = { x: 0, y: 0, endRadius: 0 };
  if (typeof originX === "number" && typeof originY === "number") {
    x = originX;
    y = originY;
    endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
  } else {
    const origin = getTransitionOrigin(triggerElement);
    x = origin.x;
    y = origin.y;
    endRadius = origin.endRadius;
  }

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
