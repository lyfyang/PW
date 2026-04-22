"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface ShowcaseItem {
  title: string
  description: string
  year: string
  link: string
  image: string
}

interface ProjectShowcaseProps {
  items: ShowcaseItem[]
  label?: string
}

export function ProjectShowcase({ items, label = "Selected Work" }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-6">{label}</p>

      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[260px] h-[160px] bg-secondary rounded-xl overflow-hidden">
          {items.map((item, index) => (
            <img
              key={item.title}
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.08,
                filter: hoveredIndex === index ? "none" : "blur(8px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      <div className="space-y-0">
        {items.map((item, index) => (
          <a
            key={item.title}
            href={item.link}
            className="group block cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-4 border-t border-border/60 transition-all duration-300 ease-out">
              <div
                className={`
                  absolute inset-0 -mx-3 px-3 bg-secondary/40 rounded-lg
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100" : "opacity-0"}
                `}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5">
                    <h3 className="text-foreground/90 font-normal text-sm tracking-tight">
                      <span className="relative">
                        {item.title}
                        <span
                          className={`
                            absolute left-0 -bottom-0.5 h-px bg-foreground/50
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    <ArrowUpRight
                      className={`
                        w-3 h-3 text-muted-foreground
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-1 translate-y-1"
                        }
                      `}
                    />
                  </div>

                  <p
                    className={`
                      text-xs mt-1 leading-relaxed italic
                      transition-colors duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/50" : "text-muted-foreground"}
                    `}
                  >
                    {item.description}
                  </p>
                </div>

                <span
                  className={`
                    text-xs font-mono text-muted-foreground tabular-nums shrink-0
                    transition-colors duration-300 ease-out
                    ${hoveredIndex === index ? "text-foreground/40" : ""}
                  `}
                >
                  {item.year}
                </span>
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-border/60" />
      </div>
    </section>
  )
}
