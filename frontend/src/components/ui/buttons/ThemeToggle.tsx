"use client";
import { MoonIcon, SunIcon } from "@/components/icons/theme";
import { applyThemeTransition } from "@/lib/themeActions";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type ThemeToggleProps = {
  hasScrolled: boolean;
};

export function ThemeToggle(props: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLLabelElement | null>(null);
  // Portal ref - elemento fixed en body para getBoundingClientRect REAL (sin transform del header)
  const originRef = useRef<HTMLDivElement | null>(null);

  const iconClassName = "w-[1rem] h-[1rem] xl:w-[1.5rem] xl:h-[1.5rem]";

  useEffect(() => setMounted(true), []);

  // Sincronizar posición del portal con el botón real
  // useLayoutEffect = síncrono antes del paint, evita flash visual
  useLayoutEffect(() => {
    if (!buttonRef.current || !originRef.current) return;

    const updatePosition = () => {
      const btnRect = buttonRef.current!.getBoundingClientRect();
      // Actualizar style directamente via ref - sin estado, sin re-render
      const el = originRef.current!;
      el.style.left = `${btnRect.left}px`;
      el.style.top = `${btnRect.top}px`;
      el.style.width = `${btnRect.width}px`;
      el.style.height = `${btnRect.height}px`;
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  const handleThemeChange = () => {
    const currentTheme = resolvedTheme ?? theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // MEDIR EN EL MOMENTO EXACTO DEL CLICK - no confiar en portal sincronizado
    // buttonRef está en el header (fixed + transform), pero getBoundingClientRect()
    // devuelve coordenadas VISUALES viewport-reales (incluye transforms)
    const btnRect = buttonRef.current?.getBoundingClientRect();
    const originX = btnRect ? btnRect.left + btnRect.width / 2 : window.innerWidth / 2;
    const originY = btnRect ? btnRect.top + btnRect.height / 2 : window.innerHeight / 2;

    applyThemeTransition({
      targetTheme: newTheme,
      setTheme,
      originX,
      originY,
    });
  };

  if (!mounted) {
    return (
      <div className="container flex items-center justify-center">
        <div
          className={clsx(
            "relative w-[2.17375rem] xl:w-[2.67375rem] aspect-square rounded-full border shadow-s2 dark:bg-soft-gray/20 dark:border-soft-gray/5 dark:shadow-s1 animate-pulse",
            {
              "bg-white-bone": props.hasScrolled,
              "bg-soft-white": !props.hasScrolled,
            },
          )}
        />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="container flex items-center justify-center">
      <label
        ref={buttonRef}
        htmlFor="switch"
        data-theme-toggle
        className={clsx(
          "relative grid w-[2.17375rem] xl:w-[2.67375rem] dark:bg-soft-gray/20 aspect-square cursor-pointer place-items-center rounded-full border shadow-s2 theme-transition-all hover:bg-black dark:border-soft-gray/5 dark:shadow-s1 dark:hover:bg-soft-white group",
          {
            "bg-white-bone": props.hasScrolled,
            "bg-soft-white": !props.hasScrolled,
          },
        )}
      >
        <input
          type="checkbox"
          id="switch"
          className="peer hidden"
          checked={isDark}
          onChange={handleThemeChange}
        />

        <div className="col-start-1 row-start-1 transition-all delay-150 line-height-[0.1] peer-checked:rotate-[360deg] peer-checked:scale-0">
          <MoonIcon
            className={clsx(
              "fill-black group-hover:fill-soft-white",
              iconClassName,
            )}
          />
        </div>

        <div className="col-start-1 row-start-1 scale-0 transition-all line-height-[0.1] peer-checked:delay-150 peer-checked:scale-100 peer-checked:rotate-[360deg]">
          <SunIcon
            className={clsx(
              "fill-soft-white group-hover:fill-black",
              iconClassName,
            )}
          />
        </div>
      </label>

      {/* Portal a body: elemento fixed SIN ancestros transformados.
          Se renderiza INCONDICIONALMENTE (no depende de state) para existir ANTES de cualquier click.
          Posición sincronizada via useLayoutEffect -> style directo en ref (sin re-renders). */}
      {createPortal(
        <div
          ref={originRef}
          data-theme-origin
          className="fixed pointer-events-none -z-10"
          style={{
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            position: "fixed",
          }}
        />,
        document.body,
      )}
    </div>
  );
}