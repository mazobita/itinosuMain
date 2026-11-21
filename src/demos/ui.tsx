import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { CalendarDays, ChevronRight, CircleEllipsis } from 'lucide-react'
import './ui.css'

// Itinosu's own components, rebuilt from the Figma library (TripCard,
// TripStatusPill, TripWidgetTile, ExpenseSummary) so every demo on the page
// draws the app the way the app draws itself. Colors come from the page's
// --itn-* tokens, so light and dark follow prefers-color-scheme.

/** The page's color scheme, for the Stage's theme prop. */
export function useScheme(): 'light' | 'dark' {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const on = () => setDark(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return dark ? 'dark' : 'light'
}

export function TripCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`itn-trip${className ? ` ${className}` : ''}`} style={style}>
      <img className="itn-trip__cover" src="/img/cover-kyoto.png" alt="" draggable={false} />
      <div className="itn-trip__body">
        <div className="itn-trip__title-row">
          <span className="itn-trip__title">Kyoto &amp; Osaka Spring Trip</span>
          <span className="itn-trip__more">
            <CircleEllipsis size={22} strokeWidth={1.8} />
          </span>
        </div>
        <span className="itn-trip__dates">12 – 24 Apr 2027</span>
        <div className="itn-trip__footer">
          <span className="itn-pill">
            <CalendarDays size={15} strokeWidth={2} />
            Upcoming
          </span>
          <span className="itn-trip__where">Kyoto, Japan · in 170 days</span>
        </div>
      </div>
    </div>
  )
}

/** A trip widget's icon badge: one accent fill, a white glyph. */
export function Badge({ color, children, className, ...rest }: { color: string; children: ReactNode; className?: string; [k: `data-${string}`]: unknown }) {
  return (
    <span {...rest} className={`itn-badge${className ? ` ${className}` : ''}`} style={{ '--badge': color } as CSSProperties}>
      {children}
    </span>
  )
}

export function WidgetTile({ badge, title, detail, className, ...rest }: { badge: ReactNode; title: string; detail: ReactNode; className?: string; [k: `data-${string}`]: unknown }) {
  return (
    <div {...rest} className={`itn-tile${className ? ` ${className}` : ''}`}>
      <div className="itn-tile__top">
        {badge}
        <ChevronRight className="itn-tile__chev" size={20} strokeWidth={2.2} />
      </div>
      <span className="itn-tile__title">{title}</span>
      <span className="itn-tile__detail">{detail}</span>
    </div>
  )
}

export function ExpenseSummary({ total, entries, className }: { total: ReactNode; entries: ReactNode; className?: string }) {
  return (
    <div className={`itn-expense${className ? ` ${className}` : ''}`}>
      <span className="itn-eyebrow-muted">Trip expenses</span>
      <span className="itn-expense__total">{total}</span>
      <span className="itn-expense__meta">{entries} · all amounts in Indian rupees (₹)</span>
    </div>
  )
}

/** Indian digit grouping, as the app shows rupees: ₹ 1,60,440 */
export const inr = (n: number) => '₹ ' + Math.round(n).toLocaleString('en-IN')
