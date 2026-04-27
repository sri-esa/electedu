import { logEvent } from '../services/pubsub.service'

describe('PubSub Service', () => {
    it('does nothing when ENABLE_PUBSUB is false', async () => {
        process.env.ENABLE_PUBSUB = 'false'
        await expect(logEvent({
            eventType: 'test',
            sessionId: 'test-123',
            country: 'india',
            plainLanguageMode: false,
            timestamp: new Date().toISOString()
        })).resolves.not.toThrow()
    })

    it('handles errors gracefully without throwing', async () => {
        process.env.ENABLE_PUBSUB = 'true'
        process.env.PROJECT_ID = 'test-project'
        await expect(logEvent({
            eventType: 'test',
            sessionId: 'test-123',
            country: 'india',
            plainLanguageMode: false,
            timestamp: new Date().toISOString()
        })).resolves.not.toThrow()
    })
})