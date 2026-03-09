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
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
  }
} & gsap.TweenVars

type UseScrollAnimationsProps = {
  animations: Record<string, ScrollAnimationConfig>
  scope?: RefObject<Element | null>
  disabled?: boolean
}

export function useScrollAnimations({
  animations,
  scope,
  disabled = false
}: UseScrollAnimationsProps) {
  const isDeskXl = useBreakpoint(Number(config.breakpoints.xl));
  const topDistance = isDeskXl ? "10%" : "20%";

  const DEFAULT_SCROLL_TRIGGER: ScrollTrigger.Vars = {
    start: `top ${topDistance}`,
    end: "+=300",
    scrub: 2.5,
  }

  useGSAP(
    (context) => {
      if (disabled) {
        context.revert()
        return
      }

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
    },
    {
      scope,
      dependencies: [disabled, animations],
      revertOnUpdate: true
    }
  )
}