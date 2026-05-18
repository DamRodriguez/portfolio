"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionScaleProps = MotionDefaults & {
  initialScale?: number;
  finalScale?: number;
  withOpacity?: boolean;
};

const MotionScale = ({
  initialScale = 0.9,
  finalScale = 1,
  withOpacity = false,
  ...props
}: MotionScaleProps) => {
  const { duration, order, viewAmount, children, className, onClick } = {
    ...DEFAULT_MOTION,
    ...props,
  };

  const initialState = useMemo(
    () => ({
      scale: initialScale,
      opacity: withOpacity ? 0 : 1,
    }),
    [initialScale, withOpacity],
  );

  const animateState = useMemo(
    () => ({
      scale: finalScale,
      opacity: 1,
    }),
    [finalScale],
  );

  const exitState = useMemo(
    () => ({
      scale: initialScale,
      opacity: withOpacity ? 0 : 1,
    }),
    [initialScale, withOpacity],
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
      initial={initialState}
      animate={animateState}
      exit={exitState}
      viewport={viewport}
      transition={transition}
      className={clsx("will-change-[opacity,transform]", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionScale);
