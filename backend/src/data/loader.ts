import * as fs from 'fs/promises'
import * as path from 'path'
import { createLogger } from '../logger'
import { DataLoadError } from '../errors'
import { ELECTION_DATA, VALIDATION } from '../constants'

const logger = createLogger('data-loader')

const dataCache: Record<string, unknown> = {}

export let isDataPreloaded = false

/**
 * @description Preloads all static JSON files into memory at startup
 * @returns {Promise<void>} Resolves when all data is loaded
 * @throws {DataLoadError} If any critical data file fails to load
 */
export async function preloadAllData(): Promise<void> {
  const countries = VALIDATION.VALID_COUNTRIES
  
  for (const country of countries) {
    dataCache[`faq_${country}`] = await loadFAQDataFromDisk(country)
    dataCache[`myths_${country}`] = await loadMythRegistryFromDisk(country)
  }
  
  // Load timeline data
  dataCache[`timeline_${ELECTION_DATA.DEFAULT_COUNTRY}_${ELECTION_DATA.DEFAULT_YEAR}`] = 
    await loadTimelineDataFromDisk(ELECTION_DATA.DEFAULT_COUNTRY, ELECTION_DATA.DEFAULT_YEAR.toString())
  
  isDataPreloaded = true
  logger.info('preload', 'All data preloaded into memory', { keys: Object.keys(dataCache).length })
}

async function loadElectionDataFromDisk(country: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/elections', `${country}_${ELECTION_DATA.DEFAULT_YEAR}.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    logger.error('loadElectionDataFromDisk', `Failed to load election data for ${country}`, { country }, error)
    throw new DataLoadError(`Failed to load election data for ${country}`)
  }
}

/**
 * @description Loads known myths and their authoritative rebuttals
 * @param {string} country - The country code
 * @returns {Promise<Record<string, unknown>[]>} Array of myth objects
 * @throws {DataLoadError} On file read failure
 */
async function loadMythRegistryFromDisk(country: string): Promise<Record<string, unknown>[]> {
  try {
    const filePath = path.join(__dirname, '../../data/myths', `${country}_myths.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)
    return parsed.myths || []
  } catch (error) {
    logger.error('loadMythRegistryFromDisk', `Failed to load myth registry for ${country}`, { country }, error)
    throw new DataLoadError(`Failed to load myth registry for ${country}`)
  }
}

/**
 * @description Loads timeline events for a given election year
 * @param {string} country - The country code
 * @param {string} year - The election year
 * @returns {Promise<Record<string, unknown>>} JSON object with timeline nodes
 * @throws {DataLoadError} On file read failure
 */
async function loadTimelineDataFromDisk(country: string, year: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/timeline', `${country}_${year}_timeline.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    logger.error('loadTimelineDataFromDisk', `Failed to load timeline data for ${country} ${year}`, { country, year }, error)
    throw new DataLoadError(`Failed to load timeline data for ${country} ${year}`)
  }
}

/**
 * @description Loads static FAQ data for offline fallback
 * @param {string} country - The country code
 * @returns {Promise<Record<string, unknown>>} JSON object with FAQs
 * @throws {DataLoadError} On file read failure
 */
async function loadFAQDataFromDisk(country: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/faq', `${country}_faq.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    logger.error('loadFAQDataFromDisk', `Failed to load FAQ data for ${country}`, { country }, error)
    throw new DataLoadError(`Failed to load FAQ data for ${country}`)
  }
}

/**
 * @description Interface to load FAQ data safely from cache or disk
 * @param {string} country - The country code
 * @returns {Promise<Record<string, unknown>>} The requested FAQ data
 * @throws {DataLoadError} If cache miss and disk read fails
 */
export async function loadFAQData(country: string): Promise<Record<string, unknown>> {
  if (!isDataPreloaded) return loadFAQDataFromDisk(country)
  return (dataCache[`faq_${country}`] as Record<string, unknown>) ?? { country, faqs: [] }
}

/**
 * @description Interface to load timeline data safely from cache or disk
 * @param {string} country - The country code
 * @param {string} year - The election year
 * @returns {Promise<Record<string, unknown>>} The requested timeline data
 * @throws {DataLoadError} If cache miss and disk read fails
 */
export async function loadTimelineData(country: string, year: string): Promise<Record<string, unknown>> {
  if (!isDataPreloaded) return loadTimelineDataFromDisk(country, year)
  return (dataCache[`timeline_${country}_${year}`] as Record<string, unknown>) ?? { timelineId: `${country}_${year}_fallback`, nodes: [] }
}

/**
 * @description Interface to load myth registry safely from cache or disk
 * @param {string} country - The country code
 * @returns {Promise<Record<string, unknown>[]>} The requested myths array
 * @throws {DataLoadError} If cache miss and disk read fails
 */
export async function loadMythRegistry(country: string): Promise<Record<string, unknown>[]> {
  if (!isDataPreloaded) return loadMythRegistryFromDisk(country)
  return (dataCache[`myths_${country}`] as Record<string, unknown>[]) ?? []
}

/**
 * @description Interface to load election data safely from cache or disk
 * @param {string} country - The country code
 * @returns {Promise<Record<string, unknown>>} The requested election data
 * @throws {DataLoadError} If cache miss and disk read fails
 */
export async function loadElectionData(country: string): Promise<Record<string, unknown>> {
  if (!isDataPreloaded) return loadElectionDataFromDisk(country)
  return (dataCache[`election_${country}`] as Record<string, unknown>) ?? {}
}
