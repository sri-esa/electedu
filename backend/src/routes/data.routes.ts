import { FastifyInstance, FastifyRequest } from 'fastify'
import { loadTimelineData, loadFAQData } from '../data/loader'

interface TimelineParams {
  country: string
  year: string
}

interface FAQParams {
  country: string
}

/**
 * Data Routes — Serves static knowledge base JSON files
 */
export async function dataRoutes(fastify: FastifyInstance): Promise<void> {
  
  /**
   * GET /timeline/:country/:year
   * Returns election timeline nodes for the visual timeline component.
   */
  fastify.get<{ Params: TimelineParams }>(
    '/timeline/:country/:year',
    async (request, reply) => {
      const { country, year } = request.params
      try {
        const timelineData = await loadTimelineData(country, year)
        return reply.send(timelineData)
      } catch (error) {
        fastify.log.error(`Error loading timeline data: ${error}`)
        return reply.status(500).send({ error: 'Failed to load timeline data' })
      }
    }
  )

  /**
   * GET /faq/:country
   * Returns curated FAQ items for offline fallback state.
   */
  fastify.get<{ Params: FAQParams }>(
    '/faq/:country',
    async (request, reply) => {
      const { country } = request.params
      try {
        const faqData = await loadFAQData(country)
        return reply.send(faqData)
      } catch (error) {
        fastify.log.error(`Error loading FAQ data: ${error}`)
        return reply.status(500).send({ error: 'Failed to load FAQ data' })
      }
    }
  )
}
