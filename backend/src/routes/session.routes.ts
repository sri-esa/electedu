import { FastifyInstance } from 'fastify'

export async function sessionRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/session', async (request, reply) => {
    return reply.send({ sessionId: 'anon-' + Date.now() })
  })
}
