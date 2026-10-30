"use client"

import { useEffect } from "react"
import Lenis from "lenis"

let lenis: Lenis | null = null

// Smooth, weighted scrolling for the whole site; plain native scrolling under reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
  return null
}

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y)
  else window.scrollTo({ top: y })
}
