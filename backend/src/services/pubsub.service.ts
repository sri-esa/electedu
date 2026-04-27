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
 * @description Publishes usage event to Cloud Pub/Sub topic
 * @googleService Google Cloud Pub/Sub
 * @freeTier Counts against 10GB/month message quota
 */
export async function logEvent(event: UsageEvent): Promise<void> {
  try {
    if (!_pubsub) {
      _pubsub = new PubSub({ projectId: process.env.PROJECT_ID })
    }
    const data = Buffer.from(JSON.stringify(event))
    await _pubsub.topic(TOPIC_NAME).publishMessage({ data })
  } catch {
    // Non-critical: Pub/Sub failure never affects user experience
  }
}
