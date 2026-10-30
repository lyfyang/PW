"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { scrollToY } from "@/components/smooth-scroll"

// A small square in the corner that opens into the name on hover; on the home page it returns to the top.
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
        scrollToY(0)
      }}
    >
      <span className="nav__mark-name">Leo Yang</span>
    </Link>
  )
}
