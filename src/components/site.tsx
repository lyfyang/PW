import Link from "next/link"
import { NavMark } from "@/components/nav-mark"

export const EMAIL = "leoyyf2007@gmail.com"

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/leo-yang-a0b193363/" },
  { label: "GitHub", href: "https://github.com/lyfyang" },
  { label: "Instagram", href: "https://www.instagram.com/leo.yyng/" },
]

export function SiteNav() {
  return (
    <nav className="nav" aria-label="Main">
      <NavMark />
      <ul className="nav__links">
        <li><Link className="link" href="/#research">Research</Link></li>
        <li><Link className="link" href="/#projects">Projects</Link></li>
        <li><Link className="link" href="/current">Now</Link></li>
        <li><Link className="link" href="/#contact">Contact</Link></li>
      </ul>
    </nav>
  )
}

export function SiteFooter({ credits }: { credits?: React.ReactNode }) {
  return (
    <footer className="footer">
      <p className="credits">
        {credits && <>Pictures and footage: {credits}; all via Wikimedia Commons. </>}
        Drawings, renders, figures and screenshots are my own.
      </p>
      <div className="footer__line">
        <span>Leo Yang · Baltimore, MD · Irvine, CA</span>
        <ul className="footer__links">
          <li><Link className="link" href="/#research">Research</Link></li>
          <li><Link className="link" href="/#projects">Projects</Link></li>
          <li><Link className="link" href="/current">Now</Link></li>
          {SOCIALS.map((s) => (
            <li key={s.label}><a className="link" href={s.href}>{s.label}</a></li>
          ))}
        </ul>
        <span className="footer__year">2026</span>
      </div>
    </footer>
  )
}
