"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function HFEPRPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-10 py-20">

        {/* back */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="text-muted-foreground text-xs font-mono tracking-widest hover:text-foreground/70 transition-colors cursor-pointer"
          >
            ← back
          </Link>
        </motion.div>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 mb-16"
        >
          <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-4">
            research / 2025
          </p>
          <h1
            className="text-foreground/90 font-light leading-tight mb-4"
            style={{ fontSize: "1.4rem", fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: "-0.01em" }}
          >
            High Field Electron Paramagnetic Resonance Prototyping
          </h1>
          <p className="text-muted-foreground text-xs">
            Independent Researcher · UCSB Institute for Terahertz Technology and Science
          </p>
        </motion.div>

        {/* content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          {/* overview */}
          <section className="space-y-4">
            <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">overview</p>
            <p className="text-foreground/75 text-sm leading-relaxed" style={{ lineHeight: "1.9" }}>
              Electron Paramagnetic Resonance (EPR) spectroscopy probes unpaired electron spin states in
              paramagnetic materials by measuring transitions between Zeeman-split energy levels under an
              applied static magnetic field. At high field strengths (typically above 3 T) the technique
              achieves substantially enhanced spectral resolution and sensitivity, enabling discrimination of
              otherwise-overlapping hyperfine interactions and precise determination of g-tensor anisotropy
              in complex molecular systems.
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed" style={{ lineHeight: "1.9" }}>
              This project focused on the mechanical and cryogenic engineering challenges of angular-dependent
              high-field EPR measurements, where sample orientation relative to the static field axis
              critically governs the observable spin Hamiltonian parameters.
            </p>
          </section>

          <div className="border-t border-border/30" />

          {/* instrument design */}
          <section className="space-y-4">
            <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">instrument design</p>
            <p className="text-foreground/75 text-sm leading-relaxed" style={{ lineHeight: "1.9" }}>
              The core contribution was the design and fabrication of a rotating cryogenic EPR sample holder
              compatible with the institute's high-field spectrometer operating at 95–240 GHz (3.4–8.6 T).
              The holder achieves continuous angular rotation of the sample across the full 360° range while
              maintaining thermal contact with a liquid helium cryostat, sustaining sample temperatures
              below 10 K throughout acquisition.
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed" style={{ lineHeight: "1.9" }}>
              Material selection prioritized low microwave absorption cross-section and mechanical stability
              under repeated thermal cycling. The design eliminated the need for commercially sourced
              goniometric cryostats, reducing instrument cost from approximately $20,000 to under $20,
              without sacrificing angular precision or thermal performance. Positional reproducibility
              was verified against reference samples with known g-anisotropy.
            </p>
          </section>

          <div className="border-t border-border/30" />

          {/* findings */}
          <section className="space-y-4">
            <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">findings & output</p>
            <p className="text-foreground/75 text-sm leading-relaxed" style={{ lineHeight: "1.9" }}>
              Angular-dependent EPR spectra acquired with the prototype revealed clear modulation of
              resonance field positions consistent with axial g-tensor symmetry, confirming the holder's
              viability for orientation-resolved spin Hamiltonian parameterization. Spectral linewidths
              were comparable to those obtained with commercial instrumentation at equivalent field and
              temperature conditions.
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed" style={{ lineHeight: "1.9" }}>
              The work resulted in a co-authored paper with the principal investigator and graduate
              collaborators, and was presented as a research poster to an audience of 100+ at an institute
              symposium. The fabrication methodology and holder design have since been adopted for ongoing
              spectroscopic investigations within the lab.
            </p>
          </section>

          <div className="border-t border-border/30" />

          {/* collab */}
          <section className="space-y-3">
            <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">collaborators</p>
            <p className="text-foreground/60 text-sm" style={{ lineHeight: "1.9" }}>
              UCSB Institute for Terahertz Technology and Science: PI, graduate researchers
            </p>
          </section>

        </motion.div>

        <div className="h-24" />
      </div>
    </div>
  )
}
