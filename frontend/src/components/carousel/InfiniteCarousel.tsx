"use client";

import ItemHover from "@/components/other/ItemHover";
import { motion } from "motion/react";

type InfiniteCarouselProps = {
  items: string[];
  speed?: number;
};

export default function InfiniteCarousel({
  items,
  speed = 15,
}: InfiniteCarouselProps) {
  return (
    <div className="relative w-full overflow-hidden h-fit">
      <div className="invisible flex gap-3">
        {items.map((item, index) => (
          <div key={index} className="shrink-0">
            <ItemHover
              small
              cursorNormal
              className="dark:!border-soft-gray/30 !border-soft-white/50 shadow-s2 dark:shadow-s1 bg-black/80"
            >
              {item}
            </ItemHover>
          </div>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 flex gap-3 w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={`${item}-${index}`} className="shrink-0">
            <ItemHover
              small
              cursorNormal
              className="dark:!border-soft-gray/30 !border-soft-white/50 shadow-s2 dark:shadow-s1 bg-black/80"
            >
              {item}
            </ItemHover>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
