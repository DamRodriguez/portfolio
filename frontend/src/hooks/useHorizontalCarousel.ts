"use client";
import { useDotButton } from "@/components/carousel/horizontal-carousel/HorizontalCarouselDotButtons";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseHorizontalCarouselProps<T> = {
  options?: EmblaOptionsType;
  items: T[];
};

export const useHorizontalCarousel = <T>({
  options,
  items,
}: UseHorizontalCarouselProps<T>) => {
  // 1. Memorización de items seguros para el loop continuo
  const safeItems = useMemo(() => {
    return items.length <= 5 ? [...items, ...items] : items;
  }, [items]);

  // 2. Inicialización de Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true,
  });

  // 3. Estados y Referencias
  const [selectedIndex, setSelectedIndex] = useState(0);
  const outerSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 4. Integración con otros hooks
  const { onDotButtonClick } = useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // 5. Lógica de Autoplay controlada
  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay(); // Aseguramos que no haya temporizadores duplicados
    if (!emblaApi) return;

    autoplayTimerRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi, stopAutoplay]);

  // 6. Lógica de transformaciones 3D (Tweening)
  const tweenStyles = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const snapList = emblaApi.scrollSnapList();
      const tweenFactor = safeItems.length;

      snapList.forEach((scrollSnap, index) => {
        let diffToTarget = scrollSnap - scrollProgress;

        if (engine.options.loop && engine.slideLooper) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (index === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const offset = diffToTarget * tweenFactor;
        const absOffset = Math.abs(offset);

        const outerNode = outerSlidesRef.current[index];
        const innerNode = innerSlidesRef.current[index];

        if (innerNode) {
          innerNode.style.transform = `
            rotateY(${offset * -15}deg) 
            translateZ(${absOffset * 50}px) 
            scale(${Math.max(0.8, 1 - absOffset * 0.1)})
          `;
          innerNode.style.filter = `blur(${absOffset * 1.5}px)`;
          innerNode.style.pointerEvents = absOffset < 0.5 ? "auto" : "none";
        }

        if (outerNode) {
          outerNode.style.zIndex = Math.round(
            safeItems.length - absOffset,
          ).toString();
        }
      });
    },
    [safeItems.length],
  );

  // 7. Efectos de eventos
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      // Reinicia el timer cada vez que cambia el slide
      // (ya sea por botones, arrastre o el propio autoplay)
      startAutoplay();
    };

    // Vincular eventos visuales
    emblaApi.on("scroll", tweenStyles);
    emblaApi.on("reInit", tweenStyles);
    emblaApi.on("select", onSelect);

    // Eventos para pausar el autoplay mientras el usuario interactúa (arrastrando)
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);

    // Inicializar valores (onSelect dispara startAutoplay por primera vez)
    tweenStyles(emblaApi);
    onSelect();

    // Limpieza de eventos
    return () => {
      stopAutoplay(); // Limpiar el timer al desmontar
      emblaApi.off("scroll", tweenStyles);
      emblaApi.off("reInit", tweenStyles);
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
    };
  }, [emblaApi, tweenStyles, startAutoplay, stopAutoplay]);

  return {
    emblaRef,
    safeItems,
    selectedIndex,
    outerSlidesRef,
    innerSlidesRef,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick,
  };
};
