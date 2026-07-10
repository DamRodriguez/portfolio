"use client";
import MotionSlide, {
  MotionSlideDirection,
} from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import useBreakpoint from "@/hooks/useBreakpoint";
import clsx from "clsx";
import { ReactNode } from "react";

interface ResponsiveMotionGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey: (item: T) => string | number;
  containerClassName?: string;
  itemContainerClassName?: string;
  containerKey: string | number;
  defaultContainerGridClass?: boolean;
}

export default function ResponsiveMotionGrid<T>({
  items,
  renderItem,
  getItemKey,
  containerClassName,
  itemContainerClassName,
  containerKey,
  defaultContainerGridClass = true,
}: ResponsiveMotionGridProps<T>) {
  const isMobile = useBreakpoint();
  const Container = isMobile ? "div" : MotionStagger;
  const Wrapper = isMobile ? MotionSlide : "div";
  const wrapperProps = isMobile
    ? { direction: "down" as MotionSlideDirection }
    : {};
  const defaultContainerGridClassName = defaultContainerGridClass
    ? "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[1.5rem] xl:gap-[2rem]"
    : "";

  return (
    <Container
      key={containerKey}
      className={clsx("", defaultContainerGridClassName, containerClassName)}
    >
      {items.map((item, index) => (
        <Wrapper
          key={getItemKey(item)}
          {...wrapperProps}
          className={clsx("h-full", itemContainerClassName)}
        >
          {renderItem(item, index)}
        </Wrapper>
      ))}
    </Container>
  );
}
