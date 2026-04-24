/**
 * ElectEdu — Shared TypeScript Interfaces
 */

export type Country = 'india' | 'usa' | 'uk' | 'eu'
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn'
export type AppState = 
  | 'ONBOARDING'
  | 'GUIDED_FLOW'
  | 'FREE_QUESTION'
  | 'TIMELINE_EXPLORATION'
  | 'QUIZ_IN_PROGRESS'
  | 'QUIZ_COMPLETE'
  | 'OFFLINE_FALLBACK'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  chips?: string[]
  citations?: string[]
  timestamp: number
  isLoading?: boolean
}

export interface GuidedFlowStep {
  stepNumber: number
  title: string
  content: string
  actionLabel: string
  isComplete: boolean
}

export interface TimelineNode {
  id: string
  label: string
  date: string
  description: string
  expandedContent: string
  icon: string
  color: string
  position: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}
