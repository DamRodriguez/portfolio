import type { RefObject } from "react";

export interface RotatingItemConfig {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

export interface EntranceAnimationConfig {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  enabled?: boolean;
}

export interface UseRotatingOnScrollAnimationProps {
  galleryRef: RefObject<HTMLElement | null>;
  marqueeRef: RefObject<HTMLElement | null>;
  marqueeBgRef: RefObject<HTMLElement | null>;
  itemRefs: RefObject<(HTMLElement | null)[]>;
  wrapperRefs: RefObject<(HTMLElement | null)[]>;
  itemConfigs?: RotatingItemConfig[];
  disabled?: boolean;
  zAmplitude?: number;
  itemStart?: string;
  itemEnd?: string;
  entranceAnimation?: EntranceAnimationConfig;
}
