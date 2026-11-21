import { BedDouble, BriefcaseMedical, Check as Tick, Download, IdCard, Plane } from 'lucide-react'
import { Check, Spinner, Stage, States, type Act } from '../kit'
import { Badge, useScheme } from './ui'
import './summary.css'

// 10.02 "A summary for the immigration desk".
//
// How it feels to use: the trip's one-page summary is on screen, each
// document on it is checked off in reading order (the page is complete),
// then the pointer presses Download PDF and the button confirms on itself.
// The page is paper, so it stays a light, readable page in dark mode too.
// Plays once in view; the poster is the finished frame.

const ITEMS = [
  { key: 'visa', Glyph: IdCard, color: 'var(--accent-indigo)', label: 'Visa', value: 'Japan eVisa · single entry' },
  { key: 'flights', Glyph: Plane, color: 'var(--accent-blue)', label: 'Flights', value: '6E123 BLR → KIX · 12 Apr' },
  { key: 'stay', Glyph: BedDouble, color: 'var(--accent-orange)', label: 'Stay', value: 'Ryokan Sakura, Kyoto' },
  { key: 'insurance', Glyph: BriefcaseMedical, color: 'var(--accent-pink)', label: 'Insurance', value: 'Tata AIG · 11–25 Apr' },
] as const

type Dl = 'idle' | 'busy' | 'done'
type S = { checked: number; dl: Dl }
const START: S = { checked: 0, dl: 'idle' }
const DONE: S = { checked: ITEMS.length, dl: 'done' }

async function script(a: Act<S>) {
  await a.wait(800)
  a.mark('check')
  for (let i = 1; i <= ITEMS.length; i++) {
    await a.set({ checked: i })
    await a.wait(260)
  }
  await a.wait(400)
  a.mark('download')
  await a.move({ at: 'download', x: 0.8, y: 0.65 })
  await a.wait(150)
  await a.click({ at: 'download', x: 0.8, y: 0.65 })
  await a.set({ dl: 'busy' })
  await a.wait(750)
  await a.set({ dl: 'done' })
  // The hand leaves the result
  await a.move(a.layout === 'compact' ? { x: 250, y: 372 } : { x: 500, y: 300 }, { duration: 700 })
  await a.wait(1400)
}

export default function SummaryDemo() {
  const theme = useScheme()
  return (
    <Stage<S>
      width={548}
      height={333}
      compact={{ below: 520, width: 354, height: 389 }}
      initial={START}
      poster={DONE}
      script={script}
      play="once"
      theme={theme}
      cursor={{ at: { wide: { x: 470, y: 300 }, compact: { x: 250, y: 372 } }, style: 'real' }}
      unframed
      className="itn-demo sd"
    >
      {(s) => (
        <div className="sd-paper">
          <div className="sd-head">
            <div className="sd-head__text">
              <span className="sd-kicker">Trip summary</span>
              <span className="sd-title">Kyoto &amp; Osaka Spring Trip</span>
              <span className="sd-dates">12 – 24 Apr 2027 · Kyoto, Japan</span>
            </div>
            <span className="sd-btn" data-target="download" data-state={s.dl}>
              <States
                value={s.dl}
                states={{
                  idle: (
                    <span className="sd-btn__label sd-btn__label--dl">
                      <Download size={16} strokeWidth={2.2} /> Download PDF
                    </span>
                  ),
                  busy: <Spinner size={16} />,
                  done: (
                    <span className="sd-btn__label sd-btn__label--done">
                      <Tick size={16} strokeWidth={2.6} /> Downloaded
                    </span>
                  ),
                }}
              />
            </span>
          </div>
          <div className="sd-list">
            {ITEMS.map((it, i) => (
              <div key={it.key} className="sd-item">
                <Badge color={it.color} className="sd-badge">
                  <it.Glyph size={16} strokeWidth={2.2} />
                </Badge>
                <span className="sd-item__text">
                  <span className="sd-item__label">{it.label}</span>
                  <span className="sd-item__value">{it.value}</span>
                </span>
                <Check on={s.checked > i} size={18} className="sd-check" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Stage>
  )
}
