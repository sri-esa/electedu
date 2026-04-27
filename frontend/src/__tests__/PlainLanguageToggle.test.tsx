import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { PlainLanguageToggle } from '../components/common/PlainLanguageToggle'
import { useSettingsStore } from '../store/settings.store'

describe('PlainLanguageToggle', () => {
  beforeEach(() => {
    useSettingsStore.setState({ plainLanguageMode: false })
  })

  it('renders toggle button', () => {
    render(<PlainLanguageToggle />)
    expect(
      screen.queryByRole('button') ||
      screen.queryByRole('switch') ||
      screen.queryByRole('checkbox')
    ).toBeTruthy()
  })

  it('toggles plain language mode on click', () => {
    render(<PlainLanguageToggle />)
    const toggle = screen.queryByRole('button') ||
                   screen.queryByRole('switch')
    fireEvent.click(toggle as HTMLElement)
    expect(useSettingsStore.getState().plainLanguageMode).toBe(true)
  })

  it('shows ON state when plain language is active', () => {
    useSettingsStore.setState({ plainLanguageMode: true })
    render(<PlainLanguageToggle />)
    expect(
      screen.queryByText(/on/i) ||
      screen.queryByText(/simple/i) ||
      document.querySelector('[aria-checked="true"]')
    ).toBeTruthy()
  })
})
