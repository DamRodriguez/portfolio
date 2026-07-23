"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { ShineBorder } from "../magic-ui/shine-border";

type ShineBorderCustomProps = {
  isVisible: boolean;
};

const ShineBorderCustom = (props: ShineBorderCustomProps) => {
  const { theme } = useTheme();
  if (!props.isVisible) return null;
  return (
    <ShineBorder
      className={clsx("rounded-full theme-transition-all", {
        "border border-black/40 dark:border-soft-gray/50": props.isVisible,
      })}
      shineColor={
        theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(18, 18, 18, 0.4)"
      }
    />
  );
};

export default ShineBorderCustom;
