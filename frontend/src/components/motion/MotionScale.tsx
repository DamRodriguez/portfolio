"use client";
import { DEFAULT_MOTION, MotionDefaults } from "@/config/motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type MotionScaleProps = MotionDefaults & {
  initialScale?: number;
  finalScale?: number;
  withOpacity?: boolean;
};

export const MotionScale = ({
  initialScale = 0.9,
  finalScale = 1,
  withOpacity = false,
  ...props
}: MotionScaleProps) => {
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
      initial={{ scale: initialScale, opacity: withOpacity ? 0 : 1 }}
      animate={{ scale: finalScale, opacity: withOpacity ? 1 : 1 }}
      exit={{ scale: initialScale, opacity: withOpacity ? 0 : 1 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
