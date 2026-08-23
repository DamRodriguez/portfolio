import gsap from "gsap";
import type { RefObject } from "react";
import { MARQUEE_GAP } from "./constants";
import type { RotatingItemConfig } from "./types";

export function generateItemConfigs(
  count: number,
  seed = 12345,
): RotatingItemConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const s = (i + 1) * seed;
    const rand = (min: number, max: number) => {
      const x = Math.sin(s) * 10000;
      return min + (x - Math.floor(x)) * (max - min);
    };
    return {
      rotationX: rand(70, 120),
      rotationY: rand(-20, 20),
      rotationZ: rand(-20, 20),
    };
  });
}

export function getDeterministicRotationConfig(
  index: number,
  itemConfigs: RotatingItemConfig[],
): RotatingItemConfig {
  if (itemConfigs[index]) return itemConfigs[index];

  const seed = (index + 1) * 12345;
  const rand = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };

  return {
    rotationX: rand(70, 120),
    rotationY: rand(-20, 20),
    rotationZ: rand(-20, 20),
  };
}

export function filterElementArray(
  refs: RefObject<(HTMLElement | null)[]>,
): HTMLElement[] {
  return refs.current.filter((ref): ref is HTMLElement => ref !== null);
}

export function positionWrappers(
  wrapperRefs: RefObject<(HTMLElement | null)[]>,
): void {
  const wrappers = filterElementArray(wrapperRefs);
  if (wrappers.length === 0) return;

  const amplitude = window.innerWidth * 0.2;

  wrappers.forEach((wrap, i) => {
    if (i === 0 || i === wrappers.length - 1) {
      gsap.set(wrap, { x: 0 });
    } else {
      const angle = i * 0.45;
      gsap.set(wrap, { x: Math.sin(angle) * amplitude });
    }
  });
}

export function calculateMarqueePosition(
  items: HTMLElement[],
  marqueeInner: HTMLElement,
  gap = MARQUEE_GAP,
): { startX: number; endX: number } {
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const viewportCenter = window.innerWidth / 2;

  const firstHalfWidth = firstItem.offsetWidth / 2;
  const lastHalfWidth = lastItem.offsetWidth / 2;
  const textWidth = marqueeInner.offsetWidth;

  const startX = viewportCenter + firstHalfWidth + gap;
  const endX = viewportCenter - lastHalfWidth - textWidth - gap;

  return { startX, endX };
}

export function alignMarquee(
  marquee: HTMLElement,
  marqueeBg: HTMLElement | null,
  firstWrapper: HTMLElement,
): void {
  const targetTop = firstWrapper.offsetTop + firstWrapper.offsetHeight / 2;

  gsap.set(marquee, {
    top: targetTop,
    yPercent: -50,
  });

  if (marqueeBg) {
    gsap.set(marqueeBg, {
      top: targetTop,
      yPercent: -50,
      height: marquee.offsetHeight,
    });
  }
}
