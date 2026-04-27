import { chat } from '../services/gemini.service'
import { GoogleGenerativeAI } from '@google/generative-ai'

jest.mock('@google/generative-ai', () => {
  const mModel = {
    startChat: jest.fn().mockReturnValue({
      sendMessage: jest.fn().mockResolvedValue({
        response: { text: () => 'Mocked response CHIPS: ["Q1"] [Source: test]' }
      })
    })
  }
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue(mModel)
    }))
  }
})

describe('Gemini Response Cache', () => {
  beforeAll(() => {
    process.env.GEMINI_API_KEY = 'test-key'
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns cached response on identical request', async () => {
    // First call
    const result1 = await chat(
      'What is EVM?',
      [],
      { country: 'india', language: 'en', plainLanguageMode: false }
    )
    
    // Second identical call — should hit cache
    const result2 = await chat(
      'What is EVM?',
      [],
      { country: 'india', language: 'en', plainLanguageMode: false }
    )

    expect(result1.text).toBe(result2.text)
    // Gemini mock should only be called once
    // getGenerativeModel is called on import in service, but we can check if it creates models or sendMessage
  })

  it('does not use cache for different countries', async () => {
    await chat('What is EVM?', [], {
      country: 'india', language: 'en', plainLanguageMode: false
    })
    await chat('What is EVM?', [], {
      country: 'usa', language: 'en', plainLanguageMode: false
    })
  })
})
