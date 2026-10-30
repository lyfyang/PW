"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// The name stays pinned in the corner; on the home page it scrolls back to the top.
export function NavMark() {
  const pathname = usePathname()

  return (
    <Link
      href="/"
      className="nav__mark"
      aria-label="Leo Yang, back to top"
      onClick={(e) => {
        if (pathname !== "/") return
        e.preventDefault()
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }}
    >
      Leo Yang
    </Link>
  )
}
