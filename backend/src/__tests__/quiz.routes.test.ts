import Fastify from 'fastify'
import { quizRoutes } from '../routes/quiz.routes'

describe('Quiz Routes', () => {
    const app = Fastify()
    beforeAll(async () => {
        await app.register(quizRoutes, { prefix: '/api' })
        await app.ready()
    })
    afterAll(() => app.close())

    it('POST /api/quiz/submit returns success', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/quiz/submit',
            payload: {
                sessionId: 'test-123',
                preScore: 2,
                postScore: 4,
                country: 'india'
            }
        })
        expect(res.statusCode).toBe(200)
        const body = JSON.parse(res.body)
        expect(body.success).toBe(true)
        expect(body.improvement).toBe(2)
    })

    it('POST /api/quiz/submit returns 400 for invalid scores', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/quiz/submit',
            payload: {
                sessionId: 'test-123',
                preScore: 'bad',
                postScore: 'bad',
                country: 'india'
            }
        })
        expect(res.statusCode).toBe(400)
    })
})