"use client";
import type { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";
import { useDotButton } from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselDotButtons";

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type useHorizontalCarouselProps = {
  options?: EmblaOptionsType;
  tweenFactorBase?: number;
};

export const useHorizontalCarousel = ({ options, tweenFactorBase = 0 }: useHorizontalCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    watchDrag: true,
    skipSnaps: true,
  });

  const { onDotButtonClick } = useDotButton(emblaApi);

  const tweenFactor = useRef(0);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = tweenFactorBase * emblaApi.scrollSnapList().length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach(slideIndex => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach(loopItem => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000);
    return () => { clearInterval(interval); };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi.
      on("reInit", setTweenFactor).
      on("reInit", tweenOpacity).
      on("scroll", tweenOpacity).
      on("slideFocus", tweenOpacity);
  }, [emblaApi, tweenOpacity, setTweenFactor]);

  return {
    emblaApi,
    emblaRef,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick
  };
};
