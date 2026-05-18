"use client";
import { DEFAULT_MOTION, type MotionDefaults } from "@/config/motion";
import clsx from "clsx";
import { motion, type Variants } from "framer-motion";
import { Children, memo, useMemo } from "react";

type MotionStaggerProps = MotionDefaults & {
  direction?: "left" | "right" | "up" | "down";
  stagger?: number;
};

const getInitialPosition = (direction: MotionStaggerProps["direction"]) => {
  switch (direction) {
    case "left":
      return { x: -50, y: 0 };
    case "right":
      return { x: 50, y: 0 };
    case "up":
      return { x: 0, y: -50 };
    case "down":
      return { x: 0, y: 50 };
    default:
      return { x: 0, y: 50 };
  }
};

const MotionStagger = ({
  direction = "down",
  stagger = 0.2,
  ...props
}: MotionStaggerProps) => {
  const { duration, order, viewAmount, children, className, onClick } = {
    ...DEFAULT_MOTION,
    ...props,
  };

  const containerVariants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          delayChildren: order * 0.4,
          staggerChildren: stagger,
        },
      },
    }),
    [order, stagger],
  );

  const childVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.95,
        ...getInitialPosition(direction),
      },
      visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          ease: "easeInOut" as const,
        },
      },
    }),
    [direction, duration],
  );

  const viewport = useMemo(
    () => ({
      once: true,
      amount: viewAmount,
    }),
    [viewAmount],
  );

  const animatedChildren = useMemo(
    () =>
      Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          variants={childVariants}
          className="will-change-[opacity,transform]"
        >
          {child}
        </motion.div>
      )),
    [children, childVariants],
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={clsx("will-change-transform", className)}
      onClick={onClick}
    >
      {animatedChildren}
    </motion.div>
  );
};

export default memo(MotionStagger);
