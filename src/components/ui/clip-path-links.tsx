"use client"

import React, { useState, useRef, useEffect } from "react"
import { SiGithub, SiInstagram } from "react-icons/si"
import { FaLinkedinIn } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { useAnimate, motion, AnimatePresence } from "framer-motion"

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)"
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)"
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)"
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)"

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
}

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
}

type Side = "left" | "right" | "top" | "bottom"

const EmailBox = ({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) => {
  const [scope, animate] = useAnimate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const getNearestSide = (e: React.MouseEvent): Side => {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const sides = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" as Side },
      { proximity: Math.abs(box.right - e.clientX), side: "right" as Side },
      { proximity: Math.abs(box.top - e.clientY), side: "top" as Side },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" as Side },
    ]
    return sides.sort((a, b) => a.proximity - b.proximity)[0].side
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] })
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative grid h-20 w-full place-content-center text-foreground bg-background cursor-pointer"
      >
        <Icon className="w-5 h-5 text-foreground/60" />
        <div
          ref={scope}
          style={{ clipPath: BOTTOM_RIGHT_CLIP }}
          className="absolute inset-0 grid place-content-center bg-foreground/90 transition-colors duration-300"
        >
          <Icon className="w-5 h-5 text-background" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-2 z-50 bg-[#111] border border-border/50 rounded-md px-4 py-3 text-xs text-foreground/70 whitespace-nowrap shadow-lg"
          >
            <p className="text-muted-foreground font-mono tracking-widest uppercase mb-1" style={{ fontSize: "0.6rem" }}>
              contact
            </p>
            <a
              href="mailto:leoyyf2007@gmail.com"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              leoyyf2007@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const LinkBox = ({ Icon, href }: { Icon: React.ComponentType<{ className?: string }>; href: string }) => {
  const [scope, animate] = useAnimate()

  const getNearestSide = (e: React.MouseEvent): Side => {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const sides = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" as Side },
      { proximity: Math.abs(box.right - e.clientX), side: "right" as Side },
      { proximity: Math.abs(box.top - e.clientY), side: "top" as Side },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" as Side },
    ]
    return sides.sort((a, b) => a.proximity - b.proximity)[0].side
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center text-foreground bg-background cursor-pointer"
    >
      <Icon className="w-5 h-5 text-foreground/60" />
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-foreground/90 transition-colors duration-300"
      >
        <Icon className="w-5 h-5 text-background" />
      </div>
    </a>
  )
}

export const ClipPathLinks = () => {
  return (
    <div className="divide-y border divide-border border-border">
      <div className="grid grid-cols-2 divide-x divide-border">
        <LinkBox Icon={SiInstagram} href="https://www.instagram.com/leo.yyng/" />
        <LinkBox Icon={FaLinkedinIn} href="https://www.linkedin.com/in/leo-yang-a0b193363/" />
      </div>
      <div className="grid grid-cols-2 divide-x divide-border">
        <LinkBox Icon={SiGithub} href="https://github.com/leoy1016" />
        <EmailBox Icon={MdOutlineEmail} />
      </div>
    </div>
  )
}
