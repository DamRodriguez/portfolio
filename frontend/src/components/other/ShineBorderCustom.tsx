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
        "border border-dark-gray/30 dark:border-soft-gray/15": props.isVisible,
      })}
      shineColor={theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.3)"}
    />
  );
};

export default ShineBorderCustom;