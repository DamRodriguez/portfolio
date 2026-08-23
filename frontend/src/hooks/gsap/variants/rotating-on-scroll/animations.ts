import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEFAULT_ENTRANCE_ANIMATION } from "./constants";
import type { EntranceAnimationConfig, RotatingItemConfig } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface Gallery3DAnimationOptions {
  items: HTMLElement[];
  wrappers: HTMLElement[];
  getRotationConfig: (index: number) => RotatingItemConfig;
  zAmplitude: number;
  itemStart: string;
  itemEnd: string;
}

export function setupGallery3DAnimation({
  items,
  wrappers,
  getRotationConfig,
  zAmplitude,
  itemStart,
  itemEnd,
}: Gallery3DAnimationOptions): ScrollTrigger[] {
  const triggers: ScrollTrigger[] = [];

  items.forEach((item, index) => {
    const config = getRotationConfig(index);
    const setZ = gsap.quickSetter(item, "z", "px");
    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const wrap = wrappers[index];

    const startRot = {
      x: isFirst ? 0 : config.rotationX,
      y: isFirst ? 0 : config.rotationY,
      z: isFirst ? 0 : config.rotationZ,
    };
    const endRot = {
      x: isLast ? 0 : -config.rotationX,
      y: isLast ? 0 : -config.rotationY,
      z: isLast ? 0 : -config.rotationZ,
    };

    gsap.set(item, {
      transformStyle: "preserve-3d",
      rotationX: startRot.x,
      rotationY: startRot.y,
      rotationZ: startRot.z,
      z: 0,
    });

    const tween = gsap.fromTo(
      item,
      {
        rotationX: startRot.x,
        rotationY: startRot.y,
        rotationZ: startRot.z,
        z: 0,
      },
      {
        rotationX: endRot.x,
        rotationY: endRot.y,
        rotationZ: endRot.z,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: isFirst ? "center center" : itemStart,
          end: isLast ? "center center" : itemEnd,
          scrub: 2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setZ(Math.sin(self.progress * Math.PI) * -zAmplitude);
          },
        },
      },
    );

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return triggers;
}

interface MarqueeAnimationOptions {
  marquee: HTMLElement;
  marqueeBg: HTMLElement | null;
  wrappers: HTMLElement[];
  items: HTMLElement[];
  calculateMarqueePosition: (
    items: HTMLElement[],
    marqueeInner: HTMLElement,
  ) => { startX: number; endX: number };
}

interface MarqueeAnimationResult {
  timeline: gsap.core.Timeline | null;
  triggers: ScrollTrigger[];
}

export function setupMarqueeAnimation({
  marquee,
  marqueeBg,
  wrappers,
  items,
  calculateMarqueePosition,
}: MarqueeAnimationOptions): MarqueeAnimationResult {
  const triggers: ScrollTrigger[] = [];
  let timeline: gsap.core.Timeline | null = null;

  const marqueeInner = marquee.querySelector<HTMLElement>(".mark__inner");
  if (!marqueeInner || items.length === 0) {
    return { timeline, triggers };
  }

  const lastWrapper = wrappers[wrappers.length - 1];

  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: wrappers[0],
      start: "center center",
      endTrigger: lastWrapper,
      end: "center center",
      scrub: 2,
      pin: marquee,
      pinSpacing: false,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        const spacer = self.pin?.parentElement;
        if (spacer && spacer.classList.contains("pin-spacer")) {
          spacer.style.mixBlendMode = "difference";
          marquee.style.mixBlendMode = "normal";
        }
      },
    },
  });

  timeline.fromTo(
    marqueeInner,
    {
      x: () => {
        const { startX } = calculateMarqueePosition(items, marqueeInner);
        return startX;
      },
    },
    {
      x: () => {
        const { endX } = calculateMarqueePosition(items, marqueeInner);
        return endX;
      },
      ease: "none",
    },
  );

  if (timeline.scrollTrigger) triggers.push(timeline.scrollTrigger);

  if (marqueeBg) {
    const bgPin = ScrollTrigger.create({
      trigger: wrappers[0],
      start: "center center",
      endTrigger: lastWrapper,
      end: "center center",
      pin: marqueeBg,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
    triggers.push(bgPin);
  }

  return { timeline, triggers };
}

interface EntranceAnimationOptions {
  entranceAnimation?: EntranceAnimationConfig;
  items: HTMLElement[];
  marqueeInner: HTMLElement | null;
}

export function setupEntranceAnimation({
  entranceAnimation,
  items,
  marqueeInner,
}: EntranceAnimationOptions): ScrollTrigger[] {
  const config = {
    ...DEFAULT_ENTRANCE_ANIMATION,
    ...entranceAnimation,
  };

  if (!config.enabled) return [];

  const elementsToAnimate = [...items];
  if (marqueeInner) elementsToAnimate.push(marqueeInner);

  const from = config.from ?? {};
  const to = config.to ?? {};
  const triggers: ScrollTrigger[] = [];

  elementsToAnimate.forEach((el) => {
    gsap.set(el, from);
    const tween = gsap.to(el, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start: config.start,
        end: config.end,
        scrub: config.scrub,
        invalidateOnRefresh: true,
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return triggers;
}
