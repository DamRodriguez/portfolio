"use client";
import { MoonIcon, SunIcon } from "@/components/icons/theme";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type CircleOrigin = {
  x: number;
  y: number;
};

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef<HTMLLabelElement | null>(null);
  const circleOriginRef = useRef<CircleOrigin | null>(null);

  const iconClassName = "w-[1rem] h-[1rem] xl:w-[1.5rem] xl:h-[1.5rem]";

  useEffect(() => setMounted(true), []);

  const getFallbackOrigin = () => {
    const rect = buttonRef.current?.getBoundingClientRect();

    if (!rect) {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    }

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLLabelElement>) => {
    circleOriginRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleThemeChange = () => {
    const currentTheme = resolvedTheme ?? theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const { x, y } = circleOriginRef.current ?? getFallbackOrigin();

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.classList.add("theme-switching");

    const cleanUp = () => {
      root.classList.remove("theme-switching");
      circleOriginRef.current = null;
    };

    if (!document.startViewTransition) {
      setTheme(newTheme);
      window.setTimeout(cleanUp, 700);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
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
  };

  if (!mounted) {
    return (
      <div className="container flex items-center justify-center opacity-0">
        <div className="w-[2.17375rem] xl:w-[2.67375rem] aspect-square" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="container flex items-center justify-center">
      <label
        ref={buttonRef}
        htmlFor="switch"
        onPointerDown={handlePointerDown}
        className="relative grid w-[2.17375rem] xl:w-[2.67375rem] aspect-square cursor-pointer place-items-center rounded-full border bg-soft-white shadow-s2 theme-transition-all hover:bg-black dark:border-soft-gray/5 dark:bg-soft-gray/20 dark:shadow-s1 dark:hover:bg-soft-white group"
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
    </div>
  );
}
