"use client"

import { useState } from "react"
import Link from "next/link"
import { Drawing, type DrawingId } from "@/components/drawings"
import { EMAIL, SOCIALS, SiteFooter, SiteNav } from "@/components/site"
import { Focus, InkTrail, Lines, Mark, Orbit, Preview, usePreview, type Tile } from "@/components/fx"

// ─── data ────────────────────────────────────────────────────────────────────

type Picture =
  | { src: string; alt: string; width: number; height: number }
  | { draw: DrawingId; alt: string }
  | { card: string }

const projects: {
  name: string
  kind: string
  year: string
  description: string
  link?: { href: string; label: string }
  picture: Picture
}[] = [
  {
    name: "StrokeShield",
    kind: "Health, HopHacks",
    year: "2026",
    description:
      "Voice-guided BE-FAST stroke screening built at HopHacks. In-browser MediaPipe computer vision checks face and arm symmetry, an ElevenLabs voice agent walks the user through each step, and a FastAPI backend sends an SMS alert when checks flag risk.",
    link: { href: "https://www.strokeshield.health/", label: "Open the demo" },
    picture: {
      src: "/img/demo-strokeshield.jpg",
      alt: "StrokeShield's start screen: “A guided BE-FAST check, in about two minutes”, with the four checks listed",
      width: 920,
      height: 704,
    },
  },
  {
    name: "Rotating EPR sample holder",
    kind: "Research, UCSB Sherwin Group",
    year: "2025",
    description:
      "A fully mechanical holder for a 95–240 GHz spectrometer: bevel gears turn the sample a full 360° below 10 K, and two resistances report its angle. It replaced a $20,000 commercial part for under $20.",
    link: { href: "/research/hf-epr", label: "Read the research" },
    picture: {
      src: "/img/epr-top-view.png",
      alt: "Top view of the sample holder: the sample sits at the centre of the turning gear",
      width: 1242,
      height: 1076,
    },
  },
  {
    name: "Itsukushima Shrine, in LEGO",
    kind: "Research, Pioneer Research Program",
    year: "2025",
    description:
      "How LEGO's product and marketing frameworks decide which cultures get represented. I audited the Skyline line's bias toward Western megacities, then designed a 450–750 piece model of the UNESCO-listed shrine within in-production parts and colours.",
    picture: {
      src: "/img/torii-blueprint.jpg",
      alt: "Blueprint elevations of Itsukushima's great torii, front and side, with dimensions",
      width: 2400,
      height: 1610,
    },
  },
  {
    name: "Meridian",
    kind: "Quantitative trading",
    year: "2024",
    description:
      "Building a quantitative execution system for regulated binary derivatives markets using ML-based probability calibration, stochastic intra-bar simulation, and adaptive position sizing with live order routing via REST API.",
    picture: { draw: "calibration", alt: "Drawing of a calibration curve: predicted probability against observed frequency" },
  },
  {
    name: "Artemis II Live Trajectory Dashboard",
    kind: "NASA App Challenge",
    year: "2025",
    description:
      "Real-time trajectory, telemetry, and mission data for NASA's Artemis II flight, built with a team of 7 on Node.js and Vercel for the 2025 NASA App Development Challenge. Led backend, logistics, and outreach.",
    link: { href: "https://nasa-app-zeta.vercel.app", label: "Open the dashboard" },
    picture: { draw: "trajectory", alt: "Drawing of Artemis II's free-return path from Earth around the Moon and back" },
  },
  {
    name: "Match Prediction via Optimized Player Ratings",
    kind: "Sports analytics",
    year: "2025",
    description:
      "With Dr. Benoit Legat (UCLouvain): a rating-based tennis match predictor on Universal Tennis Rating data, fitting player ratings and outcome weights by minimizing ranking error and validating against held-out matches.",
    picture: { draw: "ratings", alt: "Drawing of win probability rising with the rating gap between two players" },
  },
  {
    name: "Olympic Sport Selection Model",
    kind: "HiMCM, Meritorious",
    year: "2025",
    description:
      "HiMCM Meritorious Winner. A two-layer Analytic Hierarchy Process model scoring candidate Olympic sports across 23 features from IOC and Kaggle data, matching historical selections with a Pearson correlation of 0.9955.",
    picture: { draw: "hierarchy", alt: "Drawing of the hierarchy: the goal, five criteria, and candidate sports" },
  },
  {
    name: "Matrix Charging Systems",
    kind: "Conrad Challenge",
    year: "2025",
    description:
      "Led team of 3 in brainstorming and development, and outreach for a novel EV charging concept using automated guided vehicles, with the focus of improving EV user retention in the US by promoting EV charging infrastructure accessibility and reducing space constraints of charging piles. Submitted to Conrad Challenge 2025.",
    picture: { draw: "charging", alt: "Drawing of a parking lot where a charging robot drives to the car" },
  },
]

