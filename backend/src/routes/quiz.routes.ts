import { FastifyInstance } from 'fastify'

/**
 * Quiz Routes — POST /api/quiz/submit
 * Saves quiz score anonymously for analytics
 */
export async function quizRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.post('/quiz/submit', async (request, reply) => {
    const { sessionId, preScore, postScore, country } =
      (request.body as {
        sessionId: string
        preScore: number
        postScore: number
        country: string
      }) || {}

    if (typeof preScore !== 'number' || 
        typeof postScore !== 'number') {
      return reply.status(400).send({
        error: 'Invalid score values',
        code: 'VALIDATION_ERROR',
      })
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
    } catch {
      // Non-critical
    }

    return reply.send({
      success: true,
      improvement: postScore - preScore,
    })
  })
}
