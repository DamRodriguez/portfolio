"use client";
import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";

type TextRevealWordProps = {
  children: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  duration?: number;
  blur?: number;
  once?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: React.CSSProperties;
};

export default function TextRevealWord({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
  duration = 0.6,
  blur = 6,
  once = true,
  as: Tag = "span",
  style,
}: TextRevealWordProps) {
  const words = useMemo(() => {
    return children.split(" ").map((word, index) => ({
      id: `${word}-${index}`,
      word,
    }));
  }, [children]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur}px)`,
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Tag className={className} style={{ display: "inline-block", ...style }}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView={once ? "visible" : undefined}
        animate={!once ? "visible" : undefined}
        viewport={once ? { once: true, margin: "-50px" } : undefined}
        style={{ display: "inline" }}
      >
        {words.map(({ id, word }, index) => (
          <motion.span
            key={id}
            variants={wordVariants}
            style={{
              display: "inline-block",
              marginRight: index < words.length - 1 ? "0.25em" : "0",
              willChange: "transform, opacity, filter",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
