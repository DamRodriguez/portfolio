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
  // 1. Elemento fixed dedicado (portal del ThemeToggle) → coordenadas viewport REALES
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

// Detectar iOS Safari (donde View Transitions pseudo-elements fallan)
function isIOSSafari(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return isIOS && isSafari;
}

// Crear overlay DOM real para la animación circular (fallback universal)
function createCircleOverlay(x: number, y: number, endRadius: number, targetTheme: PortfolioThemeMode): HTMLElement {
  const overlay = document.createElement("div");
  overlay.dataset.themeTransitionOverlay = "true";
  overlay.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${endRadius * 2}px;
    height: ${endRadius * 2}px;
    margin-left: -${endRadius}px;
    margin-top: -${endRadius}px;
    border-radius: 50%;
    background: ${targetTheme === "dark" ? "#000" : "#fff"};
    pointer-events: none;
    z-index: 2147483647;
    transform: scale(0);
    transform-origin: center;
    will-change: transform;
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function animateCircleOverlay(overlay: HTMLElement, duration: number): Promise<void> {
  return new Promise((resolve) => {
    // Forzar reflow
    overlay.getBoundingClientRect();
    // Animar con Web Animations API (nativo, performante)
    const animation = overlay.animate(
      { transform: ["scale(0)", "scale(1)"] },
      { duration, easing: "ease-in-out", fill: "forwards" }
    );
    animation.onfinish = () => resolve();
    animation.oncancel = () => resolve();
    // Fallback timeout
    setTimeout(resolve, duration + 100);
  });
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

  // Calcular origen
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

  // Debug: log para diagnosticar en producción móvil
  if (process.env.NODE_ENV !== "production") {
    console.log("[ThemeTransition]", { x, y, endRadius, targetTheme, viewport: { w: window.innerWidth, h: window.innerHeight } });
  }

  root.classList.add("theme-switching");

  const cleanUp = () => {
    root.classList.remove("theme-switching");
    // Limpiar overlays huérfanos
    document.querySelectorAll("[data-theme-transition-overlay]").forEach(el => el.remove());
  };

  // Sin View Transitions API -> fallback simple
  if (!document.startViewTransition) {
    setTheme(targetTheme);
    window.setTimeout(cleanUp, 600);
    return;
  }

  // En iOS Safari, View Transitions pseudo-elements están rotos -> usar overlay DOM real
  const useDOMOverlay = isIOSSafari();

  let overlay: HTMLElement | null = null;
  if (useDOMOverlay) {
    overlay = createCircleOverlay(x, y, endRadius, targetTheme);
  }

  const transition = document.startViewTransition(() => {
    setTheme(targetTheme);
  });

  const duration = 700;

  if (useDOMOverlay && overlay) {
    // Animar overlay DOM real (funciona en iOS Safari)
    transition.ready.then(() => animateCircleOverlay(overlay!, duration)).finally(cleanUp);
  } else {
    // Navegadores desktop/Android Chrome: View Transitions API nativo
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(cleanUp);
  }
}

export function registerPortfolioThemeHandler(
  handler: (theme: PortfolioThemeMode) => void,
) {
  if (typeof window === "undefined") return;
  window.__portfolioSetTheme = handler;
}