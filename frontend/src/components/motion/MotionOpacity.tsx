"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionOpacityProps = MotionDefaults;

const initialState = {
  opacity: 0.0001,
};

const animateState = {
  opacity: 1,
};

const exitState = {
  opacity: 0,
};

const MotionOpacity = (props: MotionOpacityProps) => {
  const { duration, order, children, className, onClick } = {
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

  return (
    <motion.div
      initial={initialState}
      animate={animateState}
      exit={exitState}
      transition={transition}
      className={clsx("will-change-[opacity]", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionOpacity);
