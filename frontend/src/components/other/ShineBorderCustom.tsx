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
        "border border-dark-gray/15 dark:border-soft-gray/50": props.isVisible,
      })}
      shineColor={
        theme === "dark"
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(170, 170, 170, 0.5)"
      }
    />
  );
};

export default ShineBorderCustom;
