"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { RefObject } from "react"
import useBreakpoint from "./useBreakpoint"
import config from "@/config/config"

gsap.registerPlugin(ScrollTrigger)

export type ScrollAnimationConfig = {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  scrollTrigger?: {
    trigger?: ScrollTrigger.Vars["trigger"]
    start?: ScrollTrigger.Vars["start"]
    end?: ScrollTrigger.Vars["end"]
    scrub?: boolean | number
    markers?: boolean
    pin?: boolean
    snap?: number | ScrollTrigger.SnapVars
  }
} & gsap.TweenVars

type HorizontalConfig = {
  panels: string
  container?: string
}

type UseScrollAnimationsProps = {
  animations?: Record<string, ScrollAnimationConfig>
  horizontal?: HorizontalConfig
  scope?: RefObject<Element | null>
  disabled?: boolean
  scrollTriggerDefaults?: Partial<ScrollTrigger.Vars>
}

export function useScrollAnimations({
  animations = {},
  horizontal,
  scope,
  disabled = false,
  scrollTriggerDefaults
}: UseScrollAnimationsProps) {

  const isDeskXl = useBreakpoint(Number(config.breakpoints.xl))
  const topDistance = isDeskXl ? "8%" : "20%"

  const BASE_SCROLL_TRIGGER: ScrollTrigger.Vars = {
    start: `top ${topDistance}`,
    end: "+=300",
    scrub: 2.5,
  }

  const DEFAULT_SCROLL_TRIGGER: ScrollTrigger.Vars = {
    ...BASE_SCROLL_TRIGGER,
    ...scrollTriggerDefaults
  }

  useGSAP(
    (context) => {

      if (disabled) {
        context.revert()
        return
      }

      const root = scope?.current || document

      /* ---------- NORMAL ANIMATIONS ---------- */

      Object.entries(animations).forEach(([target, animation]) => {
        const { from, to, scrollTrigger, ...vars } = animation

        const triggerConfig: ScrollTrigger.Vars = {
          ...DEFAULT_SCROLL_TRIGGER,
          ...(scrollTrigger as ScrollTrigger.Vars),
          trigger: scrollTrigger?.trigger ?? target,
        }

        if (from && to) {
          gsap.fromTo(target, from, {
            ...to,
            scrollTrigger: triggerConfig,
          })
        } else if (to) {
          gsap.to(target, {
            ...to,
            scrollTrigger: triggerConfig,
          })
        } else {
          gsap.to(target, {
            ...vars,
            scrollTrigger: triggerConfig,
          })
        }
      })

      /* ---------- HORIZONTAL SCROLL ---------- */

      if (horizontal) {
        const panels = gsap.utils.toArray<HTMLElement>(horizontal.panels, root)

        if (!panels.length) return

        const container = horizontal.container
          ? (root as Element).querySelector<HTMLElement>(horizontal.container)!
          : panels[0].parentElement!

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            pin: true,
            scrub: 0.2,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0,
              inertia: false
            },
            end: () => `+=${container.offsetWidth}`
          }
        })
      }
    },
    {
      scope,
      dependencies: [animations, horizontal, disabled],
      revertOnUpdate: true
    }
  )
}