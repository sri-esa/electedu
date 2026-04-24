import { FastifyInstance } from 'fastify'

export async function quizRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/quiz/submit', async (request, reply) => {
    return reply.send({ success: true, score: 100 })
  })
}
