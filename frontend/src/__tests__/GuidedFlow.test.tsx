import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { GuidedFlow } from '../components/flow/GuidedFlow'
import { useSettingsStore } from '../store/settings.store'

describe('GuidedFlow', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      appState: 'GUIDED_FLOW',
      guidedFlowType: 'first_time_voter',
      guidedFlowStep: 1,
    })
  })

  it('renders step 1 content', () => {
    render(<GuidedFlow />)
    expect(
      screen.queryByText(/registration/i) ||
      screen.queryByText(/voter list/i) ||
      screen.queryByText(/step 1/i)
    ).toBeTruthy()
  })

  it('shows progress indicator', () => {
    render(<GuidedFlow />)
    expect(
      screen.queryByText(/1 of 5/i) ||
      screen.queryByText(/step 1/i)
    ).toBeTruthy()
  })

  it('next button advances to step 2', () => {
    render(<GuidedFlow />)
    const nextBtn = screen.queryByText(/registration/i)?.closest('button') || screen.getAllByRole('button')[0]
    fireEvent.click(nextBtn as HTMLElement)
    expect(useSettingsStore.getState().guidedFlowStep).toBe(2)
  })

  it('renders step 5 completion correctly', () => {
    useSettingsStore.setState({ guidedFlowStep: 5 })
    render(<GuidedFlow />)
    expect(
      screen.queryAllByText(/ready/i).length > 0 ||
      screen.queryByText(/complete/i) ||
      screen.queryByText(/congratulations/i)
    ).toBeTruthy()
  })
})
