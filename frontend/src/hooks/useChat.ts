/**
 * useChat Hook — Manages chat state and API calls
 * Implements: REQ-01 (Gemini), REQ-10 (offline fallback)
 */
import { useChatStore } from '../store/chat.store'
import { useSettingsStore } from '../store/settings.store'
import { sendChatMessage } from '../utils/api'
import type { Message } from '../types'

export function useChat() {
  const { messages, addMessage, setLoading, 
          setError, updateLastMessage, clearMessages } = useChatStore()
  const { country, language, plainLanguageMode,
          guidedFlowStep, guidedFlowType } = useSettingsStore()
  
  const sessionId = getOrCreateSessionId()

  async function sendMessage(text: string): Promise<void> {
    // Add user message immediately
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }
    addMessage(userMsg)

    // Add loading AI message placeholder
    const loadingMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isLoading: true,
    }
    addMessage(loadingMsg)
    setLoading(true)
    setError(null)

    try {
      const response = await sendChatMessage({
        message: text,
        history: messages.slice(-10), // Last 10 messages only
        context: {
          country,
          language,
          plainLanguageMode,
          guidedFlowStep,
          guidedFlowType: guidedFlowType ?? undefined,
        },
        sessionId,
      })

      // Replace loading message with real response
      updateLastMessage(response.text, response.chips)
      setError(null)
    } catch (error) {
      console.error("Chat error:", error)
      // Show error inline in the assistant message — do NOT lock into OFFLINE_FALLBACK
      updateLastMessage(
        "⚠️ I couldn't reach the server right now. Please try again in a moment.",
        []
      )
      setError('Connection error — tap to retry')
    } finally {
      setLoading(false)
    }
  }

  return { 
    messages, 
    sendMessage,
    clearMessages,
    isLoading: useChatStore(s => s.isLoading),
    error: useChatStore(s => s.error) 
  }
}

function getOrCreateSessionId(): string {
  const key = 'electedu-session-id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}
