/**
 * @description BigQuery analytics service for ElectEdu
 * @googleService Google Cloud BigQuery
 * @freeTier 10GB storage, 1TB queries per month free
 */
import { BigQuery } from '@google-cloud/bigquery'

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID
})

const DATASET = 'electedu_analytics'
const TABLE = 'usage_events'

/**
 * @description Streams a usage event row to BigQuery
 * @param event - Usage event data (no PII)
 * @googleService Google Cloud BigQuery streaming insert
 */
export async function streamEventToBigQuery(
  event: Record<string, unknown>
): Promise<void> {
  try {
    await bigquery
      .dataset(DATASET)
      .table(TABLE)
      .insert([{
        ...event,
        inserted_at: new Date().toISOString(),
      }])
  } catch {
    // Non-critical — never block user requests
  }
}

/**
 * @description Queries aggregated session count from BigQuery
 * @returns Total session count across all events
 * @googleService Google Cloud BigQuery query
 */
export async function getAnalyticsSummary(): Promise<{
  totalSessions: number
}> {
  try {
    const query = `
      SELECT COUNT(*) as total
      FROM \`${process.env.PROJECT_ID}.${DATASET}.${TABLE}\`
      WHERE DATE(inserted_at) = CURRENT_DATE()
    `
    const [rows] = await bigquery.query(query)
    return { totalSessions: rows[0]?.total ?? 0 }
  } catch {
    return { totalSessions: 0 }
  }
}
