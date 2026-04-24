/**
 * Settings Store — Persists to localStorage (REQ-06)
 * Controls: country, language, plain language mode
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Country, Language, AppState } from '../types'

interface SettingsState {
  country: Country
  language: Language
  plainLanguageMode: boolean
  appState: AppState
  guidedFlowType: string | null
  guidedFlowStep: number
  
  setCountry: (country: Country) => void
  setLanguage: (language: Language) => void
  togglePlainLanguage: () => void
  setAppState: (state: AppState) => void
  setGuidedFlow: (type: string, step: number) => void
  advanceGuidedStep: () => void
  resetFlow: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      country: 'india',
      language: 'en',
      plainLanguageMode: false,
      appState: 'ONBOARDING',
      guidedFlowType: null,
      guidedFlowStep: 1,

      setCountry: (country) => set({ country, appState: 'ONBOARDING' }),
      setLanguage: (language) => set({ language }),
      togglePlainLanguage: () => 
        set((s) => ({ plainLanguageMode: !s.plainLanguageMode })),
      setAppState: (appState) => set({ appState }),
      setGuidedFlow: (type, step) => set({
        guidedFlowType: type,
        guidedFlowStep: step,
        appState: 'GUIDED_FLOW',
      }),
      advanceGuidedStep: () => set((s) => ({
        guidedFlowStep: s.guidedFlowStep + 1,
      })),
      resetFlow: () => set({
        appState: 'ONBOARDING',
        guidedFlowType: null,
        guidedFlowStep: 1,
      }),
    }),
    {
      name: 'electedu-settings', // localStorage key
      partialize: (state) => ({
        country: state.country,
        language: state.language,
        plainLanguageMode: state.plainLanguageMode,
        appState: state.appState,
        guidedFlowType: state.guidedFlowType,
        guidedFlowStep: state.guidedFlowStep,
      }),
    }
  )
)
