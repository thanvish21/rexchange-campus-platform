import { useRef, useCallback } from 'react'
import './SpotlightCard.css'

/**
 * SpotlightCard — MagicUI-style mouse-following radial glow.
 * Wraps children in a card that lights up where the cursor is.
 */
export function SpotlightCard({ children, className = '', style }) {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={onMove}
      style={style}
    >
      <div className="spotlight-overlay" aria-hidden="true" />
      {children}
    </div>
  )
}
