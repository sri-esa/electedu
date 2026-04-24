/**
 * Security Middleware
 * SECURITY: Applies headers to all responses
 */
import { FastifyInstance } from 'fastify'

export async function securityMiddleware(
  fastify: FastifyInstance
): Promise<void> {
  fastify.addHook('onSend', async (request, reply) => {
    // SECURITY: Prevent MIME sniffing
    reply.header('X-Content-Type-Options', 'nosniff')
    // SECURITY: Prevent clickjacking
    reply.header('X-Frame-Options', 'DENY')
    // SECURITY: XSS protection
    reply.header('X-XSS-Protection', '1; mode=block')
    // SECURITY: Force HTTPS
    reply.header(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )
    // SECURITY: Restrict referrer
    reply.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    // SECURITY: Permissions policy
    reply.header(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()'
    )
  })
}
