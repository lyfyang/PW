"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Drawing, type DrawingId } from "@/components/drawings"
import { EMAIL, SOCIALS, SiteFooter, SiteNav } from "@/components/site"

// ─── data ────────────────────────────────────────────────────────────────────

type Picture = { src: string; alt: string } | { draw: DrawingId; alt: string }

const projects: {
  name: string
  year: string
  description: string
  link?: { href: string; label: string }
  picture: Picture
}[] = [
  {
    name: "StrokeShield",
    year: "2026",
    description:
      "Voice-guided BE-FAST stroke screening built at HopHacks. In-browser MediaPipe computer vision checks face and arm symmetry, an ElevenLabs voice agent walks the user through each step, and a FastAPI backend sends an SMS alert when checks flag risk.",
    link: { href: "https://www.strokeshield.health/", label: "Open the demo" },
    picture: { src: "/img/demo-strokeshield.jpg", alt: "StrokeShield's start screen: “A guided BE-FAST check, in about two minutes”, with the four checks listed" },
  },
  {
    name: "Meridian",
    year: "2024",
    description:
      "Building a quantitative execution system for regulated binary derivatives markets using ML-based probability calibration, stochastic intra-bar simulation, and adaptive position sizing with live order routing via REST API.",
    picture: { draw: "calibration", alt: "Drawing of a calibration curve: predicted probability against observed frequency" },
  },
  {
    name: "Artemis II Live Trajectory Dashboard",
    year: "2025",
    description:
      "Real-time trajectory, telemetry, and mission data for NASA's Artemis II flight, built with a team of 7 on Node.js and Vercel for the 2025 NASA App Development Challenge. Led backend, logistics, and outreach.",
    link: { href: "https://nasa-app-zeta.vercel.app", label: "Open the dashboard" },
    picture: { draw: "trajectory", alt: "Drawing of Artemis II's free-return path from Earth around the Moon and back" },
  },
  {
    name: "Match Prediction via Optimized Player Ratings",
    year: "2025",
    description:
      "With Dr. Benoit Legat (UCLouvain): a rating-based tennis match predictor on Universal Tennis Rating data, fitting player ratings and outcome weights by minimizing ranking error and validating against held-out matches.",
    picture: { draw: "ratings", alt: "Drawing of win probability rising with the rating gap between two players" },
  },
  {
    name: "Olympic Sport Selection Model",
    year: "2025",
    description:
      "HiMCM Meritorious Winner. A two-layer Analytic Hierarchy Process model scoring candidate Olympic sports across 23 features from IOC and Kaggle data, matching historical selections with a Pearson correlation of 0.9955.",
    picture: { draw: "hierarchy", alt: "Drawing of the hierarchy: the goal, five criteria, and candidate sports" },
  },
  {
    name: "Matrix Charging Systems",
    year: "2025",
    description:
      "Led team of 3 in brainstorming and development, and outreach for a novel EV charging concept using automated guided vehicles, with the focus of improving EV user retention in the US by promoting EV charging infrastructure accessibility and reducing space constraints of charging piles. Submitted to Conrad Challenge 2025.",
    picture: { draw: "charging", alt: "Drawing of a parking lot where a charging robot drives to the car" },
  },
]

