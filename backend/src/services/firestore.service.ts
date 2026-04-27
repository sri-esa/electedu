/**
 * Firestore Service — Google Cloud Firestore client
 * Google Service: Cloud Firestore Native Mode
 * ADR-004: Used for anonymous analytics only
 * Privacy: No PII stored in any collection
 */
import { Firestore } from '@google-cloud/firestore'

let _db: Firestore | null = null

/**
 * @description Returns singleton Firestore instance
 * @returns {Firestore} Initialized Firestore client
 * @throws {Error} Never throws
 */
export function getFirestore(): Firestore {
  if (!_db) {
    _db = new Firestore({
      projectId: process.env.PROJECT_ID,
      // Cloud Run: uses Application Default Credentials
      // Local: set GOOGLE_APPLICATION_CREDENTIALS env var
    })
  }
  return _db
}

export const db = getFirestore()

/**
 * @description Writes anonymous session data to Firestore
 * @googleService Cloud Firestore Native Mode
 * @freeTier Counts against 20k writes/day limit
 */
export async function writeSession(
  sessionId: string,
  country: string
): Promise<void> {
  await db.collection('sessions').doc(sessionId).set({
    sessionId,
    country,
    startedAt: new Date().toISOString(),
    platform: 'web',
  })
}

/**
 * @description Reads session analytics from Firestore
 * @googleService Cloud Firestore Native Mode
 */
export async function getSessionCount(): Promise<number> {
  const snapshot = await db.collection('sessions').count().get()
  return snapshot.data().count
}

/**
 * @description Writes quiz result to Firestore analytics
 * @googleService Cloud Firestore Native Mode
 */
export async function writeQuizResult(data: {
  sessionId: string
  preScore: number
  postScore: number
  country: string
}): Promise<void> {
  await db.collection('quiz_results').add({
    ...data,
    improvement: data.postScore - data.preScore,
    submittedAt: new Date().toISOString(),
  })
}
