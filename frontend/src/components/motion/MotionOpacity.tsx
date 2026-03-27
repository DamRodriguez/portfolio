"use client";
import { DEFAULT_MOTION, MotionDefaults } from "@/config/motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type MotionOpacityProps = MotionDefaults

export const MotionOpacity = (props: MotionOpacityProps) => {
  const {
    duration,
    order,
    viewAmount,
    children,
    className,
    onClick
  } = { ...DEFAULT_MOTION, ...props };
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
