"use client";
import { motion, type Variants } from "framer-motion";
import React from "react";

type MotionStaggerProps = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  stagger?: number;
  className?: string;
  order?: number;
};

const MotionStagger = ({
  children,
  direction = "down",
  duration = 0.4,
  stagger = 0.2,
  order = 0,
  className,
}: MotionStaggerProps) => {

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: order * 0.4,
        staggerChildren: stagger,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MotionStagger;