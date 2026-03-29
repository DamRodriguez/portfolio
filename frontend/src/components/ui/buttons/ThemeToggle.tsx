"use client";
import { MoonIcon, SunIcon } from "@/components/icons/theme";
import { MotionOpacity } from "@/components/motion/MotionOpacity";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconClassName = "w-[1rem] h-[1rem] xl:w-[1.5rem] xl:h-[1.5rem]";

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div />;

  return (
    <MotionOpacity className="container flex items-center justify-center">
      <label htmlFor="switch" className="relative grid w-[2.17375rem] xl:w-[2.67375rem] aspect-square cursor-pointer place-items-center rounded-full bg-white theme-transition-all border hover:bg-black dark:hover:bg-soft-white group dark:border-soft-gray/5 bg-soft-white dark:bg-soft-gray/20 shadow-s2 dark:shadow-s1">
        <input
          type="checkbox"
          id="switch"
          className="peer hidden"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />

        <div className="col-start-1 row-start-1 theme-transition-all delay-200 line-height-[0.1] peer-checked:rotate-[360deg] peer-checked:scale-0">
          <MoonIcon className={clsx("fill-black group-hover:fill-soft-white", iconClassName)} />
        </div>

        <div className="col-start-1 row-start-1 scale-0 theme-transition-all line-height-[0.1] peer-checked:delay-200 peer-checked:scale-100 peer-checked:rotate-[360deg]">
          <SunIcon className={clsx("fill-soft-white group-hover:fill-black", iconClassName)} />
        </div>
      </label>
    </MotionOpacity>
  );
}