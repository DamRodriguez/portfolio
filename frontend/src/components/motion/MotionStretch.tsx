"use client";
import { motion } from "framer-motion";

type MotionStretchProps = {
  duration?: number;
  children: React.ReactNode;
  viewAmount?: number;
  className?: string;
};

const MotionStretch = ({
  duration = 0.6,
  viewAmount = 0.3,
  children,
  className,
}: MotionStretchProps) => {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, ease: "easeInOut" }}
      style={{ transformOrigin: "center" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionStretch;