const img = {
  eprTop: { src: "/img/epr-top-view.png", alt: "Top view of the sample holder: the sample sits at the centre of the turning gear", width: 1242, height: 1076 },
  eprSection: {
    src: "/img/epr-cross-section.png",
    alt: "Cross-section of the rotating EPR sample holder: bevel gears turn the sample inside the modulation coil",
    width: 1230,
    height: 1228,
  },
  torii: { src: "/img/torii-blueprint.jpg", alt: "Blueprint elevations of Itsukushima's great torii, front and side, with dimensions", width: 2400, height: 1610 },
  lego: { src: "/img/lego-skyline.jpg", alt: "Digital LEGO model of the shrine: the torii, worship hall, pavilion and five-storied pagoda on one base", width: 1898, height: 915 },
  jhu: { src: "/img/jhu-campus.jpg", alt: "Aerial view of Johns Hopkins' Homewood campus: the brick quad, its cupolas and the library steps", width: 1800, height: 1011 },
  smes: { src: "/img/smes-commencement.jpg", alt: "St. Margaret's commencement on the lawn before the Darcy Rice Center for the Arts, graduates in white", width: 1800, height: 1200 },
  clone: { src: "/img/demo-clonebinator.jpg", alt: "Y Clonebinator: “Someone already built your idea”, with a box to describe a startup idea", width: 1440, height: 900 },
}

function PictureView({ picture, lazy = true }: { picture: Picture; lazy?: boolean }) {
  if ("card" in picture) return <span className="card-text">{picture.card}</span>
  if ("draw" in picture) return <Drawing id={picture.draw} label={picture.alt} />
  return <img src={picture.src} alt={picture.alt} width={picture.width} height={picture.height} loading={lazy ? "lazy" : undefined} />
}

// the globe of the work: every picture of it, each shown a few times around the sphere
const globe: Picture[] = [
  img.clone,
  img.eprTop,
  img.torii,
  img.eprSection,
  img.lego,
  ...projects.filter((p) => "draw" in p.picture || p.name === "StrokeShield").map((p) => p.picture),
]
const tiles: Tile[] = Array.from({ length: 30 }, (_, i) => {
  const picture = globe[i % globe.length]
  return {
    key: `t${i}`,
    node: "draw" in picture ? <Drawing id={picture.draw} label="" /> : "src" in picture ? <img src={picture.src} alt="" loading="lazy" /> : null,
  }
})

// two pieces of work, each with its year, organisation and the rest of the row
const experience = [
  {
    group: "Experience",
    when: "’25",
    org: "UC Santa Barbara, Sherwin Group",
    role: "Summer Researcher",
    note: "Jun–Aug 2025. Designed and 3D-printed a rotating cryogenic sample holder for a 95–240 GHz EPR spectrometer. Co-authored the paper and presented it to 100+ attendees.",
    picture: img.eprTop as Picture,
  },
  {
    group: "",
    when: "’24–’26",
    org: "Finally Family Homes",
    role: "Web Development & SEO Lead",
    note: "Nov 2024 – Jan 2026, nonprofit. Rebuilt navigation and backend systems as the site grew to 1,000+ monthly visits, and led its migration to a Vercel-hosted build with volunteer developers.",
    picture: { draw: "sitemap", alt: "Drawing of the nonprofit's rebuilt site map" } as Picture,
  },
  {
    group: "Education",
    when: "",
    org: "Johns Hopkins University",
    role: "B.S. Applied Mathematics & Statistics and B.S. Computer Science",
    note: "Whiting School of Engineering.",
    picture: img.jhu as Picture,
  },
  {
    group: "",
    when: "",
    org: "St. Margaret’s Episcopal School",
    role: "Salutatorian",
    note: "San Juan Capistrano.",
    picture: img.smes as Picture,
  },
]

