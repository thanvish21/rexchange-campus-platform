import { describe, it, expect, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBodyScrollLock } from './useFocusTrap.js'

describe('useBodyScrollLock System', () => {
  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('should lock document body scroll on open', () => {
    const { unmount } = renderHook(({ isOpen }) => useBodyScrollLock(isOpen), {
      initialProps: { isOpen: true },
    })
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('should restore body scroll when all overlays unmount', () => {
    const hook1 = renderHook(() => useBodyScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
    hook1.unmount()
    expect(document.body.style.overflow).toBe('')
  })
})
