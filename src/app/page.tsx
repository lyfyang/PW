"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Waves } from "@/components/ui/wave-background"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

import { FileTree } from "@/components/ui/file-tree"
import { ProjectShowcase } from "@/components/ui/project-showcase"
import { ClipPathLinks } from "@/components/ui/clip-path-links"

// ─── data ────────────────────────────────────────────────────────────────────

const navTree = [
  {
    name: "leo yang",
    type: "folder" as const,
    children: [
      { name: "bio.md", type: "file" as const, extension: "md", id: "bio" },
      {
        name: "projects",
        type: "folder" as const,
        children: [
          { name: "claudius.md", type: "file" as const, extension: "md", id: "proj-0" },
          { name: "meridian.md", type: "file" as const, extension: "md", id: "proj-1" },
          { name: "lattice.md", type: "file" as const, extension: "md", id: "proj-2" },
        ],
      },
      {
        name: "research",
        type: "folder" as const,
        children: [
          { name: "hf-epr.md", type: "file" as const, extension: "md", id: "res-0" },
          { name: "attention-multimodal.md", type: "file" as const, extension: "md", id: "res-1" },
          { name: "sparse-repr.md", type: "file" as const, extension: "md", id: "res-2" },
        ],
      },
      {
        name: "socials",
        type: "folder" as const,
        children: [
          { name: "instagram.lnk", type: "file" as const, extension: "md", id: "ig" },
          { name: "linkedin.lnk", type: "file" as const, extension: "md", id: "li" },
          { name: "github.lnk", type: "file" as const, extension: "md", id: "li" },
          { name: "email.lnk", type: "file" as const, extension: "md", id: "li" },
        ],
      },
    ],
  },
]

const projects = [
  {
    title: "Claudius",
    description: "Agentic CLI for natural language software engineering workflows.",
    year: "2025",
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop",
  },
  {
    title: "Meridian",
    description: "Spatial computing interface toolkit for ambient display systems.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&auto=format&fit=crop",
  },
  {
    title: "Lattice",
    description: "Real-time distributed state synchronization for collaborative tools.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop",
  },
]

const research = [
  {
    title: "High Field Electron Paramagnetic Resonance Prototyping",
    description: "Engineered a precision rotating cryogenic EPR sample holder achieving a 99.9% cost reduction, enabling high-sensitivity spin-state characterization at sub-kelvin temperatures in collaboration with UCSB's Institute for Terahertz Technology and Science.",
    year: "2025",
    link: "/research/hf-epr",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop",
  },
  {
    title: "Attention Mechanisms in Multimodal Systems",
    description: "Cross-modal attention routing and its effect on grounding fidelity in vision-language models.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=600&auto=format&fit=crop",
  },
  {
    title: "Sparse Representation Learning",
    description: "Dictionary learning approaches for interpretable feature decomposition in transformer residual streams.",
    year: "2023",
    link: "#",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop",
  },
]

const sectionIds = ["bio", "projects", "research", "socials"]

