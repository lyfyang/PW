"use client"

import { useEffect, useId, useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useCalm } from "@/components/motion"

// ─── focus: type melts into blobs off-centre and sets sharp as it reaches the middle ──────────

// A blur followed by a hard alpha threshold: letters soften, then fuse like liquid.
function useGoo(blur: MotionValue<number>) {
  const id = `goo${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  const node = useRef<SVGFEGaussianBlurElement>(null)
  useMotionValueEvent(blur, "change", (v) => node.current?.setAttribute("stdDeviation", v.toFixed(2)))
  const filter = useTransform(blur, (v) => (v < 0.25 ? "none" : `url(#${id})`))
  const defs = (
    <svg className="fx-defs" aria-hidden="true" focusable="false">
      <filter id={id} x="-10%" y="-20%" width="120%" height="140%">
        <feGaussianBlur ref={node} in="SourceGraphic" stdDeviation={blur.get().toFixed(2)} result="blur" />
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
      </filter>
    </svg>
  )
  return { defs, filter }
}

export function Focus({
  mode = "goo",
  max = 11,
  sharpAt = 0.3,
  className,
  children,
}: {
  mode?: "goo" | "blur"
  max?: number
  // how far through its pass across the screen the element is fully sharp
  sharpAt?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const calm = useCalm()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const blur = useTransform(scrollYProgress, [0, sharpAt, 0.8, 1], [max, 0, 0, max])
  const { defs, filter } = useGoo(blur)
  const soft = useTransform(blur, (v) => (v < 0.25 ? "none" : `blur(${(v * 0.5).toFixed(2)}px)`))
  return (
    <>
      {mode === "goo" && defs}
      <motion.div ref={ref} className={className} style={calm ? undefined : { filter: mode === "goo" ? filter : soft }}>
        {children}
      </motion.div>
    </>
  )
}

// ─── lines: big type set on the grid, each line (or each word of a line) starting on its own column ──

export type Line = { t: string; c: number }[]

export function Lines({ lines, as: Tag = "p", id, label }: { lines: Line[]; as?: "h1" | "h2" | "p"; id?: string; label?: string }) {
  return (
    <Tag id={id} className="lines" aria-label={label}>
      {lines.map((line, i) => (
        <span key={i} className="lines__line" aria-hidden={label ? true : undefined}>
          {line.map((seg, j) => (
            <span key={j} className="lines__seg" style={{ gridColumnStart: seg.c + 1 }}>
              {seg.t}
              {j < line.length - 1 || i < lines.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

// ─── orbit: two words part to the edges while a globe of the work grows and turns between them ──

export type Tile = { key: string; node: React.ReactNode }

const golden = Math.PI * (3 - Math.sqrt(5))

export function Orbit({ left, right, tiles, id, label }: { left: string; right: string; tiles: Tile[]; id: string; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const calm = useCalm()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const spread = useTransform(p, [0.04, 0.32], [0, 1])
  // how far the words travel is set in CSS (--spread), so phones can use less
  const leftX = useTransform(spread, (v) => `calc(var(--spread) * ${(-v).toFixed(3)})`)
  const rightX = useTransform(spread, (v) => `calc(var(--spread) * ${v.toFixed(3)})`)
  const wordBlur = useTransform(spread, [0, 0.7], [10, 0])
  const { defs, filter } = useGoo(wordBlur)

  const scale = useTransform(p, [0.06, 0.42, 1], [0.15, 1, 1.12])
  const opacity = useTransform(p, [0.04, 0.16], [0, 1])
  const spin = useMotionValue(0)
  useAnimationFrame((_, delta) => {
    if (!calm) spin.set(spin.get() + delta * 0.01)
  })
  const rotateY = useTransform(() => p.get() * 300 + spin.get())

  // tiles spread evenly over the sphere
  const n = tiles.length
  const placed = tiles.map((tile, i) => {
    const y = 1 - (i / (n - 1)) * 2
    // rounded, so the server and the browser print the same angles
    const lat = Math.round(((Math.asin(y) * 180) / Math.PI) * 100) / 100
    const lon = Math.round((((golden * i * 180) / Math.PI) % 360) * 100) / 100
    return { tile, lat, lon }
  })

  return (
    <section ref={ref} id={id} className="orbit" aria-label={label}>
      <div className="orbit__stage">
        {defs}
        <h2 className="orbit__words">
          <motion.span className="orbit__word" style={calm ? undefined : { x: leftX, filter }}>
            {left}
          </motion.span>
          <motion.span className="orbit__word" style={calm ? undefined : { x: rightX, filter }}>
            {right}
          </motion.span>
        </h2>
        {/* opacity lives on the wrapper: on the sphere itself it would flatten the 3D */}
        <motion.div className="orbit__space" style={calm ? undefined : { opacity }} aria-hidden="true">
          <motion.div className="orbit__sphere" style={calm ? { rotateX: -12 } : { rotateY, rotateX: -12, scale }}>
            {placed.map(({ tile, lat, lon }) => (
              <div key={tile.key} className="orbit__tile" style={{ transform: `rotateY(${lon}deg) rotateX(${lat}deg) translateZ(var(--r))` }}>
                <div className="orbit__face">{tile.node}</div>
                <div className="orbit__back" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── the name in the corners: two pale halves that close into one black name at the very end ──

export function CornerName({ first, last }: { first: string; last: string }) {
  const end = useRef<HTMLDivElement>(null)
  const a = useRef<HTMLSpanElement>(null)
  const b = useRef<HTMLSpanElement>(null)
  const calm = useCalm()
  const dA = useMotionValue(0)
  const dB = useMotionValue(0)

  // how far each half travels to meet the other in the middle
  useEffect(() => {
    const run = () => {
      if (!a.current || !b.current) return
      // measure at rest, before any travel
      a.current.style.transform = "none"
      b.current.style.transform = "none"
      const ra = a.current.getBoundingClientRect()
      const rb = b.current.getBoundingClientRect()
      const gap = ra.height * 0.18
      const start = (window.innerWidth - (ra.width + gap + rb.width)) / 2
      dA.set(start - ra.left)
      dB.set(start + ra.width + gap - rb.left)
    }
    run()
    window.addEventListener("resize", run)
    document.fonts?.ready.then(run)
    return () => window.removeEventListener("resize", run)
  }, [dA, dB])

  const { scrollYProgress: q } = useScroll({ target: end, offset: ["start end", "end end"] })
  const eased = useSpring(q, { stiffness: 220, damping: 40, restDelta: 0.0005 })
  const xA = useTransform(() => eased.get() * dA.get())
  const xB = useTransform(() => eased.get() * dB.get())
  const color = useTransform(eased, [0, 1], ["#e6e6e6", "#000000"])

  return (
    <>
      <div ref={end} className="corner-name__end" />
      <div className="corner-name" aria-hidden="true">
        <motion.span ref={a} style={calm ? undefined : { x: xA, color }}>
          {first}
        </motion.span>
        <motion.span ref={b} style={calm ? undefined : { x: xB, color }}>
          {last}
        </motion.span>
      </div>
    </>
  )
}

// ─── preview: a picture that follows the pointer over a list ──

export function usePreview() {
  const x = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 })
  const y = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 })
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return
    x.set(e.clientX)
    y.set(e.clientY)
  }
  return { x, y, onPointerMove }
}

export function Preview({ x, y, show, children }: { x: MotionValue<number>; y: MotionValue<number>; show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="preview"
      style={{ x, y }}
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.85 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}

// ─── the mark: a hypotrochoid, the line a point on a rolling circle traces, drawn in one stroke ──

function trochoid(R: number, r: number, d: number, steps: number) {
  const turns = 2 * Math.PI * r // closes after r turns when R and r share no factor
  const k = (R - r) / r
  const scale = 46 / (R - r + d)
  let path = ""
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns
    const x = 50 + scale * ((R - r) * Math.cos(t) + d * Math.cos(k * t))
    const y = 50 + scale * ((R - r) * Math.sin(t) - d * Math.sin(k * t))
    path += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return path
}

const MARK = trochoid(7, 3, 5.2, 900)

export function Mark({ className }: { className?: string }) {
  const calm = useCalm()
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 270])
  return (
    <motion.svg className={className} viewBox="0 0 100 100" role="img" aria-label="Leo Yang's mark: a rolling-circle curve" style={calm ? undefined : { rotate }}>
      <motion.path
        d={MARK}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />
    </motion.svg>
  )
}

// ─── ink: the pointer smears ink across the hero; it drifts, spreads, melts away, and a piece
// of the work shows faintly through it, a different one with every new stroke ──

type Drop = { x: number; y: number; vx: number; vy: number; r: number; life: number }

export function InkTrail({ images }: { images: string[] }) {
  const id = `ink${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  const haloRef = useRef<HTMLCanvasElement>(null)
  const inkRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const hc = haloRef.current
    const ic = inkRef.current
    const hx = hc?.getContext("2d")
    const ix = ic?.getContext("2d")
    if (!hc || !ic || !hx || !ix) return

    // the ink is simulated at half size; the melt filter hides the difference
    const S = 0.5
    let w = 0
    let h = 0
    const size = () => {
      const r = ic.getBoundingClientRect()
      w = Math.ceil(r.width * S)
      h = Math.ceil(r.height * S)
      for (const c of [hc, ic]) {
        c.width = w
        c.height = h
      }
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(ic)

    const pics = images.map((src) => {
      const im = new Image()
      im.src = src
      return im
    })
    let pic = 0
    let lastMove = 0
    let last: { x: number; y: number } | null = null
    const drops: Drop[] = []
    let raf = 0
    let running = false
    let t = 0

    const frame = () => {
      t += 0.016
      hx.clearRect(0, 0, w, h)
      ix.clearRect(0, 0, w, h)
      hx.fillStyle = "#f1f1f1"
      ix.fillStyle = "#000"
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        d.x += d.vx
        d.y += d.vy
        // a slow swirl, so the ink keeps moving after the pointer has gone
        d.vx = d.vx * 0.95 + Math.sin(d.y * 0.045 + t * 1.7) * 0.05
        d.vy = d.vy * 0.95 + Math.cos(d.x * 0.045 + t * 1.7) * 0.05
        d.r *= 1.007
        d.life -= 0.0095
        if (d.life <= 0) {
          drops.splice(i, 1)
          continue
        }
        hx.beginPath()
        hx.arc(d.x, d.y, d.r * 1.15 * Math.min(1, d.life * 2), 0, Math.PI * 2)
        hx.fill()
        const core = Math.max(0, (d.life - 0.5) / 0.5)
        if (core > 0) {
          ix.beginPath()
          ix.arc(d.x, d.y, d.r * 0.62 * core, 0, Math.PI * 2)
          ix.fill()
        }
      }
      const im = pics[pic]
      if (im?.complete && im.naturalWidth) {
        const k = Math.max(w / im.naturalWidth, h / im.naturalHeight)
        const iw = im.naturalWidth * k
        const ih = im.naturalHeight * k
        ix.globalCompositeOperation = "source-atop"
        ix.globalAlpha = 0.4
        ix.drawImage(im, (w - iw) / 2, (h - ih) / 2, iw, ih)
        ix.globalAlpha = 1
        ix.globalCompositeOperation = "source-over"
      }
      if (drops.length) raf = requestAnimationFrame(frame)
      else running = false
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = ic.getBoundingClientRect()
      if (e.clientY < r.top || e.clientY > r.bottom) {
        last = null
        return
      }
      const x = (e.clientX - r.left) * S
      const y = (e.clientY - r.top) * S
      const now = performance.now()
      if (now - lastMove > 600) {
        pic = (pic + 1) % pics.length
        last = null
      }
      lastMove = now
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        const n = Math.min(10, Math.ceil(dist / 4))
        for (let i = 0; i < n; i++) {
          const f = i / n
          drops.push({
            x: last.x + dx * f,
            y: last.y + dy * f,
            vx: dx * 0.07 + (Math.random() - 0.5) * 0.6,
            vy: dy * 0.07 + (Math.random() - 0.5) * 0.6,
            r: 6 + Math.min(dist, 60) * 0.26 + Math.random() * 4,
            life: 1,
          })
        }
        if (drops.length > 700) drops.splice(0, drops.length - 700)
        start()
      }
      last = { x, y }
    }
    const onLeave = () => {
      last = null
    }
    window.addEventListener("pointermove", onMove)
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [images])

  return (
    <>
      <svg className="fx-defs" aria-hidden="true" focusable="false">
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
        </filter>
      </svg>
      <canvas ref={haloRef} className="ink" style={{ filter: `url(#${id})` }} aria-hidden="true" />
      <canvas ref={inkRef} className="ink" style={{ filter: `url(#${id})` }} aria-hidden="true" />
    </>
  )
}
