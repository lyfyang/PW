import type { Metadata } from "next"
import { SiteFooter, SiteNav } from "@/components/site"

export const metadata: Metadata = {
  title: "Currently working on · Leo Yang",
}

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties

export default function CurrentPage() {
  return (
    <>
      <SiteNav />
      <main className="page">
        <header className="now-head">
          <h1 className="display" data-reveal>Currently<br />working on</h1>
        </header>

        <article className="entry">
          <a
            className="entry__media shutter"
            href="https://yclonebinator.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            <img
              src="/img/demo-clonebinator.jpg"
              alt="Y Clonebinator: “Someone already built your idea”, with a box to describe a startup idea"
              width={1440}
              height={900}
            />
          </a>
          <div className="entry__text">
            <h2 className="display" data-reveal style={delay(1)}>Y Clonebinator</h2>
            <p data-reveal style={delay(2)}>
              Type a startup idea, see how many clones already exist and how many died.
            </p>
            <a
              className="button"
              href="https://yclonebinator.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={delay(3)}
            >
              Try Y Clonebinator
            </a>
          </div>
        </article>

        <article className="entry">
          <figure className="entry__media shutter" data-reveal style={{ margin: 0 }}>
            <img
              src="/img/hopbuilds.jpg"
              alt="HopBuilds, the Johns Hopkins Software Engineering Club: “We build software for Hopkins”, beside a terminal window"
              width={2000}
              height={1162}
              loading="lazy"
            />
          </figure>
          <div className="entry__text">
            <h2 className="display" data-reveal style={delay(1)}>
              <span aria-hidden="true">*****</span>
              <span className="sr-only">Stealth project</span>
            </h2>
            <p data-reveal style={delay(2)}>
              Projects under the Johns Hopkins Software Engineering Club, working in stealth.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
