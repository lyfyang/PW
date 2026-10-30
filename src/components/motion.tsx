"use client"

import { Fragment, useRef, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

// One motion language for the whole site: the same out-curve and spring everywhere.
// Visitors who ask for reduced motion get every element in place, without movement.

const EASE = [0.22, 1, 0.36, 1] as const
const SPRING = { stiffness: 160, damping: 22, mass: 0.6 }

// Reduced-motion preference that matches the server on the first render, then follows the browser.
const calmQuery = "(prefers-reduced-motion: reduce)"
function useCalm() {
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
  return <MotionConfig reducedMotion="user" transition={{ ease: EASE, duration: 0.9 }}>{children}</MotionConfig>
}

// Thin lime line along the top edge: how far down the page you are.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

// The name rises out of its baseline, then the two words drift apart as the hero leaves.
export function Wordmark({ words, sup }: { words: string[]; sup: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduce = useCalm()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const spread = useTransform(scrollYProgress, [0, 1], [0, 9])
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25])

  return (
    <motion.h1 ref={ref} id="title" className="wordmark" style={reduce ? undefined : { opacity: fade }}>
      {words.map((w, i) => (
        <Fragment key={w}>
          {i > 0 && " "}
          <Drift spread={spread} dir={i === 0 ? -1 : 1} still={!!reduce}>
            <motion.span
              className="wordmark__word"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.12 }}
            >
              {w}
            </motion.span>
          </Drift>
        </Fragment>
      ))}
      <motion.sup initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}>
        {sup}
      </motion.sup>
    </motion.h1>
  )
}

function Drift({ spread, dir, still, children }: { spread: MotionValue<number>; dir: number; still: boolean; children: React.ReactNode }) {
  const x = useTransform(spread, (v) => `${v * dir}%`)
  return (
    <motion.span className="wordmark__mask" style={still ? undefined : { x }}>
      {children}
    </motion.span>
  )
}

// A heading whose words rise in one after another as it enters the screen.
export function SplitHeading({
  as: Tag = "h2",
  id,
  className,
  children,
}: {
  as?: "h2" | "h3"
  id?: string
  className?: string
  children: string
}) {
  const MotionTag = motion[Tag]
  const words = children.split(" ")
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ staggerChildren: 0.06 }}
      aria-label={children}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="split__mask" aria-hidden="true">
            <motion.span
              className="split__word"
              variants={{ hidden: { y: "110%" }, shown: { y: 0 } }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </MotionTag>
  )
}

// Rises in once, with a small stagger by position.
export function Rise({ index = 0, className, children }: { index?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 56, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1, ease: EASE, delay: (index % 3) * 0.1 }}
    >
      {children}
    </motion.div>
  )
}

// The card leans toward the pointer, with a soft light where the pointer is. Mouse only.
export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useCalm()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), SPRING)
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), SPRING)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.16), transparent 42%)` // taste-skill-ignore: a pointer light shown only on hover, not a fill
  const [on, setOn] = useState(false)

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={`tilt ${className ?? ""}`}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
        setOn(true)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
        setOn(false)
      }}
    >
      {on && (
        <motion.span
          className="tilt__glare"
          style={{ background: glare }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  )
}

// A picture that moves a little slower than the page inside its card.
export function Parallax({ amount = 7, children }: { amount?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useCalm()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className="parallax">
      <motion.div className="parallax__inner" style={reduce ? undefined : { y, scale: 1 + (amount * 2.4) / 100 }}>
        {children}
      </motion.div>
    </div>
  )
}

// The card settles from slightly smaller to full size as it comes up the screen.
export function Grow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useCalm()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const s = useSpring(scale, { stiffness: 220, damping: 32 })
  return (
    <motion.div ref={ref} style={reduce ? undefined : { scale: s }}>
      {children}
    </motion.div>
  )
}

// Pulls a little toward the pointer while it is over it.
export function Magnetic({ strength = 0.18, children }: { strength?: number; children: React.ReactNode }) {
  const reduce = useCalm()
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  if (reduce) return <>{children}</>
  return (
    <motion.div
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

// Nav links share one lime pill that slides to whichever link is under the pointer.
export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <ul className="nav__links" onPointerLeave={() => setHovered(null)}>
      {links.map((l) => (
        <li key={l.href} onPointerEnter={() => setHovered(l.href)}>
          {hovered === l.href && (
            <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden="true" />
          )}
          <Link className={`link${hovered === l.href ? " is-hot" : ""}`} href={l.href}>{l.label}</Link>
        </li>
      ))}
    </ul>
  )
}
