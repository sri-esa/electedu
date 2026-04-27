import { FastifyInstance } from 'fastify'
import { createLogger } from '../logger'
import { HTTP_STATUS } from '../constants'
import { ValidationError } from '../errors'

const logger = createLogger('quiz-routes')

/**
 * @description Registers the quiz submission route for saving anonymous scores
 * @param {FastifyInstance} fastify - Fastify server instance
 * @returns {Promise<void>}
 * @throws {Error} Never throws
 */
export async function quizRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.post('/quiz/submit', async (request, reply) => {
    try {
      const { sessionId, preScore, postScore, country } =
        (request.body as {
          sessionId: string
          preScore: number
          postScore: number
          country: string
        }) || {}

      if (typeof preScore !== 'number' || 
          typeof postScore !== 'number') {
        throw new ValidationError('Invalid score values')
      }

      try {
        const { db } = await import('../services/firestore.service')
        await db.collection('quiz_results').add({
          sessionId: sessionId ?? 'anonymous',
          preScore,
          postScore,
          improvement: postScore - preScore,
          country: country ?? 'india',
          submittedAt: new Date().toISOString(),
        })
      } catch (err: unknown) {
        logger.warn('quiz', 'Failed to save quiz results to firestore', { sessionId }, err)
      }

      return reply.status(HTTP_STATUS.OK).send({
        success: true,
        improvement: postScore - preScore,
      })
    } catch (err: unknown) {
      logger.error('quiz', 'Failed to process quiz submission', {}, err)
      if (err instanceof ValidationError) {
        return reply.status(HTTP_STATUS.BAD_REQUEST).send({
          error: err.message,
          code: err.code,
        })
      }
      return reply.status(HTTP_STATUS.INTERNAL_ERROR).send({
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
      })
    }
  })
}
