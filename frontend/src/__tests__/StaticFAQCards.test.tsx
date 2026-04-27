import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { StaticFAQCards } from '../components/common/StaticFAQCards'

describe('StaticFAQCards', () => {
  it('renders without crashing', () => {
    render(<StaticFAQCards />)
    expect(document.body).toBeTruthy()
  })

  it('shows offline message or FAQ content', () => {
    render(<StaticFAQCards />)
    expect(
      screen.queryByText(/question/i) ||
      screen.queryByText(/faq/i) ||
      screen.queryByText(/offline/i) ||
      screen.queryByText(/election/i)
    ).toBeTruthy()
  })

  it('renders without API calls', () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    render(<StaticFAQCards />)
    // StaticFAQCards must not call fetch — it's offline content
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})
