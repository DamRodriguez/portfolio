"use client";

import { MoonIcon, SunIcon } from "@/components/icons/theme";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const iconClassName = "w-[1rem] h-[1rem] xl:w-[1.5rem] xl:h-[1.5rem]";

  useEffect(() => setMounted(true), []);

  const handleThemeChange = () => {
    const currentTheme = resolvedTheme ?? theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.add("theme-switching");

    const cleanUp = () => {
      root.classList.remove("theme-switching");
    };

    if (!document.startViewTransition) {
      setTheme(newTheme);

      window.setTimeout(cleanUp, 600);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
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
        htmlFor="switch"
        className="relative grid w-[2.17375rem] xl:w-[2.67375rem] aspect-square cursor-pointer place-items-center rounded-full bg-white theme-transition-all border hover:bg-black dark:hover:bg-soft-white group dark:border-soft-gray/5 bg-soft-white dark:bg-soft-gray/20 shadow-s2 dark:shadow-s1"
      >
        <input
          type="checkbox"
          id="switch"
          className="peer hidden"
          checked={isDark}
          onChange={handleThemeChange}
        />

        <div className="col-start-1 row-start-1 theme-transition-all delay-200 line-height-[0.1] peer-checked:rotate-[360deg] peer-checked:scale-0">
          <MoonIcon
            className={clsx(
              "fill-black group-hover:fill-soft-white",
              iconClassName
            )}
          />
        </div>

        <div className="col-start-1 row-start-1 scale-0 theme-transition-all line-height-[0.1] peer-checked:delay-200 peer-checked:scale-100 peer-checked:rotate-[360deg]">
          <SunIcon
            className={clsx(
              "fill-soft-white group-hover:fill-black",
              iconClassName
            )}
          />
        </div>
      </label>
    </div>
  );
}