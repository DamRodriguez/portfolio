"use client";
import config from "@/config/config";
import useBreakpoint from "@/hooks/useBreakpoint";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxRotate?: number;
  onClick?: () => void;
};

export default function TiltCard({
  children,
  className,
  maxRotate = 10,
  onClick,
}: TiltCardProps) {
  const isTablet = useBreakpoint(config.breakpoints.xl);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [maxRotate, -maxRotate]),
    {
      stiffness: 180,
      damping: 20,
    },
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-maxRotate, maxRotate]),
    {
      stiffness: 180,
      damping: 20,
    },
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    x.set(px - 0.5);
    y.set(py - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      whileHover={isTablet ? undefined : { scale: 1.03 }}
      onMouseMove={isTablet ? undefined : handleMouseMove}
      onMouseLeave={isTablet ? undefined : handleMouseLeave}
      style={
        isTablet
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }
      }
    >
      {children}
    </motion.div>
  );
}
