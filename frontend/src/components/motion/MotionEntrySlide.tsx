"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionEntrySlideProps = MotionDefaults & {
  direction?: "left" | "right" | "up" | "down";
};

const getInitialPosition = (direction: MotionEntrySlideProps["direction"]) => {
  switch (direction) {
    case "left":
      return { x: -50, y: 0 };
    case "right":
      return { x: 50, y: 0 };
    case "up":
      return { x: 0, y: -50 };
    case "down":
      return { x: 0, y: 50 };
    default:
      return { x: -50, y: 0 };
  }
};

const visibleState = {
  opacity: 1,
  x: 0,
  y: 0,
};

const MotionEntrySlide = ({
  direction = "left",
  ...props
}: MotionEntrySlideProps) => {
  const { duration, order, children, className, onClick } = {
    ...DEFAULT_MOTION,
    ...props,
  };

  const initial = useMemo(
    () => ({
      opacity: 0,
      ...getInitialPosition(direction),
    }),
    [direction],
  );

  const transition = useMemo(
    () => ({
      duration,
      delay: order * 0.25,
      ease: "easeOut" as const,
    }),
    [duration, order],
  );

  return (
    <motion.div
      initial={initial}
      animate={visibleState}
      transition={transition}
      className={clsx("will-change-[opacity,transform]", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionEntrySlide);
