"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { JSX, ReactNode } from "react";

type MotionScaleProps = {
  children?: ReactNode;
  scaleDuration?: number;
  initialScale?: number;
  finalScale?: number;
  withOpacity?: boolean;
  className?: string;
};

export const MotionScale = ({
  children,
  scaleDuration = 0.3,
  initialScale = 0.9,
  finalScale = 1,
  withOpacity = false,
  className,
}: MotionScaleProps): JSX.Element => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ scale: initialScale, opacity: withOpacity ? 0 : 1 }}
      animate={{ scale: finalScale, opacity: withOpacity ? 1 : 1 }}
      exit={{ scale: initialScale, opacity: withOpacity ? 0 : 1 }}
      transition={{ duration: scaleDuration, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
