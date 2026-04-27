/**
 * ElectEdu Backend — Fastify API Server
 * Google Services: Cloud Run, Gemini API, Firestore, Pub/Sub
 * Implements: REQ-01 (chat), REQ-10 (health/faq)
 */
import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import { chatRoutes } from './routes/chat.routes'
import { dataRoutes } from './routes/data.routes'
import { sessionRoutes } from './routes/session.routes'
import { quizRoutes } from './routes/quiz.routes'
import { healthRoutes } from './routes/health.routes'
import { securityMiddleware } from './middleware/security'
import { validateEnvironment } from './middleware/validate'

// Fail fast if env vars missing
validateEnvironment([
  'GEMINI_API_KEY',
  'PROJECT_ID',
])

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
          hostname: request.hostname,
        }
      }
    }
  }
})

async function bootstrap(): Promise<void> {
  // Security headers
  await securityMiddleware(fastify)

  // CORS
  await fastify.register(cors, {
    origin: true, // Allow all origins for demo
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  // Rate limiting
  await fastify.register(rateLimit, {
    max: 60,
    timeWindow: '1 minute',
    errorResponseBuilder: () => ({
      error: 'Too many requests',
      code: 'RATE_LIMITED',
      retryAfter: 60,
    })
  })

  // Routes
  await fastify.register(healthRoutes, { prefix: '' })
  await fastify.register(chatRoutes, { prefix: '/api' })
  await fastify.register(dataRoutes, { prefix: '/api' })
  await fastify.register(sessionRoutes, { prefix: '/api' })
  await fastify.register(quizRoutes, { prefix: '/api' })

  const PORT = parseInt(process.env.PORT ?? '8080')
  await fastify.listen({ port: PORT, host: '0.0.0.0' })
  fastify.log.info(`ElectEdu backend running on port ${PORT}`)
}

bootstrap().catch((err) => {
  console.error(JSON.stringify({
    level: 'error',
    message: 'Fatal startup error',
    error: err.message,
    timestamp: new Date().toISOString(),
  }))
  process.exit(1)
})
