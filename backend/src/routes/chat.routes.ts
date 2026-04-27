/**
 * Chat Routes — POST /api/chat
 * Implements: REQ-01 (Gemini conversation), REQ-02 (accuracy)
 */
import { FastifyInstance, FastifyRequest } from 'fastify'
import { chat, ChatMessage } from '../services/gemini.service'
import { PromptContext } from '../services/prompt.service'
import { logEvent } from '../services/pubsub.service'
import { sanitizeString, isValidCountry } from '../middleware/validate'

interface ChatBody {
  message: string
  history: ChatMessage[]
  context: PromptContext
  sessionId: string
}

/**
 * @description Registers chat route on Fastify instance
 * @param fastify - Fastify server instance
 */
export async function chatRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.post<{ Body: ChatBody }>(
    '/chat',
    {
      schema: {
        body: {
          type: 'object',
          required: ['message', 'context'],
          properties: {
            message: { type: 'string', maxLength: 1000 },
            history: { type: 'array', maxItems: 20 },
            context: { type: 'object' },
            sessionId: { type: 'string' },
          }
        }
      }
    },
    async (request, reply) => {
      const { message, history = [], context, sessionId } = request.body

      // Sanitize input
      const sanitizedMessage = sanitizeString(message, 1000)
      if (!sanitizedMessage) {
        return reply.status(400).send({
          error: 'Message cannot be empty',
          code: 'VALIDATION_ERROR',
        })
      }

      // Normalize country to match VALID_COUNTRIES for internal logic
      const countryMap: Record<string, string> = { 'in': 'india', 'us': 'usa', 'uk': 'uk', 'eu': 'eu' }
      const normalizedCountry = countryMap[context?.country?.toLowerCase() ?? ''] || context?.country?.toLowerCase()
      context.country = normalizedCountry as any // TypeScript bypass since we validate right below

      // Validate country
      if (!isValidCountry(normalizedCountry)) {
        return reply.status(400).send({
          error: 'Invalid country selection',
          code: 'VALIDATION_ERROR',
        })
      }

      // Call Gemini
      const response = await chat(sanitizedMessage, history, context)

      // Log event async (non-blocking)
      logEvent({
        eventType: 'chat_message',
        sessionId: sessionId ?? 'anonymous',
        country: context.country,
        plainLanguageMode: context.plainLanguageMode,
        timestamp: new Date().toISOString(),
      }).catch(() => {}) // Never block on logging failure

      return reply.send(response)
    }
  )
}
