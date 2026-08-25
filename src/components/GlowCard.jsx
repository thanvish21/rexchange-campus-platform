import { useEffect, useRef } from 'react'
import './GlowCard.css'

/**
 * GlowCard — 21st.dev spotlight component.
 * Mouse-tracking hue-shifting border glow + spotlight fill.
 */
const glowColorMap = {
  blue: { base: 220, spread: 180 },
  purple: { base: 275, spread: 220 },
  green: { base: 140, spread: 160 },
}

export default function GlowCard({ children, className = '', glowColor = 'blue', style }) {
  const cardRef = useRef(null)
  const { base, spread } = glowColorMap[glowColor] || glowColorMap.blue

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    // Set initial center coordinates
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', (rect.width / 2).toFixed(2))
    el.style.setProperty('--glow-y', (rect.height / 2).toFixed(2))

    const syncPointer = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--glow-x', x.toFixed(2))
      el.style.setProperty('--glow-y', y.toFixed(2))
      el.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2))
    }

    el.addEventListener('pointermove', syncPointer)
    return () => el.removeEventListener('pointermove', syncPointer)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`glow-card glow-card--${glowColor} ${className}`}
      style={{ '--base': base, '--spread': spread, ...style }}
    >
      {children}
    </div>
  )
}
