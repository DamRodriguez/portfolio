"use client";
import { useLenisScroll } from "@/hooks/scroll/useLenisScroll";

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useLenisScroll();
  return <>{children}</>;
};
