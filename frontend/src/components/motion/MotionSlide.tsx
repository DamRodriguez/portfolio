"use client";
import { DEFAULT_MOTION, MotionDefaults } from "@/config/motion";
import { motion } from "framer-motion";

type MotionSlideProps = MotionDefaults & {
  direction?: "left" | "right" | "up" | "down";
};

const MotionSlide = ({
  direction = "left",
  ...props
}: MotionSlideProps) => {
  const {
    duration,
    order,
    viewAmount,
    children,
    className,
    onClick
  } = { ...DEFAULT_MOTION, ...props };
  const initialPosition = {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPosition }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default MotionSlide;
