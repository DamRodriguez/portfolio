"use client";

import ItemHover from "@/components/other/ItemHover";

type InfiniteCarouselProps = {
  items: string[];
};

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
  const repeated = [...items, ...items, ...items];
  const duration = Math.max(items.length * 2.5, 10);

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="carousel-track flex w-max gap-3 h-[2rem] "
        style={
          {
            "--duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {repeated.map((item, index) => (
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
      </div>
    </div>
  );
}
