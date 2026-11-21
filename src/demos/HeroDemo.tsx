import { Plane, BedDouble, Plus } from 'lucide-react'
import { Collapse, Fly, Stage, States, type Act, type Rect } from '../kit'
import { Badge, TripCard, WidgetTile, useScheme } from './ui'
import './hero.css'

// 10.01 Hero: "Every booking, ticket and plan — in one tidy trip."
//
// A system story, no cursor. The trip starts with two empty widgets. An
// "Add to trip" sheet drops onto the cover carrying two bookings; each
// booking's badge leaves its row and flies down into its widget, which fills
// (its count and next item fade in), and the row closes up behind it. With
// both delivered the sheet leaves, and the frame is the Figma hero exactly:
// the trip, Flights and Hotel & stay, all filled. Plays once when it comes
// into view; the poster is that finished frame.
//
// Real strings: the trip card, the two bookings and the two widgets. The
// flyer is the badge itself (same 36pt square, same glyph and color) so the
// handoff into the tile's badge slot is invisible.

const BOOKINGS = [
  { key: 'flights', color: 'var(--accent-blue)', Glyph: Plane, name: 'IndiGo 6E123', sub: '3 flights · BLR → KIX', tile: 'Flights', empty: 'No flights', filled: '3 flights · next 6E123, 12 Apr' },
  { key: 'stay', color: 'var(--accent-orange)', Glyph: BedDouble, name: 'Ryokan Sakura', sub: '2 stays · Kyoto, Osaka', tile: 'Hotel & stay', empty: 'No stays', filled: '2 stays · 12 nights' },
] as const

type Pair = [boolean, boolean]
type S = {
  sheet: boolean
  rows: Pair
  sent: Pair
  filled: Pair
  fly: null | { i: number; from: Rect; to: Rect; go: boolean }
}

const START: S = { sheet: false, rows: [true, true], sent: [false, false], filled: [false, false], fly: null }
const DONE: S = { sheet: false, rows: [false, true], sent: [true, true], filled: [true, true], fly: null }

const set = (p: Pair, i: number, v: boolean): Pair => (i === 0 ? [v, p[1]] : [p[0], v])

async function deliver(a: Act<S>, i: number) {
  const from = a.rect(`src-${i}`, { layout: true })
  const to = a.rect(`dst-${i}`, { layout: true })
  // The flyer buds over the row's own badge (same size, same look), then
  // the row's badge hides under it as it lifts off
  await a.set({ fly: { i, from, to, go: false } })
  await a.wait(220)
  await a.set((s) => ({ sent: set(s.sent, i, true), fly: { ...s.fly!, go: true } }))
  await a.wait(320)
  // The last booking out takes the sheet with it: no empty sheet is left
  if (i === BOOKINGS.length - 1) a.set({ sheet: false })
  else a.set((s) => ({ rows: set(s.rows, i, false) }))
  await a.wait(560)
  // Landed: the tile's own badge takes over in the frame the flyer goes
  await a.set((s) => ({ fly: null, filled: set(s.filled, i, true) }))
}

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('sheet')
  await a.set({ sheet: true })
  await a.wait(1300)
  a.mark('flights')
  await deliver(a, 0)
  await a.wait(700)
  a.mark('stay')
  await deliver(a, 1)
  await a.wait(1500)
}

export default function HeroDemo() {
  const theme = useScheme()
  return (
    <Stage<S>
      width={480}
      height={426}
      compact={{ below: 470, width: 354, height: 446 }}
      initial={START}
      poster={DONE}
      script={script}
      play="once"
      theme={theme}
      unframed
      className="itn-demo hd"
    >
      {(s) => (
        <>
          <div className="hd-col">
            <TripCard />
            <div className="hd-tiles">
              {BOOKINGS.map((b, i) => (
                <WidgetTile
                  key={b.key}
                  data-filled={s.filled[i] || undefined}
                  badge={
                    <span className="hd-slot" data-target={`dst-${i}`}>
                      <Badge color="var(--badge-empty)" className="hd-badge-empty">
                        <Plus size={20} strokeWidth={2.4} />
                      </Badge>
                      <Badge color={b.color} className="hd-badge-full">
                        <b.Glyph size={20} strokeWidth={2.2} />
                      </Badge>
                    </span>
                  }
                  title={b.tile}
                  detail={<States value={s.filled[i] ? 'on' : 'off'} align="start" states={{ off: b.empty, on: b.filled }} className="hd-detail" />}
                />
              ))}
            </div>
          </div>

          <div className="hd-sheet" data-in={s.sheet || undefined} aria-hidden>
            <span className="hd-sheet__head">Add to trip</span>
            {BOOKINGS.map((b, i) => (
              <Collapse key={b.key} open={s.rows[i]}>
                <div className="hd-row">
                  <span className="hd-row__lead" data-target={`src-${i}`} data-sent={s.sent[i] || undefined}>
                    <Badge color={b.color}>
                      <b.Glyph size={20} strokeWidth={2.2} />
                    </Badge>
                  </span>
                  <span className="hd-row__text">
                    <span className="hd-row__name">{b.name}</span>
                    <span className="hd-row__sub">{b.sub}</span>
                  </span>
                </div>
              </Collapse>
            ))}
          </div>

          {s.fly && (
            <Fly from={s.fly.from} to={s.fly.to} go={s.fly.go} held duration={880}>
              <Badge color={BOOKINGS[s.fly.i].color}>
                {s.fly.i === 0 ? <Plane size={20} strokeWidth={2.2} /> : <BedDouble size={20} strokeWidth={2.2} />}
              </Badge>
            </Fly>
          )}
        </>
      )}
    </Stage>
  )
}
