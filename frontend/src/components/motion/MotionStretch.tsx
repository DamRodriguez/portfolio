"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionStretchProps = MotionDefaults;

const initialState = {
  scaleX: 0,
  opacity: 0,
};

const visibleState = {
  scaleX: 1,
  opacity: 1,
};

const stretchStyle = {
  transformOrigin: "center",
};

const MotionStretch = (props: MotionStretchProps) => {
  const { duration, order, viewAmount, children, className, onClick } = {
    ...DEFAULT_MOTION,
    ...props,
  };

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
      initial={initialState}
      whileInView={visibleState}
      viewport={viewport}
      transition={transition}
      style={stretchStyle}
      className={clsx("will-change-[opacity,transform]", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionStretch);
