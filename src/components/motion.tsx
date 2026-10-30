"use client"

import { useSyncExternalStore } from "react"
import { MotionConfig, motion } from "motion/react"

// One motion language for the whole site. Visitors who ask for reduced motion get every element in place.

export const EASE = [0.76, 0, 0.24, 1] as const
export const EASE_OUT = [0.25, 1, 0.5, 1] as const

// Reduced-motion preference that matches the server on the first render, then follows the browser.
const calmQuery = "(prefers-reduced-motion: reduce)"
export function useCalm() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(calmQuery)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia(calmQuery).matches,
    () => false
  )
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT, duration: 0.6 }}>{children}</MotionConfig>
}

// Rises in once as it enters the screen.
export function Rise({ index = 0, className, children }: { index?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      {children}
    </motion.div>
  )
}
