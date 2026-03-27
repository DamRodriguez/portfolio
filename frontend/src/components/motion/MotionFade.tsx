"use client";
import { DEFAULT_MOTION, MotionDefaults } from "@/config/motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type MotionFadeProps = MotionDefaults;

const MotionFade = (props: MotionFadeProps) => {
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: viewAmount }}
      transition={{ duration, delay: order * 0.4, ease: "easeInOut" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default MotionFade;
