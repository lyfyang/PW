"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { EASE } from "@/components/motion"

type Item = { href: string; label: string }

// A black pill in the corner opens the whole screen as a menu.
export function Menu({ links, email, socials }: { links: Item[]; email: string; socials: Item[] }) {
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const first = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    first.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        button.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <button
        ref={button}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="menu__links">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  style={{ gridColumnStart: (i % 3) + 2 }}
                >
                  <Link ref={i === 0 ? first : undefined} href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="menu__foot">
              <span>Write directly to:</span>
              <a href={`mailto:${email}`}>{email}</a>
              <span className="menu__socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href}>
                    {s.label}
                  </a>
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
