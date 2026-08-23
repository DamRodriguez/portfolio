"use client";
import { useCallback, useState } from "react";

export const useCarousel = (length: number, initialIndex: number = 0) => {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  return {
    index,
    setIndex,
    next,
    prev,
  };
};
