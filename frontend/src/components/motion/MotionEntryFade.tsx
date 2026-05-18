"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type MotionEntryFadeProps = MotionDefaults;

const initialState = {
  opacity: 0,
  scale: 0.96,
};

const visibleState = {
  opacity: 1,
  scale: 1,
};

const MotionEntryFade = (props: MotionEntryFadeProps) => {
  const { duration, order, children, className, onClick } = {
    ...DEFAULT_MOTION,
    ...props,
  };

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
      initial={initialState}
      animate={visibleState}
      transition={transition}
      className={clsx("will-change-[opacity,transform]", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(MotionEntryFade);
