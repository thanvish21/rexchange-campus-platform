import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(isOpen) {
  const ref = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocus.current = document.activeElement

    const el = ref.current
    if (!el) return

    const focusable = el.querySelectorAll(FOCUSABLE)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    el.addEventListener('keydown', handleKeyDown)
    setTimeout(() => first?.focus(), 50)

    return () => {
      el.removeEventListener('keydown', handleKeyDown)
      previousFocus.current?.focus()
    }
  }, [isOpen])

  return ref
}
