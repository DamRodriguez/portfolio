"use client";
import clsx from "clsx";
import { ShineBorder } from "../magic-ui/shine-border";
import { useTheme } from "next-themes";

type ShineBorderCustomProps = {
  isVisible: boolean;
}

const ShineBorderCustom = (props: ShineBorderCustomProps) => {
  const { theme } = useTheme();
  if (!props.isVisible) return null;
  return (
    <ShineBorder
      className={clsx("", {
        "border border-dark-gray/30 dark:border-soft-gray/30": props.isVisible,
      })}
      shineColor={theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(170, 170, 170, 0.5)"}
    />
  );
};

export default ShineBorderCustom;