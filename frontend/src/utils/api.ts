/**
 * API Utility — Backend communication
 * Implements: REQ-10 (error handling for offline fallback)
 */
import type { Message, Country, Language } from '../types'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080'

export interface ChatRequest {
  message: string
  history: Message[]
  context: {
    country: Country
    language: Language
    plainLanguageMode: boolean
    guidedFlowStep?: number
    guidedFlowType?: string
  }
  sessionId: string
}

export interface ChatApiResponse {
  text: string
  chips: string[]
  citations: string[]
}

/**
 * @description Sends chat message to ElectEdu backend
 * @param {ChatRequest} request - Chat request with message and context
 * @returns {Promise<ChatApiResponse>} AI response with chips and citations
 * @throws {Error} triggers OFFLINE_FALLBACK state (REQ-10) when timeout or failure occurs
 */
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatApiResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out — switching to offline mode')
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * @description Fetches FAQ data for offline fallback (REQ-10)
 * @param {Country} country - Country code for FAQ selection
 * @returns {Promise<unknown>} Array of FAQ items
 * @throws {Error} On network failure
 */
export async function fetchFAQ(country: Country) {
  const response = await fetch(`${BACKEND_URL}/api/faq/${country}`)
  return response.json()
}

/**
 * @description Fetches election timeline data
 * @param {Country} country - Country code
 * @param {number} year - Election year
 * @returns {Promise<unknown>} Timeline nodes array
 * @throws {Error} On network failure
 */
export async function fetchTimeline(country: Country, year: number) {
  const response = await fetch(
    `${BACKEND_URL}/api/timeline/${country}/${year}`
  )
  return response.json()
}
