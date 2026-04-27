/**
 * Chat Routes — POST /api/chat
 * Implements: REQ-01 (Gemini conversation), REQ-02 (accuracy)
 */
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { chat, ChatMessage } from '../services/gemini.service'
import { PromptContext } from '../services/prompt.service'
import { logEvent } from '../services/pubsub.service'
import { sanitizeString, isValidCountry } from '../middleware/validate'
import { HTTP_STATUS, VALIDATION } from '../constants'
import { ValidationError, ElectEduError } from '../errors'
import { createLogger } from '../logger'

const logger = createLogger('chat-routes')

interface ChatBody {
  message: string
  history: ChatMessage[]
  context: PromptContext
  sessionId: string
}

/**
 * @description Registers chat route on Fastify instance
 * @param {FastifyInstance} fastify - Fastify server instance
 * @returns {Promise<void>}
 * @throws {Error} Never throws
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
            message: { type: 'string', maxLength: VALIDATION.MAX_MESSAGE_LENGTH },
            history: { type: 'array', maxItems: VALIDATION.MAX_HISTORY_ITEMS },
            context: { type: 'object' },
            sessionId: { type: 'string' },
          }
        }
      }
    },
    handleChatRequest
  )
}

/**
 * @description Handles the incoming chat request, validates it, and routes to Gemini
 * @param {FastifyRequest<{ Body: ChatBody }>} request - The fastify request
 * @param {FastifyReply} reply - The fastify reply
 * @returns {Promise<FastifyReply>} The resolved reply
 */
async function handleChatRequest(
  request: FastifyRequest<{ Body: ChatBody }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    const { message, history = [], context, sessionId } = request.body

    const sanitizedMessage = sanitizeString(message, VALIDATION.MAX_MESSAGE_LENGTH)
    if (!sanitizedMessage) {
      throw new ValidationError('Message cannot be empty')
    }

    const countryMap: Record<string, string> = { 'in': 'india', 'us': 'usa', 'uk': 'uk', 'eu': 'eu' }
    const lowerCountry = context?.country?.toLowerCase() ?? ''
    const normalizedCountry = countryMap[lowerCountry] || lowerCountry

    if (!isValidCountry(normalizedCountry)) {
      throw new ValidationError('Invalid country selection')
    }

    context.country = normalizedCountry as typeof VALIDATION.VALID_COUNTRIES[number]
    const response = await chat(sanitizedMessage, history, context)

    logEvent({
      eventType: 'chat_message',
      sessionId: sessionId ?? 'anonymous',
      country: context.country,
      plainLanguageMode: context.plainLanguageMode,
      timestamp: new Date().toISOString(),
    }).catch(() => {})

    return reply.status(HTTP_STATUS.OK).send(response)
  } catch (err: unknown) {
    logger.error('chat', 'Chat request failed', {}, err)
    const code = err instanceof ElectEduError ? err.code : 'INTERNAL_ERROR'
    const statusCode = err instanceof ElectEduError ? err.statusCode : HTTP_STATUS.INTERNAL_ERROR
    
    return reply.status(statusCode).send({
      error: 'Internal server error',
      code,
    })
  }
}
