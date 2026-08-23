"use client";
import config from "@/config/config";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalConfig = {
  panels: string;
  container?: string;
};

type useHorizontalScrollAnimationV1Props = {
  horizontal: HorizontalConfig;
  scope?: RefObject<Element | null>;
  disabled?: boolean;
  topDistance?: string;
};

export function useHorizontalScrollAnimationV1({
  horizontal,
  scope,
  disabled = false,
  topDistance,
}: useHorizontalScrollAnimationV1Props) {
  const isDeskXl = useBreakpoint(Number(config.breakpoints.xl));
  const finalTopDistance = topDistance ? topDistance : isDeskXl ? "15%" : "20%";

  useGSAP(
    (context) => {
      if (disabled) {
        context.revert();
        return;
      }

      const root = scope?.current as HTMLElement;
      if (!root) return;

      const panels = gsap.utils.toArray<HTMLElement>(horizontal.panels, root);

      if (!panels.length) return;

      // Get the container that holds the absolutely positioned panels
      const container = panels[0]?.parentElement as HTMLElement;
      if (!container) return;

      // 1. Ocultamos las cards que van a entrar desde la derecha
      gsap.set(panels.slice(1), { xPercent: 100 });

      // 2. Creamos la timeline con ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: `top ${finalTopDistance}`,
          pin: true,
          scrub: 2,
          invalidateOnRefresh: true,
          // CALCULO CORREGIDO: Usamos una función que obtiene la altura real del contenedor
          // y la multiplica por el número de paneles
          end: () => {
            // Forzamos el reflow para obtener medidas actualizadas
            const containerHeight = container.getBoundingClientRect().height;
            // Añadimos un pequeño margen de seguridad para evitar desfases
            const totalScroll = containerHeight * (panels.length - 1);
            return `+=${totalScroll}`;
          },
          // Añadimos refresh para que se recalcule en resize
          onRefresh: (self) => {
            // Forzamos la actualización de las medidas
            self.refresh();
          },
        },
      });

      // 3. Animación secuencial
      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panel, {
          xPercent: 0,
          ease: "none",
        });
      });

      // 4. FORZAR REFRESH después del montaje y en resize
      // Esto asegura que ScrollTrigger recalcule las medidas correctamente
      const refreshScrollTrigger = () => {
        ScrollTrigger.refresh();
      };

      // Refrescar después de un pequeño delay para asegurar que el DOM está listo
      setTimeout(refreshScrollTrigger, 100);

      // Refrescar en resize y orientation change (importante para mobile)
      window.addEventListener("resize", refreshScrollTrigger);
      window.addEventListener("orientationchange", () => {
        setTimeout(refreshScrollTrigger, 300);
      });

      // Cleanup de los event listeners
      return () => {
        window.removeEventListener("resize", refreshScrollTrigger);
        window.removeEventListener("orientationchange", refreshScrollTrigger);
      };
    },
    {
      scope,
      dependencies: [horizontal, disabled, isDeskXl, finalTopDistance],
      revertOnUpdate: true,
    },
  );
}
