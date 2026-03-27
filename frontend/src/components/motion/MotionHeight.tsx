"use client";
import { DEFAULT_MOTION, MotionDefaults } from "@/config/motion";
import { motion } from "framer-motion";

type MotionHeightProps = MotionDefaults;

export const MotionHeight = (props: MotionHeightProps) => {
  const {
    duration,
    order,
    children,
    className,
    onClick
  } = { ...DEFAULT_MOTION, ...props };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
