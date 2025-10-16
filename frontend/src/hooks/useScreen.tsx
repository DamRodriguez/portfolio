"use client";
import { useEffect, useState } from "react";

const useScreen = (): { screenWidth: number } => {
  const [screenWidth, setScreenWidth] = useState<number>(360);

  useEffect(() => {
    const handleResize = (): void => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenWidth };
};

export default useScreen;
