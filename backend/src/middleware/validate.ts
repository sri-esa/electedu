/**
 * Input Validation Middleware
 * SECURITY: All user inputs sanitized before processing
 */

const VALID_COUNTRIES = ['india', 'usa', 'uk', 'eu'] as const

/**
 * @description Validates required environment variables exist
 * @param required - Array of required env var names
 * @throws Process exits with code 1 if any are missing
 */
export function validateEnvironment(required: string[]): void {
  const missing = required.filter(key => !process.env[key])
  if (missing.length > 0) {
    console.error(JSON.stringify({
      level: 'error',
      message: 'Missing required environment variables',
      missing,
      timestamp: new Date().toISOString(),
    }))
    process.exit(1)
  }
}

/**
 * @description Sanitizes string input removing dangerous characters
 * @param input - Raw input from request
 * @param maxLength - Maximum allowed character length
 * @returns Sanitized string safe for processing
 */
export function sanitizeString(
  input: unknown,
  maxLength = 500
): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"`;]/g, '')
}

/**
 * @description Validates country code is in allowed list
 * @param country - Country code to validate
 * @returns true if valid
 */
export function isValidCountry(country: unknown): boolean {
  return VALID_COUNTRIES.includes(country as typeof VALID_COUNTRIES[number])
}
