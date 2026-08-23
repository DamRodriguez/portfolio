import type { EntranceAnimationConfig } from "./types";

export const DEFAULT_Z_AMPLITUDE = 50;
export const DEFAULT_ITEM_START = "center center";
export const DEFAULT_ITEM_END = "center center";
export const MARQUEE_GAP = 40;

export const DEFAULT_ENTRANCE_ANIMATION: EntranceAnimationConfig = {
  enabled: true,
  start: "bottom bottom+=20%",
  end: "center center",
  scrub: 2,
  from: {
    scale: 0.9,
    y: 30,
    filter: "blur(8px)",
  },
  to: {
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    ease: "power2.out",
  },
};