function PictureView({ picture, className }: { picture: Picture; className?: string }) {
  if ("draw" in picture) {
    return (
      <div className={className}>
        <Drawing id={picture.draw} label={picture.alt} />
      </div>
    )
  }
  return (
    <img
      className={className}
      src={picture.src}
      alt={picture.alt}
      width={1440}
      height={900}
      loading="lazy"
    />
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState(0)
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  // the row that crosses the middle of the viewport becomes the active one
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: "-48% 0px -48% 0px" }
    )
    rowRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  // the loop rests under reduced motion and off screen
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce.matches) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <SiteNav />

      <main>
        {/* ── hero ── */}
        <section className="hero" aria-labelledby="title">
          <div className="hero__stage">
            <div className="hero__picture blueprint">
              <img
                src="/img/epr-cross-section.png"
                alt="Cross-section of the rotating EPR sample holder: bevel gears turn the sample inside the modulation coil"
                width={1230}
                height={1228}
                fetchPriority="high"
              />
            </div>
            <div className="hero__text">
              <h1 id="title" className="display rise">Leo<br />Yang</h1>
              <div className="hero__aside rise" style={{ "--i": 2 } as React.CSSProperties}>
                <p>
                  Applied math and computer science at Johns Hopkins. I build lab instruments, prediction models
                  and web apps.
                </p>
                <a className="button" href={`mailto:${EMAIL}`}>Email me</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── research ── */}
        <section id="research" aria-label="Research">
          <div className="frame">
            <div className="frame__bg frame__bg--figure blueprint">
              <img
                src="/img/epr-top-view.png"
                alt="Top view of the sample holder: the sample sits at the centre of the turning gear"
                width={1242}
                height={1076}
                loading="lazy"
              />
            </div>
            <article className="card" data-reveal>
              <h2>Rotating EPR sample holder</h2>
              <p>UCSB Sherwin Group, 2025</p>
              <p className="card__fact">$20,000 instrument, rebuilt for under $20</p>
              <img
                className="card__thumb card__thumb--plot"
                src="/img/epr-spectra.png"
                alt="EPR spectra at orientations from 5° to 200°, the resonance shifting with angle"
                width={598}
                height={470}
                loading="lazy"
              />
              <p>
                A fully mechanical holder for a 95–240 GHz spectrometer: bevel gears turn the sample a full 360° below
                10 K, and two resistances report its angle.
              </p>
              <Link className="button button--blue" href="/research/hf-epr">Read the research</Link>
            </article>
          </div>

          <div className="frame frame--second">
            <div className="frame__bg frame__bg--plan">
              <img
                src="/img/torii-blueprint.jpg"
                alt="Blueprint elevations of Itsukushima's great torii, front and side, with dimensions"
                width={2400}
                height={1610}
                loading="lazy"
              />
            </div>
            <article className="card" data-reveal>
              <h3 data-reveal style={{ "--i": 1 } as React.CSSProperties}>Itsukushima Shrine, in LEGO</h3>
              <p>Pioneer Research Program, 2025</p>
              <p className="card__fact">A heritage site for a line built on skylines</p>
              <img
                className="card__thumb"
                src="/img/lego-skyline.jpg"
                alt="My digital LEGO model: the torii, worship hall, Senjokaku pavilion and five-storied pagoda on one base"
                width={1898}
                height={915}
                loading="lazy"
              />
              <p>
                How LEGO&apos;s product and marketing frameworks decide which cultures get represented. I audited the
                Skyline line&apos;s bias toward Western megacities, then designed a 450–750 piece model of the
                UNESCO-listed shrine within in-production parts and colours.
              </p>
            </article>
          </div>
        </section>

        {/* ── projects ── */}
        <section id="projects" className="projects" aria-labelledby="projects-title">
          <div className="projects__picture" aria-hidden="true">
            {projects.map((p, i) => (
              <PictureView key={p.name} picture={p.picture} className={i === active ? "is-active" : undefined} />
            ))}
          </div>
          <div className="projects__body">
            <h2 id="projects-title" className="display" data-reveal>Projects</h2>
            <ul className="plist">
              {projects.map((p, i) => (
                <li
                  key={p.name}
                  ref={(el) => { rowRefs.current[i] = el }}
                  data-index={i}
                  className={`plist__item${i === active ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                >
                  <h3 className="plist__row">
                    <span>{p.name}</span>
                    <span>{p.year}</span>
                  </h3>
                  <p>{p.description}</p>
                  {p.link && (
                    <a
                      className="link"
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onFocus={() => setActive(i)}
                    >
                      {p.link.label} →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── currently working on ── */}
        <section className="now" aria-labelledby="now-title">
          <div className="now__text">
            <h2 id="now-title" className="display" data-reveal>
              <Link className="link" href="/current">Currently working on →</Link>
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Y Clonebinator, and a stealth project with the Johns Hopkins Software Engineering Club.
            </p>
          </div>
          <Link href="/current" className="now__picture" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <img
              src="/img/demo-clonebinator.jpg"
              alt="Y Clonebinator: “Someone already built your idea”, with a box to describe a startup idea"
              width={1440}
              height={900}
              loading="lazy"
            />
          </Link>
        </section>

        {/* ── experience and education ── */}
        <section id="experience" className="about" aria-labelledby="about-title">
          <h2 id="about-title" className="display" data-reveal>Experience<br />&amp; education</h2>
          <ol className="about__list">
            <li className="about__item">
              <figure className="about__media shutter" data-reveal>
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/img/3d-printing-time-lapse-2026-poster.jpg"
                  width={854}
                  height={480}
                  aria-label="Time-lapse of a 3D printer laying down a part"
                >
                  <source src="/img/3d-printing-time-lapse-2026.webm" type="video/webm" />
                </video>
              </figure>
              <h3 data-reveal style={{ "--i": 1 } as React.CSSProperties}>Summer Researcher, Sherwin Group</h3>
              <p className="about__role" data-reveal style={{ "--i": 2 } as React.CSSProperties}>UC Santa Barbara · Jun–Aug 2025</p>
              <p>
                Designed and 3D-printed a rotating cryogenic sample holder for a 95–240 GHz EPR spectrometer.
                Co-authored the paper and presented it to 100+ attendees.
              </p>
            </li>
            <li className="about__item">
              <div className="about__media shutter" data-reveal>
                <Drawing id="sitemap" label="Drawing of the nonprofit's rebuilt site map" />
              </div>
              <h3 data-reveal style={{ "--i": 1 } as React.CSSProperties}>Web Development &amp; SEO Lead, Finally Family Homes</h3>
              <p className="about__role" data-reveal style={{ "--i": 2 } as React.CSSProperties}>Nonprofit · Nov 2024 – Jan 2026</p>
              <p>
                Rebuilt navigation and backend systems as the site grew to 1,000+ monthly visits, and led its
                migration to a Vercel-hosted build with volunteer developers.
              </p>
            </li>
            <li className="about__item">
              <div className="about__media shutter" data-reveal>
                <img
                  src="/img/jhu-campus.jpg"
                  alt="Aerial view of Johns Hopkins' Homewood campus: the brick quad, its cupolas and the library steps"
                  width={1800}
                  height={1011}
                />
              </div>
              <h3 data-reveal style={{ "--i": 1 } as React.CSSProperties}>Johns Hopkins University</h3>
              <p className="about__role" data-reveal style={{ "--i": 2 } as React.CSSProperties}>Whiting School of Engineering</p>
              <p>B.S. Applied Mathematics &amp; Statistics and B.S. Computer Science.</p>
            </li>
            <li className="about__item">
              <div className="about__media shutter" data-reveal>
                <img
                  src="/img/smes-commencement.jpg"
                  alt="St. Margaret's commencement on the lawn before the Darcy Rice Center for the Arts, graduates in white"
                  width={1800}
                  height={1200}
                  style={{ objectPosition: "47% 60%" }}
                />
              </div>
              <h3 data-reveal style={{ "--i": 1 } as React.CSSProperties}>St. Margaret&apos;s Episcopal School</h3>
              <p className="about__role" data-reveal style={{ "--i": 2 } as React.CSSProperties}>San Juan Capistrano</p>
              <p>Salutatorian.</p>
            </li>
          </ol>
        </section>

        {/* ── contact ── */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>Write to me about research, internships, or something you want built.</h2>
          <a className="contact__email display" data-reveal style={{ "--i": 1 } as React.CSSProperties} href={`mailto:${EMAIL}`}>
            leoyyf2007@<br className="br" />gmail.com
          </a>
          <div className="contact__foot" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <span>Baltimore, MD · Irvine, CA</span>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a className="link" href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter
        credits={
          <>
            <a className="link" href="https://commons.wikimedia.org/wiki/File:3D_printing_time-lapse_2026.webm">“3D printing time-lapse 2026”</a>{" "}
            by BoardGamesN3Dprint, CC0
          </>
        }
      />
    </>
  )
}
