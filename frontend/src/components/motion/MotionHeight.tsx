"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionHeightProps {
  children: ReactNode;
  className?: string;
}

export const MotionHeight = ({ children, className }: MotionHeightProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
