import { FastifyInstance } from 'fastify'

export async function dataRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/timeline/:country/:year', async (request, reply) => {
    // Stub for returning timeline data
    return reply.send({ timelineId: 'mock', nodes: [] })
  })

  fastify.get('/faq/:country', async (request, reply) => {
    // Stub for returning FAQ data
    return reply.send({ country: 'mock', faqs: [] })
  })
}
