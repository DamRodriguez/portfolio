"use client";
import { useLenisScroll } from "@/hooks/useLenisScroll";

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useLenisScroll();
  return <>{children}</>;
};
