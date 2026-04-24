import * as fs from 'fs/promises'
import * as path from 'path'

export async function loadElectionData(country: string): Promise<Record<string, unknown>> {
  try {
    const filePath = path.join(__dirname, '../../data/elections', `${country}_2024.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn(`Failed to load election data for ${country}`, error)
    return {}
  }
}

export async function loadMythRegistry(country: string): Promise<Record<string, unknown>[]> {
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
