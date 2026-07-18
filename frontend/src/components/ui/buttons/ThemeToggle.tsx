"use client";
import { MoonIcon, SunIcon } from "@/components/icons/theme";
import { applyThemeTransition } from "@/lib/themeActions";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type ThemeToggleProps = {
  hasScrolled: boolean;
};

export function ThemeToggle(props: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLLabelElement | null>(null);

  const iconClassName = "w-[1rem] h-[1rem] xl:w-[1.5rem] xl:h-[1.5rem]";

  useEffect(() => setMounted(true), []);

  const handleThemeChange = (e: React.MouseEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement>) => {
    // Si viene del label (onClick), prevenir el cambio automático del checkbox
    // para que nosotros controlemos el tema programáticamente
    if (e.currentTarget.tagName === "LABEL") {
      e.preventDefault();
    }
    const currentTheme = (resolvedTheme ?? theme ?? "dark") as "light" | "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Usar el ref directamente al botón (label), igual que antes del refactor
    const triggerElement = buttonRef.current;

    applyThemeTransition({
      targetTheme: newTheme,
      setTheme,
      triggerElement,
    });

    // Actualizar el checkbox manualmente después de la transición
    // El tema cambia via next-themes, el checkbox reacciona via checked={isDark}
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
        onClick={handleThemeChange}
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
          readOnly
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
    </div>
  );
}
