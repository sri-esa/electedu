import { useSettingsStore } from '../store/settings.store';

describe('SettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      country: 'india',
      language: 'en',
      plainLanguageMode: false,
      appState: 'ONBOARDING',
      guidedFlowType: null,
      guidedFlowStep: 1,
    })
  })

  it('setCountry updates country and resets to ONBOARDING', () => {
    const { setCountry } = useSettingsStore.getState()
    setCountry('usa')
    const state = useSettingsStore.getState()
    expect(state.country).toBe('usa')
    expect(state.appState).toBe('ONBOARDING')
  })

  it('togglePlainLanguage flips the boolean', () => {
    const { togglePlainLanguage } = useSettingsStore.getState()
    expect(useSettingsStore.getState().plainLanguageMode).toBe(false)
    togglePlainLanguage()
    expect(useSettingsStore.getState().plainLanguageMode).toBe(true)
    togglePlainLanguage()
    expect(useSettingsStore.getState().plainLanguageMode).toBe(false)
  })

  it('setGuidedFlow sets type, step, and appState', () => {
    const { setGuidedFlow } = useSettingsStore.getState()
    setGuidedFlow('first_time_voter', 1)
    const state = useSettingsStore.getState()
    expect(state.guidedFlowType).toBe('first_time_voter')
    expect(state.guidedFlowStep).toBe(1)
    expect(state.appState).toBe('GUIDED_FLOW')
  })

  it('advanceGuidedStep increments step by 1', () => {
    useSettingsStore.setState({ guidedFlowStep: 2 })
    const { advanceGuidedStep } = useSettingsStore.getState()
    advanceGuidedStep()
    expect(useSettingsStore.getState().guidedFlowStep).toBe(3)
  })

  it('resetFlow returns to ONBOARDING with null flow', () => {
    useSettingsStore.setState({
      appState: 'GUIDED_FLOW',
      guidedFlowType: 'first_time_voter',
      guidedFlowStep: 3,
    })
    const { resetFlow } = useSettingsStore.getState()
    resetFlow()
    const state = useSettingsStore.getState()
    expect(state.appState).toBe('ONBOARDING')
    expect(state.guidedFlowType).toBeNull()
    expect(state.guidedFlowStep).toBe(1)
  })
})
