import type { Metadata } from "next"
import { SiteFooter, SiteNav } from "@/components/site"

export const metadata: Metadata = {
  title: "Rotating EPR sample holder · Leo Yang",
}

export default function HFEPRPage() {
  return (
    <>
      <SiteNav />
      <main className="page">
        <header className="page__head">
          <h1 className="display" data-reveal>Rotating EPR<br />sample holder</h1>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            High-field electron paramagnetic resonance prototyping. Summer Researcher, Sherwin Group, UCSB Institute
            for Terahertz Science and Technology, 2025.
          </p>
          <figure className="page__figure article__fig shutter" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <div className="blueprint">
              <img
                src="/img/epr-cross-section.png"
                alt="Cross-section of the holder: vertical and horizontal bevel gears, copper brush, sample tube and modulation coil, 57 mm across"
                width={1230}
                height={1228}
              />
            </div>
          </figure>
        </header>

        <section className="article">
          <div className="article__text" data-reveal>
            <h2>Overview</h2>
            <p>
              Electron Paramagnetic Resonance (EPR) spectroscopy probes unpaired electron spin states in
              paramagnetic materials by measuring transitions between Zeeman-split energy levels under an applied
              static magnetic field. At high field strengths (typically above 3 T) the technique achieves
              substantially enhanced spectral resolution and sensitivity, enabling discrimination of
              otherwise-overlapping hyperfine interactions and precise determination of g-tensor anisotropy in
              complex molecular systems.
            </p>
            <p>
              This project focused on the mechanical and cryogenic engineering challenges of angular-dependent
              high-field EPR measurements, where sample orientation relative to the static field axis critically
              governs the observable spin Hamiltonian parameters.
            </p>
          </div>
          <figure className="article__fig" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="blueprint">
              <img
                src="/img/epr-top-view.png"
                alt="Top view of the holder: the sample at the centre of the gear, with probe screws and dowel pins around the rim"
                width={1242}
                height={1076}
                loading="lazy"
              />
            </div>
            <figcaption>Top view. Mirror, roof and base, with the sample at the centre of rotation.</figcaption>
          </figure>
        </section>

        <section className="article">
          <div className="article__text" data-reveal>
            <h2>Instrument design</h2>
            <p>
              The core contribution was the design and fabrication of a rotating cryogenic EPR sample holder
              compatible with the institute&apos;s high-field spectrometer operating at 95–240 GHz (3.4–8.6 T). The
              holder achieves continuous angular rotation of the sample across the full 360° range while
              maintaining thermal contact with a liquid helium cryostat, sustaining sample temperatures below 10 K
              throughout acquisition.
            </p>
            <p>
              Material selection prioritized low microwave absorption cross-section and mechanical stability under
              repeated thermal cycling. The design eliminated the need for commercially sourced goniometric
              cryostats, reducing instrument cost from approximately $20,000 to under $20, without sacrificing
              angular precision or thermal performance. Positional reproducibility was verified against reference
              samples with known g-anisotropy.
            </p>
          </div>
          <figure className="article__fig" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <img
              src="/img/epr-spectra.png"
              alt="EPR spectra stacked by orientation from 5° to 200°, the resonance position shifting with angle"
              width={598}
              height={470}
              loading="lazy"
              style={{ background: "#fff", aspectRatio: "598 / 470" }}
            />
            <figcaption>Spectra at orientations from 5° to 200°.</figcaption>
          </figure>
        </section>

        <section className="article">
          <div className="article__text" data-reveal>
            <h2>Findings and output</h2>
            <p>
              Angular-dependent EPR spectra acquired with the prototype revealed clear modulation of resonance
              field positions consistent with axial g-tensor symmetry, confirming the holder&apos;s viability for
              orientation-resolved spin Hamiltonian parameterization. Spectral linewidths were comparable to those
              obtained with commercial instrumentation at equivalent field and temperature conditions.
            </p>
            <p>
              The work resulted in a co-authored paper with the principal investigator and graduate collaborators,
              and was presented as a research poster to an audience of 100+ at an institute symposium. The
              fabrication methodology and holder design have since been adopted for ongoing spectroscopic
              investigations within the lab.
            </p>
            <h2>Collaborators</h2>
            <p>
              Alex Giovannone and Mark Sherwin, UC Santa Barbara Institute for Terahertz Science and Technology;
              Robert Krumland-Dunning, UC San Diego.
            </p>
          </div>
          <div className="article__figs">
            <figure className="article__fig" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <img
                src="/img/epr-readout.png"
                alt="Resistance ratio R1/R2 rising on a log scale from 0.1 to 40 as the holder turns from 0° to 300°"
                width={515}
                height={381}
                loading="lazy"
                style={{ background: "#fff", aspectRatio: "515 / 381" }}
              />
              <figcaption>The angle readout: resistance ratio against rotation.</figcaption>
            </figure>
            <figure className="article__fig" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <img
                src="/img/epr-modulation.png"
                alt="Modulation coil calibration: linewidth in gauss rising linearly with current, y = 0.92x"
                width={541}
                height={353}
                loading="lazy"
                style={{ background: "#fff", aspectRatio: "541 / 353" }}
              />
              <figcaption>Modulation coil calibration: linewidth against current.</figcaption>
            </figure>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
