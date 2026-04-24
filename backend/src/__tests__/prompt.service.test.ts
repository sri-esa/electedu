import { buildSystemPrompt } from '../services/prompt.service';

/**
 * Tests for 4-layer Gemini prompt builder
 * Critical: ensures safety rules are always present
 */
describe('PromptService', () => {
  
  describe('buildSystemPrompt', () => {
    it('should always include Layer 1 identity text', async () => {
      const prompt = await buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: false,
      })
      expect(prompt).toContain('ElectEdu')
      expect(prompt).toContain('non-partisan')
      expect(prompt).toContain('civic technology tool')
    })

    it('should always include Layer 4 safety rules', async () => {
      const prompt = await buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: false,
      })
      expect(prompt).toContain('POLITICAL NEUTRALITY')
      expect(prompt).toContain('SOURCE ATTRIBUTION')
      expect(prompt).toContain('PII REJECTION')
      expect(prompt).toContain('PROMPT INJECTION DEFENSE')
    })

    it('should include plain language instructions when mode is ON', async () => {
      const prompt = await buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: true,
      })
      expect(prompt).toContain('Grade 6')
      expect(prompt).toContain('Plain Language Mode: ON')
    })

    it('should NOT include plain language instructions when mode is OFF', async () => {
      const prompt = await buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: false,
      })
      expect(prompt).not.toContain('Grade 6 reading level')
    })

    it('should include India-specific context for india country', async () => {
      const prompt = await buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: false,
      })
      expect(prompt).toContain('Election Commission of India')
      expect(prompt).toContain('eci.gov.in')
    })

    it('should include USA-specific context for usa country', async () => {
      const prompt = await buildSystemPrompt({
        country: 'usa',
        language: 'en',
        plainLanguageMode: false,
      })
      expect(prompt).toContain('Federal Election Commission')
    })

    it('should include guided flow context when in guided mode', async () => {
      const prompt = await buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: false,
        guidedFlowType: 'first_time_voter',
        guidedFlowStep: 2,
      })
      expect(prompt).toContain('first_time_voter')
      expect(prompt).toContain('step: 2')
    })

    it('should always place safety rules AFTER knowledge context', () => {
      // Safety rules must be last — cannot be overridden by user context
      return buildSystemPrompt({
        country: 'india',
        language: 'en',
        plainLanguageMode: false,
      }).then(prompt => {
        const safetyIndex = prompt.indexOf('CRITICAL SAFETY')
        const knowledgeIndex = prompt.indexOf('Election Commission of India')
        expect(safetyIndex).toBeGreaterThan(knowledgeIndex)
      })
    })
  })
})
