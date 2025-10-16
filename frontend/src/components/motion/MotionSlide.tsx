"use client";
import { motion } from "framer-motion";

type MotionSlideProps = {
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  children: React.ReactNode;
  viewAmount?: number;
  className?: string;
};

const MotionSlide = ({
  direction = "left",
  duration = 0.6,
  children,
  viewAmount = 0.3,
  className,
}: MotionSlideProps) => {
  const initialPosition = {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPosition }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionSlide;
