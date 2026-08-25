import { describe, it, expect, beforeEach } from 'vitest'
import { getRemainingFree, recordConnection, FREE_MATCH_LIMIT } from './connections.js'

describe('Connection Quota System', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with default free connection limit', () => {
    const remaining = getRemainingFree()
    expect(remaining).toBe(FREE_MATCH_LIMIT)
  })

  it('should decrement remaining connections when a match is recorded', () => {
    const initial = getRemainingFree()
    recordConnection()
    const updated = getRemainingFree()
    expect(updated).toBe(initial - 1)
  })

  it('should not drop below zero remaining free connections', () => {
    for (let i = 0; i < FREE_MATCH_LIMIT + 2; i++) {
      recordConnection()
    }
    expect(getRemainingFree()).toBe(0)
  })
})
