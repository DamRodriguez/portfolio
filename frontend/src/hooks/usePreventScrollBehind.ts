import { useCallback, useEffect, useRef } from "react";

export function usePreventScrollBehind() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchY = useRef(0);

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Si el contenedor no tiene scroll, siempre prevenir
    if (scrollHeight <= clientHeight) {
      e.preventDefault();
      return;
    }

    // Si estamos en el borde y el scroll intenta continuar en esa dirección
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      return;
    }

    // Prevenir que el evento se propague al padre
    e.stopPropagation();
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      lastTouchY.current = touch.clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const touch = e.touches[0];
    if (!touch) return;

    const touchY = touch.clientY;
    const deltaY = lastTouchY.current - touchY;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Si el contenedor no tiene scroll, siempre prevenir
    if (scrollHeight <= clientHeight) {
      e.preventDefault();
      return;
    }

    // Si estamos en el borde y el scroll intenta continuar en esa dirección
    if ((isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0)) {
      e.preventDefault();
      return;
    }

    // Prevenir propagación para mantener el scroll dentro del contenedor
    e.stopPropagation();
    lastTouchY.current = touchY;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Agregar event listeners
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    // Cleanup
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  return containerRef;
}
