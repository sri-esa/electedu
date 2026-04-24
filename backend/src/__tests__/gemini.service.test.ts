import { chat } from '../services/gemini.service';

// Mock the Gemini API — never call real API in tests
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      startChat: jest.fn().mockReturnValue({
        sendMessage: jest.fn().mockResolvedValue({
          response: {
            text: () => 
              'EVMs have no wireless connectivity. ' +
              '[Source: ECI Technical Whitepaper]\n' +
              'CHIPS: ["How is VVPAT used?", "Can EVM be audited?", "Who makes EVMs?"]'
          }
        })
      })
    })
  }))
}))

describe('GeminiService', () => {
  describe('chat', () => {
    beforeEach(() => {
      process.env.GEMINI_API_KEY = 'test-key'
    })

    it('should return text, chips, and citations', async () => {
      const result = await chat(
        'Are EVMs safe?',
        [],
        { country: 'india', language: 'en', plainLanguageMode: false }
      )
      expect(result.text).toBeDefined()
      expect(result.text.length).toBeGreaterThan(0)
      expect(Array.isArray(result.chips)).toBe(true)
      expect(Array.isArray(result.citations)).toBe(true)
    })

    it('should parse CHIPS from response correctly', async () => {
      const result = await chat(
        'Are EVMs safe?',
        [],
        { country: 'india', language: 'en', plainLanguageMode: false }
      )
      expect(result.chips).toContain('How is VVPAT used?')
      expect(result.chips.length).toBeLessThanOrEqual(3)
    })

    it('should extract citations from [Source: X] pattern', async () => {
      const result = await chat(
        'Are EVMs safe?',
        [],
        { country: 'india', language: 'en', plainLanguageMode: false }
      )
      expect(result.citations).toContain('ECI Technical Whitepaper')
    })

    it('should NOT include CHIPS line in returned text', async () => {
      const result = await chat(
        'Are EVMs safe?',
        [],
        { country: 'india', language: 'en', plainLanguageMode: false }
      )
      expect(result.text).not.toContain('CHIPS:')
    })
  })
})
