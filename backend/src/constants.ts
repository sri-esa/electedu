export const CACHE_CONFIG = {
  GEMINI_TTL_MS: 5 * 60 * 1000,
  MAX_CACHE_SIZE: 200,
  CLEANUP_INTERVAL_MS: 10 * 60 * 1000,
} as const

export const RATE_LIMITS = {
  MAX_REQUESTS_PER_MINUTE: 60,
  RETRY_AFTER_SECONDS: 60,
} as const

export const VALIDATION = {
  MAX_MESSAGE_LENGTH: 1000,
  MAX_HISTORY_ITEMS: 20,
  VALID_COUNTRIES: ['india', 'usa', 'uk', 'eu'] as const,
} as const

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
} as const

export const ELECTION_DATA = {
  DEFAULT_COUNTRY: 'india',
  DEFAULT_YEAR: 2024,
  SUPPORTED_YEARS: [2024] as const,
} as const
