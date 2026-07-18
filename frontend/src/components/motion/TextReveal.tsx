"use client";
import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  duration?: number;
  blur?: number;
  once?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: React.CSSProperties;
  order?: number;
};

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
  duration = 0.2,
  blur = 4,
  once = true,
  order = 0,
  as: Tag = "span",
  style,
}: TextRevealProps) {
  const letters = useMemo(() => {
    return children.split("").map((char, index) => ({
      id: `${char}-${index}`,
      char: char === " " ? "\u00A0" : char,
      isSpace: char === " ",
      isNewLine: char === "\n",
    }));
  }, [children]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: order * delay,
        staggerChildren,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur}px)`,
      y: 10,
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
        viewport={once ? { once: true } : undefined}
        style={{ display: "inline" }}
      >
        {letters.map(({ id, char, isSpace, isNewLine }) => {
          if (isNewLine) {
            return <br key={id} />;
          }
          return (
            <motion.span
              key={id}
              variants={letterVariants}
              style={{
                display: "inline-block",
                whiteSpace: isSpace ? "pre" : "normal",
                willChange: "transform, opacity, filter",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
