"use client";

export type PortfolioThemeMode = "light" | "dark";

type ThemeSwitchOptions = {
  targetTheme: PortfolioThemeMode;
  setTheme: (theme: string) => void;
  triggerElement?: HTMLElement | null;
  // Coordenadas explícitas del origen (centro del botón) calculadas por el caller
  // Evita bugs de getBoundingClientRect() en mobile Safari dentro de fixed+transform
  originX?: number;
  originY?: number;
};

declare global {
  interface Window {
    __portfolioSetTheme?: (theme: PortfolioThemeMode) => void;
  }
}

function getTransitionOrigin(
  triggerElement?: HTMLElement | null,
  originX?: number,
  originY?: number,
) {
  // Si nos pasan coordenadas explícitas, usarlas (más fiable en mobile)
  if (typeof originX === "number" && typeof originY === "number") {
    const x = originX;
    const y = originY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    return { x, y, endRadius };
  }

  // Fallback: calcular desde el elemento (puede fallar en mobile Safari con fixed+transform)
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

  const { x, y, endRadius } = getTransitionOrigin(
    triggerElement,
    originX,
    originY,
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

  try {
    const transition = document.startViewTransition(() => {
      setTheme(targetTheme);
    });

    transition.ready
      .then(() => {
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
      })
      .catch(() => {
        cleanUp();
      });

    transition.finished.then(cleanUp).catch(() => {
      cleanUp();
    });

    window.setTimeout(cleanUp, 2200);
  } catch {
    cleanUp();
    setTheme(targetTheme);
  }
}

export function registerPortfolioThemeHandler(
  handler: (theme: PortfolioThemeMode) => void,
) {
  if (typeof window === "undefined") return;
  window.__portfolioSetTheme = handler;
}
