"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Entrances: each [data-reveal] rises in once as it enters the viewport.
// Without this script (no .js on <html>) nothing is ever hidden.
export function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0 }
    )
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
