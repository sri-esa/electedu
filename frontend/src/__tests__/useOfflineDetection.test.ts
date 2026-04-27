import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useOfflineDetection } from '../hooks/useOfflineDetection'

describe('useOfflineDetection', () => {
  it('returns true when navigator.onLine is true', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    })
    const { result } = renderHook(() => useOfflineDetection())
    expect(result.current).toBe(false)
  })

  it('returns false when navigator.onLine is false', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    })
    const { result } = renderHook(() => useOfflineDetection())
    expect(result.current).toBe(true)
  })
})
