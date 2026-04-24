import Fastify, { FastifyInstance } from 'fastify';
import { healthRoutes } from '../routes/health.routes';

describe('Health Routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = Fastify()
    await app.register(healthRoutes)
    await app.ready()
  })

  afterAll(() => app.close())

  it('GET /health returns 200 with ok status', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health',
    })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(body.status).toBe('ok')
    expect(body.service).toBe('electedu-backend')
    expect(body.version).toBeDefined()
    expect(body.uptime).toBeGreaterThanOrEqual(0)
  })

  it('GET /health returns googleServices object', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health',
    })
    const body = JSON.parse(res.body)
    expect(body.googleServices).toBeDefined()
    expect(typeof body.googleServices.gemini).toBe('boolean')
  })
})
