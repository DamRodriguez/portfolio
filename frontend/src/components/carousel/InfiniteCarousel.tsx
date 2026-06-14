"use client";

import ItemHover from "@/components/other/ItemHover";

type InfiniteCarouselProps = {
  items: string[];
};

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
  // carousel-track en el div sobre el map
  return (
    <div className="w-full py-2 overflow-x-auto scrollbar-none">
      <div className="flex w-max gap-3 pr-4">
        {items.map((item) => (
          <div key={item} className="shrink-0">
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
    </div>
  );
}
