"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Drawing, type DrawingId } from "@/components/drawings"
import { EMAIL, SOCIALS, SiteFooter, SiteNav } from "@/components/site"
import { Grow, Magnetic, Parallax, Rise, SplitHeading, Tilt, Wordmark } from "@/components/motion"

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
    picture: {
      src: "/img/demo-strokeshield.jpg",
      alt: "StrokeShield's start screen: “A guided BE-FAST check, in about two minutes”, with the four checks listed",
    },
  },
  {
    name: "Meridian",
    year: "2024",
    description:
      "Building a quantitative execution system for regulated binary derivatives markets using ML-based probability calibration, stochastic intra-bar simulation, and adaptive position sizing with live order routing via REST API.",
    picture: {
      draw: "calibration",
      alt: "Drawing of a calibration curve: predicted probability against observed frequency",
    },
  },
  {
    name: "Artemis II Live Trajectory Dashboard",
    year: "2025",
    description:
      "Real-time trajectory, telemetry, and mission data for NASA's Artemis II flight, built with a team of 7 on Node.js and Vercel for the 2025 NASA App Development Challenge. Led backend, logistics, and outreach.",
    link: { href: "https://nasa-app-zeta.vercel.app", label: "Open the dashboard" },
    picture: {
      draw: "trajectory",
      alt: "Drawing of Artemis II's free-return path from Earth around the Moon and back",
    },
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

// project cards alternate wide and narrow so no two rows repeat
const spans = ["wide", "narrow", "narrow", "wide", "narrow", "wide"] as const

function PictureView({ picture }: { picture: Picture }) {
  if ("draw" in picture) return <Drawing id={picture.draw} label={picture.alt} />
  return <img src={picture.src} alt={picture.alt} width={1440} height={900} loading="lazy" />
}

const d = (i: number) => ({ "--i": i }) as React.CSSProperties

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

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

      <main className="wrap">
        {/* ── hero ── */}
        <header className="hero" aria-labelledby="title">
          <Wordmark words={["Leo", "Yang"]} sup="AMS + CS" />
          <div className="hero__row">
            <p className="hero__lead rise" style={d(1)}>
              Applied math and computer science at Johns Hopkins.
              <br />I build lab instruments, prediction models and web apps.
            </p>
            <div className="hero__aside rise" style={d(2)}>
              <a className="button" href={`mailto:${EMAIL}`}>
                Email me
              </a>
              <span>Baltimore, MD · Irvine, CA</span>
            </div>
          </div>
          <Grow>
            <Link href="/current" className="now card card--accent rise" style={d(3)}>
              <div className="now__text">
                <h2>Currently working on →</h2>
                <p>Y Clonebinator, and a stealth project with the Johns Hopkins Software Engineering Club.</p>
              </div>
              <img
                className="now__shot"
                src="/img/demo-clonebinator.jpg"
                alt="Y Clonebinator: “Someone already built your idea”, with a box to describe a startup idea"
                width={1440}
                height={900}
              />
            </Link>
          </Grow>
        </header>

        {/* ── research ── */}
        <section id="research" className="section" aria-labelledby="research-title">
          <div className="section__head">
            <SplitHeading id="research-title">Research</SplitHeading>
            <p data-reveal style={d(1)}>
              A lab instrument at UC Santa Barbara, and a heritage design study for LEGO.
            </p>
          </div>
          <div className="pair">
            <article className="tile">
              <Rise>
                <Tilt>
                  <Link href="/research/hf-epr" className="card card--dark card--square blueprint">
                    <img
                      className="card__object"
                      src="/img/epr-top-view.png"
                      alt="Top view of the sample holder: the sample sits at the centre of the turning gear"
                      width={1242}
                      height={1076}
                      loading="lazy"
                    />
                    <span className="card__corner">UCSB Sherwin Group · 2025</span>
                    <span className="card__name">Rotating EPR sample holder</span>
                  </Link>
                </Tilt>
              </Rise>
              <div className="tile__text" data-reveal style={d(1)}>
                <p>
                  A fully mechanical holder for a 95–240 GHz spectrometer: bevel gears turn the sample a full 360° below
                  10 K, and two resistances report its angle. It replaced a $20,000 commercial part for under $20.
                </p>
                <Link className="link" href="/research/hf-epr">
                  Read the research →
                </Link>
              </div>
            </article>
            <article className="tile">
              <Rise index={1}>
                <Tilt>
                  <div className="card card--dark card--square plan">
                    <Parallax amount={5}>
                      <img
                        src="/img/torii-blueprint.jpg"
                        alt="Blueprint elevations of Itsukushima's great torii, front and side, with dimensions"
                        width={2400}
                        height={1610}
                        loading="lazy"
                      />
                    </Parallax>
                    <span className="card__corner">Pioneer Research Program · 2025</span>
                    <span className="card__name">Itsukushima Shrine, in LEGO</span>
                  </div>
                </Tilt>
              </Rise>
              <div className="tile__text" data-reveal style={d(2)}>
                <p>
                  How LEGO&apos;s product and marketing frameworks decide which cultures get represented. I audited the
                  Skyline line&apos;s bias toward Western megacities, then designed a 450–750 piece model of the
                  UNESCO-listed shrine within in-production parts and colours.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ── projects ── */}
        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section__head">
            <SplitHeading id="projects-title">Projects</SplitHeading>
            <p data-reveal style={d(1)}>
              Six things built, modelled or pitched since 2024.
            </p>
          </div>
          <div className="bento">
            {projects.map((p, i) => (
              <article key={p.name} className={`tile tile--${spans[i]}`}>
                <Rise index={i}>
                  <Tilt>
                    <div className="card card--dark card__frame">
                      <div className="card__picture">
                        <PictureView picture={p.picture} />
                      </div>
                      <span className="card__corner">{p.year}</span>
                    </div>
                  </Tilt>
                </Rise>
                <div className="tile__text" data-reveal style={d(1)}>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  {p.link && (
                    <a className="link" href={p.link.href} target="_blank" rel="noopener noreferrer">
                      {p.link.label} →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── experience and education ── */}
        <section id="experience" className="section" aria-labelledby="about-title">
          <div className="section__head">
            <SplitHeading id="about-title">Experience &amp; education</SplitHeading>
          </div>
          <div className="people">
            <article className="tile">
              <figure className="card card--dark card--photo" data-reveal>
                <Parallax>
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
                </Parallax>
              </figure>
              <div className="tile__text" data-reveal style={d(1)}>
                <h3>Summer Researcher, Sherwin Group</h3>
                <p className="tile__meta">UC Santa Barbara · Jun–Aug 2025</p>
                <p>
                  Designed and 3D-printed a rotating cryogenic sample holder for a 95–240 GHz EPR spectrometer.
                  Co-authored the paper and presented it to 100+ attendees.
                </p>
              </div>
            </article>
            <article className="tile">
              <div className="card card--dark card--photo" data-reveal style={d(1)}>
                <Drawing id="sitemap" label="Drawing of the nonprofit's rebuilt site map" />
              </div>
              <div className="tile__text" data-reveal style={d(2)}>
                <h3>Web Development &amp; SEO Lead, Finally Family Homes</h3>
                <p className="tile__meta">Nonprofit · Nov 2024 – Jan 2026</p>
                <p>
                  Rebuilt navigation and backend systems as the site grew to 1,000+ monthly visits, and led its
                  migration to a Vercel-hosted build with volunteer developers.
                </p>
              </div>
            </article>
            <article className="tile">
              <figure className="card card--dark card--photo" data-reveal>
                <Parallax>
                  <img
                    src="/img/jhu-campus.jpg"
                    alt="Aerial view of Johns Hopkins' Homewood campus: the brick quad, its cupolas and the library steps"
                    width={1800}
                    height={1011}
                    loading="lazy"
                  />
                </Parallax>
              </figure>
              <div className="tile__text" data-reveal style={d(1)}>
                <h3>Johns Hopkins University</h3>
                <p className="tile__meta">Whiting School of Engineering</p>
                <p>B.S. Applied Mathematics &amp; Statistics and B.S. Computer Science.</p>
              </div>
            </article>
            <article className="tile">
              <figure className="card card--dark card--photo" data-reveal style={d(1)}>
                <Parallax>
                  <img
                    src="/img/smes-commencement.jpg"
                    alt="St. Margaret's commencement on the lawn before the Darcy Rice Center for the Arts, graduates in white"
                    width={1800}
                    height={1200}
                  />
                </Parallax>
              </figure>
              <div className="tile__text" data-reveal style={d(2)}>
                <h3>St. Margaret&apos;s Episcopal School</h3>
                <p className="tile__meta">San Juan Capistrano</p>
                <p>Salutatorian.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ── contact ── */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <SplitHeading id="contact-title">
            Write to me about research, internships, or something you want built.
          </SplitHeading>
          <Magnetic strength={0.08}>
            <a className="contact__email" href={`mailto:${EMAIL}`}>
              leoyyf2007@
              <br className="br" />
              gmail.com
            </a>
          </Magnetic>
          <div className="contact__foot">
            <span>Baltimore, MD · Irvine, CA</span>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a className="link" href={s.href}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter
        credits={
          <>
            <a className="link" href="https://commons.wikimedia.org/wiki/File:3D_printing_time-lapse_2026.webm">
              “3D printing time-lapse 2026”
            </a>{" "}
            by BoardGamesN3Dprint, CC0
          </>
        }
      />
    </>
  )
}
