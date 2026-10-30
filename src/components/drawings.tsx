// Flat drawings for work that has no photograph: one language throughout,
// white strokes and fills on the deep field, one yellow mark per drawing.

const W = "var(--ink)"
const Y = "var(--accent)"
const M = "var(--muted)"

const text = { fill: W, fontSize: 17, fontFamily: "var(--font-inter-tight)", fontWeight: 700 } as const

export type DrawingId = "calibration" | "trajectory" | "ratings" | "hierarchy" | "charging" | "sitemap"

export function Drawing({ id, label }: { id: DrawingId; label: string }) {
  return (
    <svg className="drawing" viewBox="0 0 400 500" role="img" aria-label={label}>
      <rect width="400" height="500" fill="var(--field)" />
      {DRAWINGS[id]}
    </svg>
  )
}

const FIGURE_8 =
  "M205 250 C245 292 290 304 330 298 C384 288 386 212 330 202 C290 196 245 208 205 250 C165 292 120 306 82 298 C24 284 24 216 82 202 C120 194 165 208 205 250 Z"

const DRAWINGS: Record<DrawingId, React.ReactNode> = {
  // Reliability diagram: predicted probability against observed frequency.
  calibration: (
    <g>
      <path d="M70 70 V410 H350" stroke={W} strokeWidth="4" fill="none" />
      <path d="M70 410 L350 70" stroke={M} strokeWidth="3" strokeDasharray="8 10" fill="none" />
      <path d="M70 410 C130 380 150 330 190 290 S260 170 350 80" stroke={W} strokeWidth="4" fill="none" />
      {[[100, 392], [135, 360], [170, 318], [205, 270], [240, 222], [275, 172], [310, 128], [340, 92]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="8" fill={W} />
      ))}
      <circle cx="240" cy="222" r="14" fill={Y} />
      <text x="210" y="452" textAnchor="middle" {...text}>predicted probability</text>
      <text x="40" y="240" textAnchor="middle" transform="rotate(-90 40 240)" {...text}>observed</text>
    </g>
  ),
  // Artemis II free-return: a figure 8, out to the far side of the Moon and crossing back to Earth.
  trajectory: (
    <g>
      <path
        d={FIGURE_8}
        stroke={W} strokeWidth="4" strokeDasharray="10 9" fill="none"
      />
      <circle cx="92" cy="250" r="38" fill={W} />
      <circle cx="330" cy="250" r="17" fill={M} />
      <circle cx="372" cy="250" r="10" fill={Y} />
      <text x="92" y="350" textAnchor="middle" {...text}>Earth</text>
      <text x="330" y="350" textAnchor="middle" {...text}>Moon</text>
      <text x="205" y="150" textAnchor="middle" {...text}>free-return figure 8</text>
      <circle className="drawing__craft" r="8" fill={Y}>
        <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" path={FIGURE_8} />
      </circle>
    </g>
  ),
  // Win probability as a function of the rating gap.
  ratings: (
    <g>
      <path d="M60 80 V400 H350" stroke={W} strokeWidth="4" fill="none" />
      <path d="M60 390 C170 388 180 380 205 240 S240 92 350 90" stroke={W} strokeWidth="5" fill="none" />
      <circle cx="205" cy="240" r="12" fill={Y} />
      <circle cx="290" cy="108" r="9" fill={W} />
      <circle cx="130" cy="382" r="9" fill={W} />
      <text x="205" y="446" textAnchor="middle" {...text}>rating gap</text>
      <text x="32" y="240" textAnchor="middle" transform="rotate(-90 32 240)" {...text}>win probability</text>
    </g>
  ),
  // Analytic Hierarchy Process: the goal, five weighted criteria, every candidate scored on each.
  hierarchy: (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={`g${i}`} d={`M200 112 L${48 + i * 76} 200`} stroke={M} strokeWidth="2.5" />
      ))}
      {[0, 1, 2, 3, 4].map((i) =>
        [0, 1, 2].map((k) => (
          <path key={`c${i}${k}`} d={`M${48 + i * 76} 262 L${72 + k * 128} 352`} stroke={M} strokeWidth="1.5" opacity="0.6" />
        ))
      )}
      <rect x="100" y="64" width="200" height="48" fill={W} />
      <text x="200" y="94" textAnchor="middle" {...text} fill="var(--field)">Olympic sport</text>
      {[["Popularity"], ["Gender", "equity"], ["Inclusion"], ["Innovation"], ["Safety"]].map((lines, i) => (
        <g key={lines[0]}>
          <rect x={14 + i * 76} y="200" width="68" height="62" fill={W} />
          {lines.map((l, j) => (
            <text key={l} x={48 + i * 76} y={lines.length === 1 ? 236 : 226 + j * 18} textAnchor="middle" {...text} fontSize={12.5} fill="var(--field)">
              {l}
            </text>
          ))}
        </g>
      ))}
      {["E-sports", "Surfing", "Others"].map((c, k) => (
        <g key={c}>
          <rect x={22 + k * 128} y="352" width="100" height="44" fill={k === 1 ? Y : W} />
          <text x={72 + k * 128} y="380" textAnchor="middle" {...text} fontSize={15} fill="var(--field)">{c}</text>
        </g>
      ))}
      <text x="200" y="40" textAnchor="middle" {...text} fontSize={15}>goal</text>
      <text x="200" y="450" textAnchor="middle" {...text} fontSize={15}>23 features · r = 0.9955</text>
    </g>
  ),
  // Charging piles that come to the car: an AGV moving between parking bays.
  charging: (
    <g>
      {[0, 1, 2, 3].map((r) =>
        [0, 1].map((c) => (
          <rect key={`${r}${c}`} x={50 + c * 190} y={60 + r * 100} width="110" height="70" fill={M} opacity={r === 2 && c === 1 ? 1 : 0.55} />
        ))
      )}
      <path d="M200 70 V430" stroke={W} strokeWidth="4" strokeDasharray="12 10" />
      <path d="M200 330 H232" stroke={W} strokeWidth="4" />
      <g className="drawing__agv">
        <rect x="178" y="300" width="44" height="44" fill={Y} />
      </g>
      <text x="200" y="470" textAnchor="middle" {...text}>the charger drives to the car</text>
    </g>
  ),
  // A nonprofit site map: the navigation that was rebuilt.
  sitemap: (
    <g>
      <rect x="140" y="60" width="120" height="44" fill={W} />
      <text x="200" y="88" textAnchor="middle" {...text} fill="var(--field)">Home</text>
      <path d="M200 104 V150 M70 150 H330 M70 150 V180 M156 150 V180 M243 150 V180 M330 150 V180" stroke={M} strokeWidth="3" fill="none" />
      {["About", "Homes", "Give", "Join"].map((p, i) => (
        <g key={p}>
          <rect x={30 + i * 87} y="180" width="80" height="40" fill={i === 2 ? Y : W} />
          <text x={70 + i * 87} y="206" textAnchor="middle" {...text} fontSize={15} fill="var(--field)">{p}</text>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={42 + i * 87} y={244 + k * 34} width="56" height="16" fill={M} opacity="0.7" />
          ))}
        </g>
      ))}
      <rect x="40" y="380" width="320" height="56" fill={W} />
      <text x="200" y="414" textAnchor="middle" {...text} fill="var(--field)">1,000+ visits a month</text>
    </g>
  ),
}
