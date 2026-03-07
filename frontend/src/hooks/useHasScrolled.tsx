import { useEffect, useState } from "react";

const useHasScrolled = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("hasScrolled");
    if (saved === "true") setHasScrolled(true);

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;

      setHasScrolled(prev => {
        if (prev !== scrolled) {
          sessionStorage.setItem("hasScrolled", String(scrolled));
          return scrolled;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { hasScrolled };
};

export default useHasScrolled;