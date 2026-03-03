"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { JSX, ReactNode } from "react";

type MotionScaleProps = {
  children?: ReactNode;
  scaleDuration?: number;
  initialScale?: number;
  finalScale?: number;
  className?: string;
};

export const MotionScale = ({
  children,
  scaleDuration = 0.3,
  initialScale = 0.9,
  finalScale = 1,
  className,
}: MotionScaleProps): JSX.Element => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ scale: initialScale }}
      animate={{ scale: finalScale }}
      exit={{ scale: initialScale }}
      transition={{ duration: scaleDuration, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
