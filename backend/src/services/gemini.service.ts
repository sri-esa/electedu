/**
 * Gemini Service — Google Gemini 1.5 Flash integration
 * Google Service: Gemini API (Vertex AI)
 * ADR-001: Flash selected for latency + cost efficiency
 */
import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildSystemPrompt, PromptContext } from './prompt.service'
import { createHash } from 'crypto'
import { CACHE_CONFIG } from '../constants'
import { createLogger } from '../logger'
import { GeminiError } from '../errors'

const logger = createLogger('gemini-service')

const responseCache = new Map<string, {
  response: ChatResponse
  cachedAt: number
}>()

export let cacheHits = 0
export let totalRequests = 0

function buildCacheKey(
  message: string,
  country: string,
  plainLanguageMode: boolean
): string {
  return createHash('md5')
    .update(`${message.toLowerCase().trim()}:${country}:${plainLanguageMode}`)
    .digest('hex')
}

/**
 * @description Retrieves the current size of the response cache
 * @returns {number} The number of items in the cache
 */
export function getCacheSize(): number {
  return responseCache.size
}

setInterval(() => {
  const now = Date.now()
  for (const [key, value] of responseCache.entries()) {
    if (now - value.cachedAt > CACHE_CONFIG.GEMINI_TTL_MS) {
      responseCache.delete(key)
    }
  }
}, CACHE_CONFIG.CLEANUP_INTERVAL_MS)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  text: string
  chips: string[]
  citations: string[]
  error?: string
}

/**
 * @description Sends a message to Gemini with full 4-layer prompt
 * @param {string} message - User's message text
 * @param {ChatMessage[]} history - Previous conversation messages
 * @param {PromptContext} context - User session context for prompt construction
 * @returns {Promise<ChatResponse>} Formatted response with chips and citations
 * @throws {GeminiError} when the Gemini API request fails
 */
export async function chat(
  message: string,
  history: ChatMessage[],
  context: PromptContext
): Promise<ChatResponse> {
  totalRequests++
  const cacheKey = buildCacheKey(message, context.country, context.plainLanguageMode ?? false)
  const cached = responseCache.get(cacheKey)
  
  if (cached && Date.now() - cached.cachedAt < CACHE_CONFIG.GEMINI_TTL_MS) {
    cacheHits++
    return cached.response
  }

  try {
    const rawText = await callGeminiAPI(message, history, context)
    const response = parseGeminiResponse(rawText)
    responseCache.set(cacheKey, { response, cachedAt: Date.now() })
    return response
  } catch (error) {
    logger.error('chat', 'Gemini API failed', { country: context.country }, error)
    throw new GeminiError('Failed to generate response from Gemini', { originalError: error instanceof Error ? error.message : 'Unknown' })
  }
}

/**
 * @description Internal helper to execute the Gemini API request
 * @param {string} message - User's message text
 * @param {ChatMessage[]} history - Previous conversation messages
 * @param {PromptContext} context - User session context
 * @returns {Promise<string>} The raw text response from Gemini
 */
async function callGeminiAPI(message: string, history: ChatMessage[], context: PromptContext): Promise<string> {
  const systemPrompt = await buildSystemPrompt(context)
    
  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    systemInstruction: systemPrompt,
    generationConfig: {
      maxOutputTokens: 600,
      temperature: 0.3, // Low temp for factual accuracy
      topP: 0.8,
    },
  })

  const geminiHistory = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const chatSession = model.startChat({ history: geminiHistory })
  const result = await chatSession.sendMessage(message)
  return result.response.text()
}

/**
 * @description Parses Gemini response to extract chips and citations
 * @param {string} rawText - Raw text from Gemini API
 * @returns {ChatResponse} Structured response object containing text, chips, and citations
 * @throws {Error} Never throws directly, returns empty arrays if parsing fails
 */
export function parseGeminiResponse(rawText: string): ChatResponse {
  // Extract CHIPS: ["Q1?", "Q2?", "Q3?"] pattern
  const chipsMatch = rawText.match(/CHIPS:\s*\[([^\]]+)\]/)
  const chips: string[] = []
  
  if (chipsMatch?.[1]) {
    const chipContent = chipsMatch[1]
    const matches = chipContent.match(/"([^"]+)"/g)
    if (matches) {
      chips.push(...matches.map(m => m.replace(/"/g, '')))
    }
  }

  // Extract citations [Source: ...] pattern
  const citationMatches = rawText.match(/\[Source: ([^\]]+)\]/g) ?? []
  const citations = citationMatches.map(c => 
    c.replace('[Source: ', '').replace(']', '')
  )

  // Clean text: remove CHIPS line from display
  const cleanText = rawText
    .replace(/CHIPS:\s*\[[^\]]+\]/, '')
    .trim()

  return {
    text: cleanText,
    chips: chips.slice(0, 3), // Max 3 chips
    citations,
  }
}
