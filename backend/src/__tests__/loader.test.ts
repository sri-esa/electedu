import { loadElectionData, loadFAQData, loadTimelineData, loadMythRegistry } from '../data/loader';

describe('DataLoader', () => {
  describe('loadElectionData', () => {
    it('should load india_2024 data successfully', async () => {
      const data = await loadElectionData('india')
      expect(data).toBeDefined()
      expect((data as any).election).toBeDefined()
    })

    it('should return empty object for unknown country', async () => {
      const data = await loadElectionData('unknown_country')
      expect(data).toEqual({})
    })
  })

  describe('loadFAQData', () => {
    it('should load india FAQ with items', async () => {
      const faq = await loadFAQData('india')
      expect(Array.isArray((faq as any).faqs)).toBe(true)
      expect((faq as any).faqs.length).toBeGreaterThan(0)
    })

    it('should return empty faqs array for unknown country', async () => {
      const faq = await loadFAQData('unknown')
      expect((faq as any).faqs ?? []).toEqual([])
    })
  })

  describe('loadTimelineData', () => {
    it('should load india 2024 timeline nodes', async () => {
      const timeline = await loadTimelineData('india', '2024')
      expect(Array.isArray((timeline as any).nodes)).toBe(true)
      expect((timeline as any).nodes.length).toBeGreaterThan(0)
    })
  })

  describe('loadMythRegistry', () => {
    it('should load india myths with trigger phrases', async () => {
      const myths = await loadMythRegistry('india')
      expect(Array.isArray(myths)).toBe(true)
      myths.forEach((myth: Record<string, unknown>) => {
        expect(myth.triggerPhrases).toBeDefined()
        expect(myth.rebuttal).toBeDefined()
      })
    })
  })
})
