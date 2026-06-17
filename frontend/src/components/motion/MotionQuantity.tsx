"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionQuantityProps = MotionDefaults & {
  motionKey: string | number;
  as?: "p" | "span";
};

const initialState = {
  opacity: 0,
  y: 4,
};

const animateState = {
  opacity: 1,
  y: 0,
};

const exitState = {
  opacity: 0,
  y: -4,
};

const MotionQuantity = (props: MotionQuantityProps) => {
  const {
    duration = 0.2,
    order = 0,
    children,
    className,
    motionKey,
    as = "p",
  } = {
    ...DEFAULT_MOTION,
    ...props,
  };

  const transition = useMemo(
    () => ({
      duration,
      delay: order * 0.4,
      ease: "easeInOut" as const,
    }),
    [duration, order],
  );

  const MotionTag = motion[as];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionTag
        key={motionKey}
        initial={initialState}
        animate={animateState}
        exit={exitState}
        transition={transition}
        className={clsx("will-change-[opacity,transform]", className)}
      >
        {children}
      </MotionTag>
    </AnimatePresence>
  );
};

export default memo(MotionQuantity);
