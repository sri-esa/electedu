import Fastify from 'fastify'
import { sessionRoutes } from '../routes/session.routes'

describe('Session Routes', () => {
    const app = Fastify()
    beforeAll(async () => {
        await app.register(sessionRoutes, { prefix: '/api' })
        await app.ready()
    })
    afterAll(() => app.close())

    it('POST /api/session returns a sessionId', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/session',
            payload: { country: 'india' }
        })
        expect(res.statusCode).toBe(200)
        const body = JSON.parse(res.body)
        expect(body.sessionId).toBeDefined()
        expect(typeof body.sessionId).toBe('string')
    })

    it('POST /api/session works without country field', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/session',
            payload: {}
        })
        expect(res.statusCode).toBe(200)
    })
})