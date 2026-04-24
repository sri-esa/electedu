import { FastifyInstance } from 'fastify'
import crypto from 'crypto'

/**
 * Session Routes — POST /api/session
 * Creates anonymous session for analytics tracking
 * PRIVACY: No PII stored — anonymous UUID only
 */
export async function sessionRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.post('/session', async (request, reply) => {
    const sessionId = crypto.randomUUID()
    const { country = 'india' } = 
      (request.body as { country?: string }) || {}

    // Log session start to Firestore (anonymous)
    try {
      const { db } = await import('../services/firestore.service')
      await db.collection('sessions').doc(sessionId).set({
        sessionId,
        country,
        startedAt: new Date().toISOString(),
        // No IP, no device info, no PII
      })
    } catch {
      // Non-critical — continue without analytics
    }

    return reply.send({ sessionId })
  })
}
