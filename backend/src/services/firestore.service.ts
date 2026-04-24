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
 * @returns Initialized Firestore client
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
