import Fastify, { FastifyInstance } from 'fastify'
import { dataRoutes } from '../routes/data.routes'

// Mock the loader functions
jest.mock('../data/loader', () => ({
  loadTimelineData: jest.fn().mockImplementation((country, year) => {
    return Promise.resolve({ nodes: [{ title: 'Event' }] })
  }),
  loadFAQData: jest.fn().mockImplementation((country) => {
    if (country === 'unknown') return Promise.resolve({ faqs: [] })
    return Promise.resolve({ faqs: [{ question: 'Q', answer: 'A' }] })
  })
}))

describe('Data Routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = Fastify()
    await app.register(dataRoutes, { prefix: '/api' })
    await app.ready()
  })

  afterAll(() => app.close())

  it('GET /api/faq/india returns FAQ array', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/faq/india',
    })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(Array.isArray(body.faqs)).toBe(true)
  })

  it('GET /api/faq/usa returns FAQ array', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/faq/usa',
    })
    expect(res.statusCode).toBe(200)
  })

  it('GET /api/timeline/india/2024 returns nodes array', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/timeline/india/2024',
    })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(Array.isArray(body.nodes)).toBe(true)
    expect(body.nodes.length).toBeGreaterThan(0)
  })

  it('GET /api/faq/unknown returns empty faqs', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/faq/unknown',
    })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(body.faqs ?? []).toEqual([])
  })
})
