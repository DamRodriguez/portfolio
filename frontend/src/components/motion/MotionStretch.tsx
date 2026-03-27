"use client";
import { DEFAULT_MOTION, MotionDefaults } from "@/config/motion";
import { motion } from "framer-motion";

type MotionStretchProps = MotionDefaults;

const MotionStretch = (props: MotionStretchProps) => {
  const {
    duration,
    order,
    viewAmount,
    children,
    className,
    onClick
  } = { ...DEFAULT_MOTION, ...props };

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      style={{ transformOrigin: "center" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default MotionStretch;
