import { sanitizeString, isValidCountry, validateEnvironment } from '../middleware/validate';

describe('InputValidation', () => {
  describe('sanitizeString', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeString('<script>alert(1)</script>')).not.toContain('<')
      expect(sanitizeString('<script>alert(1)</script>')).not.toContain('>')
    })
    it('should truncate to maxLength', () => {
      const long = 'a'.repeat(2000)
      expect(sanitizeString(long, 500).length).toBe(500)
    })
    it('should return empty string for non-string input', () => {
      expect(sanitizeString(null as any)).toBe('')
      expect(sanitizeString(undefined as any)).toBe('')
      expect(sanitizeString(123 as any)).toBe('')
    })
    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello')
    })
  })

  describe('isValidCountry', () => {
    it('should accept valid countries', () => {
      expect(isValidCountry('india')).toBe(true)
      expect(isValidCountry('usa')).toBe(true)
      expect(isValidCountry('uk')).toBe(true)
      expect(isValidCountry('eu')).toBe(true)
    })
    it('should reject invalid countries', () => {
      expect(isValidCountry('china')).toBe(false)
      expect(isValidCountry('')).toBe(false)
      expect(isValidCountry(null as any)).toBe(false)
      expect(isValidCountry('INDIA')).toBe(true) // case insensitive
    })
  })

  describe('validateEnvironment', () => {
    it('should not throw when all required vars are set', () => {
      process.env.TEST_VAR = 'value'
      expect(() => validateEnvironment(['TEST_VAR'])).not.toThrow()
      delete process.env.TEST_VAR
    })
    it('should call process.exit(1) when vars are missing', () => {
      const mockExit = jest.spyOn(process, 'exit')
        .mockImplementation(() => { throw new Error('process.exit called') })
      expect(() => validateEnvironment(['NONEXISTENT_VAR_12345']))
        .toThrow('process.exit called')
      mockExit.mockRestore()
    })
  })
})
