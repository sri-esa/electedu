import Fastify, { FastifyInstance } from 'fastify'
import { securityMiddleware } from '../middleware/security'

describe('Security Middleware', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = Fastify()
    await securityMiddleware(app)
    app.get('/test', async () => ({ ok: true }))
    await app.ready()
  })

  afterAll(() => app.close())

  it('adds X-Content-Type-Options header', async () => {
    const res = await app.inject({ method: 'GET', url: '/test' })
    expect(res.headers['x-content-type-options']).toBe('nosniff')
  })

  it('adds X-Frame-Options header', async () => {
    const res = await app.inject({ method: 'GET', url: '/test' })
    expect(res.headers['x-frame-options']).toBe('DENY')
  })

  it('adds Strict-Transport-Security header', async () => {
    const res = await app.inject({ method: 'GET', url: '/test' })
    expect(res.headers['strict-transport-security']).toContain('max-age')
  })

  it('adds Referrer-Policy header', async () => {
    const res = await app.inject({ method: 'GET', url: '/test' })
    expect(res.headers['referrer-policy']).toBeDefined()
  })
})