// ─── fade-in wrapper ──────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.05 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeFile, setActiveFile] = useState<string>("bio")

  const bioRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const researchRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    bio: bioRef,
    "proj-0": projectsRef,
    "proj-1": projectsRef,
    "proj-2": projectsRef,
    "res-0": researchRef,
    "res-1": researchRef,
    "res-2": researchRef,
    ig: socialsRef,
    li: socialsRef,
    projects: projectsRef,
    research: researchRef,
    socials: socialsRef,
  }

  const handleFileClick = (id: string) => {
    setActiveFile(id)
    const ref = sectionRefs[id]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // track active section on scroll
  useEffect(() => {
    const sections: { id: string; ref: React.RefObject<HTMLDivElement | null> }[] = [
      { id: "bio", ref: bioRef },
      { id: "proj-0", ref: projectsRef },
      { id: "res-0", ref: researchRef },
      { id: "ig", ref: socialsRef },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((s) => s.ref.current === entry.target)
            if (matched) setActiveFile(matched.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* ── hero ── */}
      <section className="relative h-screen flex flex-col items-start justify-end overflow-hidden">
        {/* wave background */}
        <div className="absolute inset-0 z-0">
          <Waves strokeColor="#3a3a3a" backgroundColor="#0A0A0A" pointerSize={0} />
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/20 via-transparent to-background" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/60 to-transparent" />

        {/* hero content */}
        <div className="relative z-20 px-10 pb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-foreground/50 text-xs font-mono tracking-widest uppercase mb-4">
              portfolio
            </p>
            <h1
              className="text-foreground/90 font-light leading-none mb-3"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.1rem" }}
            >
              Leo Yang
            </h1>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mb-8 italic" style={{ lineHeight: "1.7" }}>
              researcher and builder. interested in language, cognition, and the systems that emerge at their intersection.
            </p>

            <div className="flex items-center gap-3">
              <LiquidButton
                size="sm"
                onClick={() => handleFileClick("ig")}
                className="text-foreground/70 text-xs"
              >
                instagram
              </LiquidButton>
              <LiquidButton
                size="sm"
                onClick={() => handleFileClick("li")}
                className="text-foreground/70 text-xs"
              >
                linkedin
              </LiquidButton>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="text-muted-foreground text-xs font-mono tracking-widest" style={{ fontSize: "0.6rem" }}>
            scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── section divider ── */}
      <div className="flex items-center justify-center py-16 px-10">
        <div className="flex-1 border-t border-border/20" />
        <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mx-6">work</p>
        <div className="flex-1 border-t border-border/20" />
      </div>

      {/* ── main two-column layout ── */}
      <div className="flex min-h-screen">
        {/* sidebar */}
        <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border/40 p-4 flex flex-col">
          <FileTree
            data={navTree}
            className="flex-1 border-none bg-transparent p-0"
            onFileClick={handleFileClick}
            activeFile={activeFile}
          />

          <div className="mt-auto pt-4 border-t border-border/30">
            <p className="text-muted-foreground font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              leo yang / 2025
            </p>
          </div>
        </aside>

        {/* content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-12 py-20 space-y-28">

            {/* bio */}
            <section ref={bioRef} id="bio">
              <FadeIn>
                <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-8">
                  bio.md
                </p>
                <div className="space-y-4">
                  <p className="text-foreground/80 text-sm leading-relaxed font-light italic" style={{ lineHeight: "1.85" }}>
                    i build things at the edges of language and computation. currently exploring how
                    neural representations scale, compose, and occasionally surprise us.
                  </p>
                  <p className="text-foreground/60 text-sm leading-relaxed font-light italic" style={{ lineHeight: "1.85" }}>
                    previously: ml research at various labs, some compilers work, a stint writing frontend
                    for longer than i care to admit. i find most interesting the places where tools become
                    extensions of thought rather than just instruments of it.
                  </p>
                  <p className="text-foreground/60 text-sm leading-relaxed font-light italic" style={{ lineHeight: "1.85" }}>
                    outside of work: film, long-form essays, climbing, and the occasional over-engineered
                    personal project.
                  </p>
                </div>
              </FadeIn>
            </section>

            {/* divider */}
            <div className="border-t border-border/30" />

            {/* projects */}
            <section ref={projectsRef} id="projects">
              <FadeIn delay={0.05}>
                <ProjectShowcase items={projects} label="projects" />
              </FadeIn>
            </section>

            {/* divider */}
            <div className="border-t border-border/30" />

            {/* research */}
            <section ref={researchRef} id="research">
              <FadeIn delay={0.05}>
                <ProjectShowcase items={research} label="research" />
              </FadeIn>
            </section>

            {/* divider */}
            <div className="border-t border-border/30" />

            {/* socials */}
            <section ref={socialsRef} id="socials">
              <FadeIn delay={0.05}>
                <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-8">
                  socials
                </p>
                <ClipPathLinks />
              </FadeIn>
            </section>

            <div className="h-20" />
          </div>
        </main>
      </div>
    </div>
  )
}
