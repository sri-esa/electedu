/**
 * Gemini Service — Google Gemini 1.5 Flash integration
 * Google Service: Gemini API (Vertex AI)
 * ADR-001: Flash selected for latency + cost efficiency
 */
import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildSystemPrompt, PromptContext } from './prompt.service'

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
 * @param message - User's message text
 * @param history - Previous conversation messages
 * @param context - User session context for prompt construction
 * @returns Formatted response with chips and citations
 * @throws VenueSystemError on API failure
 */
export async function chat(
  message: string,
  history: ChatMessage[],
  context: PromptContext
): Promise<ChatResponse> {
  try {
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

    const chatSession = model.startChat({
      history: geminiHistory,
    })

    const result = await chatSession.sendMessage(message)
    const rawText = result.response.text()

    return parseGeminiResponse(rawText)
  } catch (error) {
    console.error(JSON.stringify({
      level: 'error',
      service: 'gemini',
      operation: 'chat',
      error: error instanceof Error ? error.message : 'Unknown',
      timestamp: new Date().toISOString(),
    }))
    throw error
  }
}

/**
 * @description Parses Gemini response to extract chips and citations
 * @param rawText - Raw text from Gemini API
 * @returns Structured response object
 */
function parseGeminiResponse(rawText: string): ChatResponse {
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
