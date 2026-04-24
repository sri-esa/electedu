/**
 * Health Routes — GET /health
 * Used by Cloud Run for liveness/readiness probes
 */
import { FastifyInstance } from 'fastify'

export async function healthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get('/health', async (request, reply) => {
    return reply.send({
      status: 'ok',
      service: 'electedu-backend',
      version: '1.0.0',
      uptime: Math.floor(process.uptime()),
      googleServices: {
        gemini: !!process.env.GEMINI_API_KEY,
        firestore: !!process.env.PROJECT_ID,
        pubsub: !!process.env.PROJECT_ID,
      },
      timestamp: new Date().toISOString(),
    })
  })
}
