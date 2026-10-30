import Link from "next/link"
import { NavMark } from "@/components/nav-mark"
import { Menu } from "@/components/menu"
import { CornerName } from "@/components/fx"

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
      <Menu
        links={[
          { href: "/#projects", label: "Work" },
          { href: "/#awards", label: "Awards" },
          { href: "/#experience", label: "Experience" },
          { href: "/current", label: "Now" },
          { href: "/#contact", label: "Contact" },
        ]}
        email={EMAIL}
        socials={SOCIALS}
      />
    </nav>
  )
}

// The close: one small line, then the name in the corners closes up in the middle.
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__line">
        <span>Leo Yang, applied math and CS at Johns Hopkins</span>
        <ul className="footer__links">
          <li><Link href="/#projects">Work</Link></li>
          <li><Link href="/#awards">Awards</Link></li>
          <li><Link href="/current">Now</Link></li>
          {SOCIALS.map((s) => (
            <li key={s.label}><a href={s.href}>{s.label}</a></li>
          ))}
        </ul>
        <span className="footer__end">Drawings, renders and screenshots are my own.</span>
      </div>
      <CornerName first="leo" last="yang" />
    </footer>
  )
}
