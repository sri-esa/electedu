import { loadElectionData, loadFAQData, loadTimelineData, loadMythRegistry } from '../data/loader';

describe('DataLoader', () => {
  describe('loadElectionData', () => {
    it('should load india_2024 data successfully', async () => {
      const data = await loadElectionData('india')
      expect(data).toBeDefined()
      expect((data as { election?: unknown }).election).toBeDefined()
    })

    it('should throw DataLoadError for unknown country', async () => {
      await expect(loadElectionData('unknown_country')).rejects.toThrow('Failed to load election data for unknown_country')
    })
  })

  describe('loadFAQData', () => {
    it('should load india FAQ with items', async () => {
      const faq = await loadFAQData('india')
      const faqData = faq as { faqs?: unknown[] }
      expect(Array.isArray(faqData.faqs)).toBe(true)
      expect(faqData.faqs!.length).toBeGreaterThan(0)
    })

    it('should throw DataLoadError for unknown country', async () => {
      await expect(loadFAQData('unknown')).rejects.toThrow('Failed to load FAQ data for unknown')
    })
  })

  describe('loadTimelineData', () => {
    it('should load india 2024 timeline nodes', async () => {
      const timeline = await loadTimelineData('india', '2024')
      const timelineData = timeline as { nodes?: unknown[] }
      expect(Array.isArray(timelineData.nodes)).toBe(true)
      expect(timelineData.nodes!.length).toBeGreaterThan(0)
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