const awards = [
  {
    when: "’25",
    name: "AIME qualifier",
    issuer: "Mathematical Association of America",
    note: "Feb 2025. Qualified for the American Invitational Mathematics Exam by scoring top 2.5% on the AMC 10 (2023) and top 5% on the AMC 12 (2024, 2025). Score of 7 on AIME I 2025.",
  },
  {
    when: "’25",
    name: "Meritorious, HiMCM",
    issuer: "Consortium for Mathematics and its Applications (COMAP)",
    note: "Jan 2025. High School Mathematical Contest in Modeling.",
  },
  {
    when: "’24",
    name: "Gold Division",
    issuer: "USACO",
    note: "Jan 2024. USA Computing Olympiad.",
  },
  {
    when: "’24",
    name: "High Commendation, Global Essay Prize in History",
    issuer: "John Locke Institute",
    note: "Jan 2024.",
  },
]

// what shows through the ink in the hero, one per stroke
const inkPictures = [img.clone.src, "/img/demo-strokeshield.jpg", img.eprSection.src, img.lego.src, img.torii.src]

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { x, y, onPointerMove } = usePreview()
  const [preview, setPreview] = useState<Picture | null>(null)
  const hover = (picture: Picture) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setPreview(picture)
    },
    onPointerLeave: () => setPreview(null),
  })

  return (
    <>
      <SiteNav />

      <main onPointerMove={onPointerMove}>
        {/* ── hero: the name beside a single rule, then the statement crossing it ── */}
        <header className="hero" aria-labelledby="title">
          <span className="hero__rule" aria-hidden="true" />
          <InkTrail images={inkPictures} />
          <Mark className="hero__mark" />
          <p className="hero__label hero__label--place">
            Based in Baltimore, MD
            <br />
            and Irvine, CA
          </p>
          <p className="hero__label hero__label--school">
            Studying at
            <br />
            Johns Hopkins
          </p>
          <p className="hero__label hero__label--role">
            Applied math
            <br />& computer science
          </p>
          <Focus className="hero__name" sharpAt={0.05}>
            <h1 id="title">
              Leo
              <br />
              Yang
            </h1>
          </Focus>
          <Focus className="statement" sharpAt={0.1}>
            <Lines
              label="Models and web apps."
              lines={[[{ t: "Models", c: 2 }], [{ t: "& Web", c: 3 }], [{ t: "Apps.", c: 4 }]]}
            />
          </Focus>
        </header>


        <section className="intro" aria-label="About">
          <Focus mode="blur" className="intro__text">
            <p>
              I study applied math and computer science at Johns Hopkins. I&apos;m interested in startups and where
              hardware meets software, and I build prediction models and web apps.
            </p>
            <a className="pill" href={`mailto:${EMAIL}`}>
              Email me
            </a>
          </Focus>
        </section>

        {/* ── currently working on ── */}
        <section className="now" aria-labelledby="now-title">
          <Focus className="now__head">
            <Lines as="h2" id="now-title" lines={[[{ t: "Currently", c: 2 }], [{ t: "working on", c: 3 }]]} />
          </Focus>
          <article className="feature">
            <a className="feature__shot" href="https://yclonebinator.vercel.app" target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
              <PictureView picture={img.clone} />
            </a>
            <div className="feature__text">
              <p className="feature__tag">Live</p>
              <h3>Y Clonebinator</h3>
              <p>Type a startup idea, see how many clones already exist and how many died.</p>
              <a className="pill" href="https://yclonebinator.vercel.app" target="_blank" rel="noopener noreferrer">
                Try Y Clonebinator
              </a>
            </div>
          </article>
          <div className="table now__table">
            <article className="table__row" {...hover({ card: "Johns Hopkins Software Engineering Club" })}>
              <span className="table__cell table__when">Stealth</span>
              <h3 className="table__cell table__name">
                <span aria-hidden="true">*****</span>
                <span className="sr-only">Stealth project</span>
              </h3>
              <span className="table__cell table__kind">Johns Hopkins Software Engineering Club</span>
              <div className="table__cell table__note">
                <p>Working in stealth.</p>
                <Link href="/current">More on what I&apos;m building →</Link>
              </div>
            </article>
          </div>
        </section>


        {/* ── work: the globe, then the full list ── */}
        <Orbit id="projects" label="Research and projects, 2024 to 2026" left="Work" right="24–26" tiles={tiles} />

        <section className="table" aria-label="Research and projects">
          {projects.map((p) => (
            <Focus key={p.name} mode="blur" max={8}>
              <article className="table__row" {...hover(p.picture)}>
                <span className="table__cell table__when">’{p.year.slice(2)}</span>
                <h3 className="table__cell table__name">{p.name}</h3>
                <span className="table__cell table__kind">{p.kind}</span>
                <div className="table__cell table__note">
                  <p>{p.description}</p>
                  {p.link &&
                    (p.link.href.startsWith("/") ? (
                      <Link href={p.link.href}>{p.link.label} →</Link>
                    ) : (
                      <a href={p.link.href} target="_blank" rel="noopener noreferrer">
                        {p.link.label} →
                      </a>
                    ))}
                </div>
              </article>
            </Focus>
          ))}
        </section>

        {/* ── awards ── */}
        <section id="awards" className="awards" aria-labelledby="awards-title">
          <Focus className="awards__head">
            <Lines
              as="h2"
              id="awards-title"
              label="Awards and honours"
              lines={[
                [{ t: "Awards", c: 2 }],
                [
                  { t: "&", c: 0 },
                  { t: "Hon-", c: 2 },
                ],
                [{ t: "ours", c: 3 }],
              ]}
            />
          </Focus>
          <div className="table">
            {awards.map((a) => (
              <Focus key={a.name} mode="blur" max={8}>
                <article className="table__row">
                  <span className="table__cell table__when">{a.when}</span>
                  <h3 className="table__cell table__name">{a.name}</h3>
                  <span className="table__cell table__kind">{a.issuer}</span>
                  <div className="table__cell table__note">
                    <p>{a.note}</p>
                  </div>
                </article>
              </Focus>
            ))}
          </div>
        </section>

        {/* ── experience and education ── */}
        <section id="experience" className="awards" aria-labelledby="about-title">
          <Focus className="awards__head">
            <Lines
              as="h2"
              id="about-title"
              label="Experience and education"
              lines={[
                [{ t: "Experience", c: 2 }],
                [
                  { t: "&", c: 0 },
                  { t: "Edu-", c: 2 },
                ],
                [{ t: "cation", c: 3 }],
              ]}
            />
          </Focus>
          <div className="table">
            {experience.map((e) => (
              <Focus key={e.org} mode="blur" max={8}>
                <article className="table__row" {...hover(e.picture)}>
                  <span className="table__cell table__when">
                    {e.group && <span className="table__group">{e.group}</span>}
                    {e.when}
                  </span>
                  <h3 className="table__cell table__name">{e.org}</h3>
                  <span className="table__cell table__kind">{e.role}</span>
                  <div className="table__cell table__note">
                    <p>{e.note}</p>
                  </div>
                </article>
              </Focus>
            ))}
          </div>
        </section>

        {/* ── contact ── */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact__direct">
            <p className="contact__muted">Write directly to:</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="contact__muted">Baltimore, MD · Irvine, CA</p>
          </div>
          <Focus className="contact__line">
            <Lines
              as="h2"
              id="contact-title"
              label="Let's connect."
              lines={[[{ t: "let’s", c: 3 }], [{ t: "connect.", c: 4 }]]}
            />
          </Focus>
          <ul className="rounds">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a className="round" href={s.href} aria-label={s.label}>
                  {s.label === "LinkedIn" ? "in" : s.label === "GitHub" ? "gh" : "ig"}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Preview x={x} y={y} show={!!preview}>
        {preview && <PictureView picture={preview} lazy={false} />}
      </Preview>

      <SiteFooter />
    </>
  )
}
