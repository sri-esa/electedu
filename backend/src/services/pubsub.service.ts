/**
 * Pub/Sub Service — Async event logging
 * Google Service: Cloud Pub/Sub
 * Non-blocking: never delays chat responses
 */
import { PubSub } from '@google-cloud/pubsub'

let _pubsub: PubSub | null = null
const TOPIC_NAME = 'electedu-usage-events'

interface UsageEvent {
  eventType: string
  sessionId: string
  country: string
  plainLanguageMode: boolean
  timestamp: string
  [key: string]: unknown
}

/**
 * @description Logs usage event to Pub/Sub asynchronously
 * @param {UsageEvent} event - Usage event data (no PII)
 * @returns {Promise<void>} void — never throws, never blocks
 * @throws {Error} Never throws, safely catches all errors
 */
export async function logEvent(event: UsageEvent): Promise<void> {
  if (process.env.ENABLE_PUBSUB !== 'true') return

  try {
    if (!_pubsub) {
      _pubsub = new PubSub({ projectId: process.env.PROJECT_ID })
    }
    const data = Buffer.from(JSON.stringify(event))
    await _pubsub.topic(TOPIC_NAME).publish(data)
  } catch {
    // Pub/Sub failure must never affect user experience
  }
}
