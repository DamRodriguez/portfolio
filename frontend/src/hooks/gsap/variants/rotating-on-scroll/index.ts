"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useRef } from "react";
import {
  setupEntranceAnimation,
  setupGallery3DAnimation,
  setupMarqueeAnimation,
} from "./animations";
import {
  DEFAULT_ITEM_END,
  DEFAULT_ITEM_START,
  DEFAULT_Z_AMPLITUDE,
} from "./constants";
import type {
  EntranceAnimationConfig,
  RotatingItemConfig,
  UseRotatingOnScrollAnimationProps,
} from "./types";
import {
  alignMarquee,
  calculateMarqueePosition,
  filterElementArray,
  getDeterministicRotationConfig,
  positionWrappers,
} from "./utils";

gsap.registerPlugin(ScrollTrigger);

export { generateItemConfigs } from "./utils";

export type {
  EntranceAnimationConfig,
  RotatingItemConfig,
  UseRotatingOnScrollAnimationProps,
};

export function useRotatingOnScrollAnimation({
  galleryRef,
  marqueeRef,
  marqueeBgRef,
  itemRefs,
  wrapperRefs,
  itemConfigs = [],
  disabled = false,
  zAmplitude = DEFAULT_Z_AMPLITUDE,
  itemStart = DEFAULT_ITEM_START,
  itemEnd = DEFAULT_ITEM_END,
  entranceAnimation,
}: UseRotatingOnScrollAnimationProps) {
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const marqueeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const getRotationConfig = useCallback(
    (index: number): RotatingItemConfig =>
      getDeterministicRotationConfig(index, itemConfigs),
    [itemConfigs],
  );

  const killTriggers = useCallback(() => {
    scrollTriggersRef.current.forEach((st) => st.kill());
    scrollTriggersRef.current = [];
    if (marqueeTimelineRef.current) {
      marqueeTimelineRef.current.kill();
      marqueeTimelineRef.current = null;
    }
  }, []);

  useGSAP(
    () => {
      if (disabled) return;

      const gallery = galleryRef.current;
      const marquee = marqueeRef.current;
      const marqueeBg = marqueeBgRef?.current;
      const items = filterElementArray(itemRefs);
      const wrappers = filterElementArray(wrapperRefs);

      if (!gallery || !marquee || items.length === 0 || wrappers.length === 0)
        return;

      killTriggers();

      // Posicionamiento inicial
      positionWrappers(wrapperRefs);
      alignMarquee(marquee, marqueeBg, wrappers[0]);

      // 1. Animación 3D de la galería
      const galleryTriggers = setupGallery3DAnimation({
        items,
        wrappers,
        getRotationConfig,
        zAmplitude,
        itemStart,
        itemEnd,
      });
      scrollTriggersRef.current.push(...galleryTriggers);

      // 2. Animación horizontal del marquee
      const marqueeResult = setupMarqueeAnimation({
        marquee,
        marqueeBg,
        wrappers,
        items,
        calculateMarqueePosition,
      });
      marqueeTimelineRef.current = marqueeResult.timeline;
      scrollTriggersRef.current.push(...marqueeResult.triggers);

      // 3. Animación de entrada
      const marqueeInner = marquee.querySelector<HTMLElement>(".mark__inner");
      const entranceTriggers = setupEntranceAnimation({
        entranceAnimation,
        items,
        marqueeInner,
      });
      scrollTriggersRef.current.push(...entranceTriggers);

      // 4. Manejo de resize
      const handleResize = () => {
        positionWrappers(wrapperRefs);
        alignMarquee(marquee, marqueeBg, wrappers[0]);
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        killTriggers();
        window.removeEventListener("resize", handleResize);
      };
    },
    {
      scope: galleryRef,
      dependencies: [
        disabled,
        zAmplitude,
        itemStart,
        itemEnd,
        entranceAnimation,
        itemConfigs,
      ],
      revertOnUpdate: true,
    },
  );
}
