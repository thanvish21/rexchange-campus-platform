import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

let activeScrollLocks = 0

export function useBodyScrollLock(isOpen) {
  useEffect(() => {
    if (!isOpen) return

    activeScrollLocks++
    if (activeScrollLocks === 1) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      activeScrollLocks = Math.max(0, activeScrollLocks - 1)
      if (activeScrollLocks === 0) {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])
}

export function useFocusTrap(config = true) {
  const isOpen = typeof config === 'object' ? config.isOpen : config
  const onClose = typeof config === 'object' ? config.onClose : null
  const initialFocusRef = typeof config === 'object' ? config.initialFocusRef : null

  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    if (document.activeElement && !containerRef.current?.contains(document.activeElement)) {
      previousFocusRef.current = document.activeElement
    }

    const container = containerRef.current
    if (!container) return

    const getFocusable = () => {
      const elements = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
      return elements.filter(
        (el) => el.offsetParent !== null && !el.hasAttribute('aria-hidden')
      )
    }

    const timer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else {
        const focusable = getFocusable()
        if (focusable.length > 0) {
          focusable[0].focus()
        } else {
          container.setAttribute('tabindex', '-1')
          container.focus()
        }
      }
    }, 30)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault()
        e.stopPropagation()
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first || !container.contains(document.activeElement)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last || !container.contains(document.activeElement)) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown, true)
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, onClose, initialFocusRef])

  return containerRef
}
