"use client"
import { useRef } from "react"
import { useScrollAnimations } from "@/hooks/useScrollAnimations"

export default function HorizontalScrollTest() {

  const containerRef = useRef<HTMLDivElement>(null)

  useScrollAnimations({
    scope: containerRef,
    horizontal: {
      panels: ".panel"
    }
  })

  return (
    <section className="relative">
      <div ref={containerRef} className="flex h-screen">

        <div className="panel min-w-screen h-screen flex items-center justify-center text-5xl bg-red-error">
          Section 1
        </div>

        <div className="panel min-w-screen h-screen flex items-center justify-center text-5xl bg-green">
          Section 2
        </div>

        <div className="panel min-w-screen h-screen flex items-center justify-center text-5xl bg-soft-gray">
          Section 3
        </div>

        <div className="panel min-w-screen h-screen flex items-center justify-center text-5xl bg-soft-white">
          Section 4
        </div>

      </div>
    </section>
  )
}