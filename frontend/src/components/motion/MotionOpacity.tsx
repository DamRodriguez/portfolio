"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { JSX, ReactNode } from "react";

type MotionOpacityProps = {
  children?: ReactNode;
  fadeDuration?: number;
  className?: string;
};

export const MotionOpacity = ({
  children,
  fadeDuration = 0.3,
  className,
}: MotionOpacityProps): JSX.Element => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: fadeDuration, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
