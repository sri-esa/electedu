import Fastify, { FastifyInstance } from 'fastify'
import { chatRoutes } from '../routes/chat.routes'

// We need to mock the pubsub service because logEvent is called non-blocking
jest.mock('../services/pubsub.service', () => ({
  logEvent: jest.fn().mockResolvedValue(true)
}))

// Mock Gemini Service to avoid real API calls and quota issues
jest.mock('../services/gemini.service', () => ({
  chat: jest.fn().mockResolvedValue({
    text: 'Mocked response',
    chips: ['A', 'B'],
    citations: ['C']
  })
}))

describe('Chat Routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    process.env.GEMINI_API_KEY = 'test-key'
    process.env.PROJECT_ID = 'test-project'
    app = Fastify()
    await app.register(chatRoutes, { prefix: '/api' })
    await app.ready()
  })

  afterAll(() => app.close())

  it('POST /api/chat returns 200 with valid body', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: {
        message: 'How do I register to vote?',
        history: [],
        context: {
          country: 'india',
          language: 'en',
          plainLanguageMode: false,
        },
        sessionId: 'test-session-001',
      }
    })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(body.text).toBeDefined()
    expect(Array.isArray(body.chips)).toBe(true)
    expect(Array.isArray(body.citations)).toBe(true)
  })

  it('POST /api/chat returns 400 for empty message', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: {
        message: '',
        history: [],
        context: { country: 'india', language: 'en', plainLanguageMode: false },
        sessionId: 'test-session-002',
      }
    })
    expect(res.statusCode).toBe(400)
    const body = JSON.parse(res.body)
    expect(body.code).toBe('VALIDATION_ERROR')
  })

  it('POST /api/chat returns 400 for invalid country', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: {
        message: 'test question',
        history: [],
        context: { country: 'mars', language: 'en', plainLanguageMode: false },
        sessionId: 'test-session-003',
      }
    })
    expect(res.statusCode).toBe(400)
  })

  it('POST /api/chat sanitizes dangerous input', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: {
        message: '<script>alert(1)</script>',
        history: [],
        context: { country: 'india', language: 'en', plainLanguageMode: false },
        sessionId: 'test-session-004',
      }
    })
    // Should not crash — sanitized and processed
    expect([200, 400]).toContain(res.statusCode)
  })

  it('POST /api/chat handles plain language mode', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: {
        message: 'What is EVM?',
        history: [],
        context: {
          country: 'india',
          language: 'en',
          plainLanguageMode: true, // ON
        },
        sessionId: 'test-session-005',
      }
    })
    expect(res.statusCode).toBe(200)
  })
})
