"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionSlideProps = MotionDefaults & {
  direction?: "left" | "right" | "up" | "down";
};

const getInitialPosition = (direction: MotionSlideProps["direction"]) => {
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

const MotionSlide = ({ direction = "left", ...props }: MotionSlideProps) => {
  const { duration, order, viewAmount, children, className, onClick } = {
    ...DEFAULT_MOTION,
    ...props,
  };

  const initial = useMemo(
    () => ({
      opacity: 0.0001,
      ...getInitialPosition(direction),
    }),
    [direction],
  );

  const viewport = useMemo(
    () => ({
      once: true,
      amount: viewAmount,
    }),
    [viewAmount],
  );

  const transition = useMemo(
    () => ({
      duration,
      delay: order * 0.4,
      ease: "easeInOut" as const,
    }),
    [duration, order],
  );

  return (
    <motion.div
      initial={initial}
      whileInView={visibleState}
      viewport={viewport}
      transition={transition}
      className={clsx("will-change-transform", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionSlide);
