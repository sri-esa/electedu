/**
 * Chat Store — Manages conversation history
 * NOT persisted to localStorage (privacy — REQ-06)
 */
import { create } from 'zustand'
import type { Message } from '../types'

interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  
  addMessage: (message: Message) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearMessages: () => void
  updateLastMessage: (content: string, chips?: string[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearMessages: () => set({ messages: [] }),

  updateLastMessage: (content, chips) =>
    set((s) => {
      const messages = [...s.messages]
      const last = messages[messages.length - 1]
      if (last && last.role === 'assistant') {
        messages[messages.length - 1] = {
          ...last,
          content,
          chips,
          isLoading: false,
        }
      }
      return { messages }
    }),
}))
