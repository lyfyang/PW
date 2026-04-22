"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

interface ShowcaseItem {
  title: string
  description: string
  year: string
  link: string
  image?: string
}

interface ProjectShowcaseProps {
  items: ShowcaseItem[]
  label?: string
}

export function ProjectShowcase({ items, label = "Selected Work" }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative w-full">
      <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-6">{label}</p>

      <div className="space-y-0">
        {items.map((item, index) => (
          <a
            key={item.title}
            href={item.link}
            className="group block cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
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
