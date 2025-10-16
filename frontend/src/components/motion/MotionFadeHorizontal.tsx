"use client";
import { motion } from "framer-motion";
import type { JSX, ReactNode } from "react";

type MotionFadeHorizontalProps = {
  children: ReactNode;
  key?: string;
};

export const MotionFadeHorizontal = ({ children, key }: MotionFadeHorizontalProps): JSX.Element => {
  return (
    <motion.div
      layout
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
