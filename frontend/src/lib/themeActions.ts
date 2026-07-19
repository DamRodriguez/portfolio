"use client";

export type PortfolioThemeMode = "light" | "dark";

type ThemeSwitchOptions = {
  targetTheme: PortfolioThemeMode;
  setTheme: (theme: string) => void;
  triggerElement?: HTMLElement | null;
  /**
   * Coordenadas explícitas del origen de la animación (centro del botón).
   * Si se proporcionan, se usan directamente sin medir triggerElement.
   * Útil para click handlers que miden en el momento exacto.
   */
  originX?: number;
  originY?: number;
};

declare global {
  interface Window {
    __portfolioSetTheme?: (theme: PortfolioThemeMode) => void;
  }
}

function createCircleOverlay(x: number, y: number, endRadius: number): HTMLElement {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 0;
    height: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: inherit;
    pointer-events: none;
    z-index: 2147483647;
    will-change: transform;
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function animateCircleOverlay(overlay: HTMLElement, endRadius: number): Promise<void> {
  return new Promise((resolve) => {
    // Force reflow
    overlay.offsetHeight;
    overlay.animate(
      {
        transform: [
          "translate(-50%, -50%) scale(0)",
          `translate(-50%, -50%) scale(${endRadius * 2 / Math.min(overlay.clientWidth || 1, 1)})`,
        ],
        width: ["0px", `${endRadius * 2}px`],
        height: ["0px", `${endRadius * 2}px`],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        fill: "forwards",
      },
    ).onfinish = () => {
      overlay.remove();
      resolve();
    };
  });
}

export async function applyThemeTransition({
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

  // Calcular origen: prioridad 1 = coords explícitas, prioridad 2 = triggerElement, prioridad 3 = centro viewport
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

  // iOS Safari: View Transitions + clipPath en pseudo-elemento está roto
  // Usar overlay DOM real con Web Animations API (funciona en todos los motores)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || prefersReducedMotion) {
    setTheme(targetTheme);
    window.setTimeout(cleanUp, 600);
    return;
  }

  // En iOS usar overlay DOM real; en resto View Transitions nativo
  if (isIOS) {
    // Cambio de tema inmediato
    setTheme(targetTheme);

    // Crear y animar overlay circular
    const overlay = createCircleOverlay(x, y, endRadius);
    try {
      await animateCircleOverlay(overlay, endRadius);
    } finally {
      cleanUp();
    }
    return;
  }

  // Desktop / Android: View Transitions API nativo
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