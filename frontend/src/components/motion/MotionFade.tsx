"use client";
import { motion } from "framer-motion";

type MotionFadeProps = {
  duration?: number;
  children: React.ReactNode;
  viewAmount?: number;
  className?: string;
  order?: number;
};

const MotionFade = ({
  duration = 0.6,
  order = 0,
  children,
  viewAmount = 0.3,
  className,
}: MotionFadeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionFade;
