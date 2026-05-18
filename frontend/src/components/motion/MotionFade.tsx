"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionFadeProps = MotionDefaults;

const initialState = {
  opacity: 0,
  scale: 0.95,
};

const visibleState = {
  opacity: 1,
  scale: 1,
};

const MotionFade = (props: MotionFadeProps) => {
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
      className={clsx("will-change-[opacity,transform]", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionFade);
