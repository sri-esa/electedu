import * as fs from 'fs/promises'
import * as path from 'path'

/**
 * @description Loads election configuration and schedule data
 * @param country The country code
 * @returns JSON object containing election data
 */
const dataCache: Record<string, unknown> = {}

export let isDataPreloaded = false

export async function preloadAllData(): Promise<void> {
  const countries = ['india', 'usa', 'uk', 'eu']
  
  for (const country of countries) {
    dataCache[`faq_${country}`] = await loadFAQDataFromDisk(country)
    dataCache[`myths_${country}`] = await loadMythRegistryFromDisk(country)
  }
  
  // Load timeline data
  dataCache['timeline_india_2024'] = await loadTimelineDataFromDisk('india', '2024')
  
  isDataPreloaded = true
  console.log(JSON.stringify({
    level: 'info',
    message: 'All data preloaded into memory',
    keys: Object.keys(dataCache).length,
    timestamp: new Date().toISOString()
  }))
}

async function loadElectionDataFromDisk(country: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/elections', `${country}_2024.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn(`Failed to load election data for ${country}`, error)
    return {}
  }
}

/**
 * @description Loads known myths and their authoritative rebuttals
 * @param country The country code
 * @returns Array of myth objects
 */
async function loadMythRegistryFromDisk(country: string): Promise<Record<string, unknown>[]> {
  try {
    const filePath = path.join(__dirname, '../../data/myths', `${country}_myths.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)
    return parsed.myths || []
  } catch (error) {
    console.warn(`Failed to load myth registry for ${country}`, error)
    return []
  }
}

/**
 * @description Loads timeline events for a given election year
 * @param country The country code
 * @param year The election year
 * @returns JSON object with timeline nodes
 */
async function loadTimelineDataFromDisk(country: string, year: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/timeline', `${country}_${year}_timeline.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn(`Failed to load timeline data for ${country} ${year}`, error)
    return { timelineId: `${country}_${year}_fallback`, nodes: [] }
  }
}

/**
 * @description Loads static FAQ data for offline fallback
 * @param country The country code
 * @returns JSON object with FAQs
 */
async function loadFAQDataFromDisk(country: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/faq', `${country}_faq.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn(`Failed to load FAQ data for ${country}`, error)
    return { country, faqs: [] }
  }
}

export async function loadFAQData(country: string): Promise<Record<string, unknown>> {
  return (dataCache[`faq_${country}`] as Record<string, unknown>) ?? { country, faqs: [] }
}

export async function loadTimelineData(country: string, year: string): Promise<Record<string, unknown>> {
  return (dataCache[`timeline_${country}_${year}`] as Record<string, unknown>) ?? { timelineId: `${country}_${year}_fallback`, nodes: [] }
}

export async function loadMythRegistry(country: string): Promise<Record<string, unknown>[]> {
  return (dataCache[`myths_${country}`] as Record<string, unknown>[]) ?? []
}

export async function loadElectionData(country: string): Promise<Record<string, unknown>> {
  return (dataCache[`election_${country}`] as Record<string, unknown>) ?? {}
}
