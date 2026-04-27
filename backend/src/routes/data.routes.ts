import { FastifyInstance, FastifyRequest } from 'fastify'
import { loadTimelineData, loadFAQData } from '../data/loader'
import { createLogger } from '../logger'
import { HTTP_STATUS } from '../constants'
import { ElectEduError } from '../errors'

const logger = createLogger('data-routes')

interface TimelineParams {
  country: string
  year: string
}

interface FAQParams {
  country: string
}

/**
 * @description Registers data routes serving static knowledge base JSON files
 * @param {FastifyInstance} fastify - Fastify server instance
 * @returns {Promise<void>}
 * @throws {Error} Never throws
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
        reply.header('Cache-Control', 'public, max-age=86400')
        return reply.status(HTTP_STATUS.OK).send(timelineData)
      } catch (err: unknown) {
        logger.error('timeline', `Error loading timeline data`, { country, year }, err)
        const code = err instanceof ElectEduError ? err.code : 'INTERNAL_ERROR'
        const statusCode = err instanceof ElectEduError ? err.statusCode : HTTP_STATUS.INTERNAL_ERROR
        return reply.status(statusCode).send({ 
          error: 'Internal server error',
          code 
        })
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
        reply.header('Cache-Control', 'public, max-age=3600')
        return reply.status(HTTP_STATUS.OK).send(faqData)
      } catch (err: unknown) {
        logger.error('faq', `Error loading FAQ data`, { country }, err)
        const code = err instanceof ElectEduError ? err.code : 'INTERNAL_ERROR'
        const statusCode = err instanceof ElectEduError ? err.statusCode : HTTP_STATUS.INTERNAL_ERROR
        return reply.status(statusCode).send({ 
          error: 'Internal server error',
          code 
        })
      }
    }
  )
}
