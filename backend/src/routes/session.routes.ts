import { FastifyInstance } from 'fastify'
import crypto from 'crypto'
import { createLogger } from '../logger'
import { HTTP_STATUS } from '../constants'

const logger = createLogger('session-routes')

/**
 * @description Registers the session route for creating anonymous analytics sessions
 * @param {FastifyInstance} fastify - Fastify server instance
 * @returns {Promise<void>}
 * @throws {Error} Never throws
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
    } catch (err: unknown) {
      logger.warn('session', 'Failed to log session start to firestore', { sessionId }, err)
    }

    return reply.status(HTTP_STATUS.OK).send({ sessionId })
  })
}
