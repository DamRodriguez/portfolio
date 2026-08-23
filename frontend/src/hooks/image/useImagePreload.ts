"use client";
import { useEffect } from "react";

export const useImagePreload = (images: string[]) => {
  useEffect(() => {
    const preload = () => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(preload);
    } else {
      setTimeout(preload, 300);
    }
  }, [images]);
};
