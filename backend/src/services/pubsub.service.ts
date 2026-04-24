export interface AnalyticsEvent {
  eventType: string
  sessionId: string
  country: string
  plainLanguageMode: boolean
  timestamp: string
}

export async function logEvent(event: AnalyticsEvent): Promise<void> {
  // In a real scenario, this would send to Google Cloud Pub/Sub
  if (process.env.ENABLE_PUBSUB === 'true') {
    console.log('[PubSub] Event logged:', event)
  }
}
