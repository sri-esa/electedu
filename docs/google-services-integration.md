# Google Services Integration

ElectEdu leverages several Google Cloud services for various functionalities.

## Cloud Firestore Native Mode
- **Status:** Active
- **Usage:** Stores anonymous session data and quiz results for analytics.
- **Example:**
```typescript
await db.collection('sessions').doc(sessionId).set({
  sessionId,
  country,
  startedAt: new Date().toISOString(),
  platform: 'web',
})
```

## Google Cloud Pub/Sub
- **Status:** Active
- **Usage:** Publishes usage events asynchronously.
- **Example:**
```typescript
await _pubsub.topic('electedu-usage-events').publishMessage({ data })
```

## Google Gemini API (Vertex AI)
- **Status:** Active
- **Usage:** Powers the conversational assistant (Gemini 1.5 Flash).

## Google Cloud BigQuery
- **Status:** Active
- **Usage:** Analytics service for tracking usage events and querying aggregated session data.
- **Example:**
```typescript
await bigquery
  .dataset('electedu_analytics')
  .table('usage_events')
  .insert([{ ...event, inserted_at: new Date().toISOString() }])
```

## Google Cloud Text-to-Speech API
- **Status:** Active
- **Usage:** Accessibility feature providing audio output for low-literacy users.
- **Example:**
```typescript
const [response] = await client.synthesizeSpeech({
  input: { text: text.slice(0, 5000) },
  voice: { languageCode, ssmlGender: 'NEUTRAL' },
  audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9 },
})
```
