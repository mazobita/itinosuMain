import { BedDouble, IdCard, Plane, TramFront } from 'lucide-react'
import { Stage, Toggle, type Act } from '../kit'
import { Badge, useScheme } from './ui'
import './widgets.css'

// 10.02 "Only the widgets you need. Going by train? Leave Flights out."
//
// How it feels to use: the trip's widget settings. A tap switches Flights
// off and its widget leaves the trip's strip above; a second tap switches
// Public transport on and its widget opens into the strip in list order.
// Each change follows its own tap. Plays once in view; the poster is the
// finished frame.

const WIDGETS = [
  { key: 'flights', name: 'Flights', Glyph: Plane, color: 'var(--accent-blue)' },
  { key: 'stay', name: 'Hotel & stay', Glyph: BedDouble, color: 'var(--accent-orange)' },
  { key: 'transport', name: 'Public transport', Glyph: TramFront, color: 'var(--accent-green)' },
  { key: 'visa', name: 'Visa', Glyph: IdCard, color: 'var(--accent-indigo)' },
] as const

type S = { on: [boolean, boolean, boolean, boolean] }
const START: S = { on: [true, true, false, true] }
const DONE: S = { on: [false, true, true, true] }

async function flip(a: Act<S>, i: number) {
  const at = { at: `toggle-${i}`, x: 0.5, y: 0.5 }
  await a.move(at)
  await a.wait(120)
  await a.click(at)
  await a.set((s) => {
    const on = [...s.on] as S['on']
    on[i] = !on[i]
    return { on }
  })
}

async function script(a: Act<S>) {
  await a.wait(900)
  a.mark('flights')
  await flip(a, 0)
  await a.wait(1000)
  a.mark('transport')
  await flip(a, 2)
  await a.wait(1600)
}

export default function WidgetsDemo() {
  const theme = useScheme()
  return (
    <Stage<S>
      width={548}
      height={322}
      compact={{ below: 520, width: 354, height: 322 }}
      initial={START}
      poster={DONE}
      script={script}
      play="once"
      theme={theme}
      cursor={{ at: { wide: { x: 400, y: 300 }, compact: { x: 250, y: 300 } }, style: 'touch' }}
      unframed
      className="itn-demo wd"
    >
      {(s) => (
        <div className="wd-card">
          <div className="wd-strip-head">On this trip</div>
          <div className="wd-strip">
            {WIDGETS.map((w, i) => (
              <span key={w.key} className="wd-mini" data-on={s.on[i] || undefined}>
                <span className="wd-mini__clip">
                  <span className="wd-mini__inner">
                    <Badge color={w.color} className="wd-mini__badge">
                      <w.Glyph size={14} strokeWidth={2.3} />
                    </Badge>
                    <span className="wd-mini__name">{w.name}</span>
                  </span>
                </span>
              </span>
            ))}
          </div>
          <div className="wd-list">
            {WIDGETS.map((w, i) => (
              <div key={w.key} className="wd-row">
                <Badge color={w.color} className="wd-badge">
                  <w.Glyph size={17} strokeWidth={2.2} />
                </Badge>
                <span className="wd-row__name">{w.name}</span>
                <Toggle on={s.on[i]} className="wd-toggle" data-target={`toggle-${i}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Stage>
  )
}
