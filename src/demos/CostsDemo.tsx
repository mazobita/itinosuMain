import { BedDouble, Plane, TramFront } from 'lucide-react'
import { Bar, Collapse, Count, Stage, type Act } from '../kit'
import { Badge, ExpenseSummary, inr, useScheme } from './ui'
import './costs.css'

// 10.02 "See what the trip costs".
//
// What the system does: an expense is added to the trip and lands at the top
// of its list, every amount in the trip's one currency, and a beat later the
// ExpenseSummary above follows it: 28 entries become 29 and the total rolls
// from ₹ 1,57,840 to ₹ 1,60,440 (the Figma value). Cause first, then effect.
// Plays once in view; the poster is the finished frame.

const NEW = { name: 'Shinkansen, Kyoto → Osaka', sub: 'Transport · 18 Apr', amount: 2600 }
const BASE = 160440 - NEW.amount

type S = { added: boolean; counted: boolean }
const START: S = { added: false, counted: false }
const DONE: S = { added: true, counted: true }

async function script(a: Act<S>) {
  await a.wait(900)
  a.mark('add')
  await a.set({ added: true })
  await a.wait(650)
  a.mark('total')
  await a.set({ counted: true })
  await a.wait(1200)
}

function Expense({ glyph, color, name, sub, amount }: { glyph: React.ReactNode; color: string; name: string; sub: string; amount: number }) {
  return (
    <div className="cd-row">
      <Badge color={color} className="cd-badge">
        {glyph}
      </Badge>
      <span className="cd-row__text">
        <span className="cd-row__name">{name}</span>
        <span className="cd-row__sub">{sub}</span>
      </span>
      <span className="cd-row__amount">{inr(amount)}</span>
    </div>
  )
}

export default function CostsDemo() {
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
      unframed
      className="itn-demo cd"
    >
      {(s) => (
        <div className="cd-col">
          <ExpenseSummary
            total={<Count value={s.counted ? BASE + NEW.amount : BASE} format={inr} duration={900} />}
            entries={
              <>
                <Count value={s.counted ? 29 : 28} duration={500} /> entries
              </>
            }
          />
          <div className="cd-list ss-fade-b">
            <Collapse open={s.added}>
              <Expense glyph={<TramFront size={18} strokeWidth={2.2} />} color="var(--accent-green)" {...NEW} />
            </Collapse>
            <Expense glyph={<BedDouble size={18} strokeWidth={2.2} />} color="var(--accent-orange)" name="Ryokan Sakura" sub="Stay · 12 nights" amount={84000} />
            <Expense glyph={<Plane size={18} strokeWidth={2.2} />} color="var(--accent-blue)" name="IndiGo 6E123" sub="Flights · 3 tickets" amount={38400} />
            {/* Older entries: filler, the only rows the crop may cut */}
            {[
              [118, 64, 58],
              [96, 80, 50],
            ].map(([name, sub, amount], i) => (
              <div key={i} className="cd-row cd-row--filler">
                <Bar w={32} h={32} r={9} tone={2} />
                <span className="cd-row__text">
                  <Bar w={name} h={8} tone={3} />
                  <Bar w={sub} h={6} tone={2} />
                </span>
                <Bar w={amount} h={8} tone={3} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Stage>
  )
}
