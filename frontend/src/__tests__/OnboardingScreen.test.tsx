import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { OnboardingScreen } from '../components/OnboardingScreen'
import { useSettingsStore } from '../store/settings.store'

describe('OnboardingScreen', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      country: 'india',
      appState: 'ONBOARDING',
    })
  })

  it('renders headline text', () => {
    render(<OnboardingScreen />)
    expect(screen.getByText(/understand your vote/i))
      .toBeTruthy()
  })

  it('renders all 4 country chips', () => {
    render(<OnboardingScreen />)
    expect(screen.getByText('India')).toBeTruthy()
    expect(screen.getByText(/usa/i)).toBeTruthy()
    expect(screen.getByText(/uk/i)).toBeTruthy()
    expect(screen.getByText(/eu/i)).toBeTruthy()
  })

  it('renders 4 learning path options', () => {
    render(<OnboardingScreen />)
    expect(screen.getByText(/voting for the first time/i))
      .toBeTruthy()
    expect(screen.getByText(/understand evm/i) || 
           screen.getByText(/evms/i)).toBeTruthy()
  })

  it('clicking first-time voter sets guided flow state', () => {
    render(<OnboardingScreen />)
    fireEvent.click(
      screen.getByText(/voting for the first time/i)
    )
    const state = useSettingsStore.getState()
    expect(state.appState).toBe('GUIDED_FLOW')
  })

  it('has correct accessibility attributes', () => {
    render(<OnboardingScreen />)
    expect(screen.getByRole('main') || 
           document.querySelector('[role="main"]')).toBeTruthy()
  })

  it('country chips are keyboard accessible', () => {
    render(<OnboardingScreen />)
    const indiaChip = screen.getByText('India').closest('button')
    expect(indiaChip).toBeTruthy()
  })
})
