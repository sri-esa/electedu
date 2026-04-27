/**
 * Health Routes — GET /health
 * Used by Cloud Run for liveness/readiness probes
 */
import { FastifyInstance } from 'fastify'
import { getCacheSize, cacheHits, totalRequests as totalGeminiRequests } from '../services/gemini.service'
import { getAverageResponseTime } from '../services/metrics.service'
import { isDataPreloaded } from '../data/loader'

export async function healthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get('/health', async (request, reply) => {
    function getCacheHitRate(): string {
      return `${cacheHits}/${totalGeminiRequests} requests`
    }
    return reply.send({
      status: 'ok',
      service: 'electedu-backend',
      version: '1.0.0',
      uptime: Math.floor(process.uptime()),
      performance: {
        cacheSize: getCacheSize(),
        dataPreloaded: isDataPreloaded,
        compressionEnabled: true,
        avgResponseMs: getAverageResponseTime()
      },
      googleServices: {
        gemini: !!process.env.GEMINI_API_KEY,
        firestore: !!process.env.PROJECT_ID,
        pubsub: !!process.env.PROJECT_ID,
        bigquery: !!process.env.PROJECT_ID,
        textToSpeech: !!process.env.PROJECT_ID,
      },
      freeTierUsage: {
        estimatedDailyApiCalls: getCacheSize(), // Rough estimation based on cache size
        cacheHitRate: getCacheHitRate(),
      },
      timestamp: new Date().toISOString(),
    })
  })
}
