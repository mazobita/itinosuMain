import { BriefcaseMedical, IdCard, MapPin, TramFront } from 'lucide-react'
import { Badge, WidgetTile } from './ui'

// 10.02 "Everything for the trip, together": four of the trip's widgets,
// rendered to static HTML (no hydration). Each rises in as it scrolls in.
const TILES = [
  { color: 'var(--accent-indigo)', Glyph: IdCard, title: 'Visa', detail: 'Japan · eVisa' },
  { color: 'var(--accent-pink)', Glyph: BriefcaseMedical, title: 'Insurance', detail: 'Tata AIG · valid 11–25 Apr' },
  { color: 'var(--accent-green)', Glyph: TramFront, title: 'Public transport', detail: 'JR Pass · 7 days' },
  { color: 'var(--accent-teal)', Glyph: MapPin, title: 'Places', detail: '12 places · Kyoto, Osaka' },
]

export default function FlightsTiles() {
  return (
    <div className="tile-grid">
      {TILES.map((t, i) => (
        <div key={t.title} data-scroll-in="" style={{ ['--delay' as string]: `${i * 0.1}s` }}>
          <WidgetTile
            badge={
              <Badge color={t.color}>
                <t.Glyph size={20} strokeWidth={2.2} />
              </Badge>
            }
            title={t.title}
            detail={t.detail}
          />
        </div>
      ))}
    </div>
  )
}
