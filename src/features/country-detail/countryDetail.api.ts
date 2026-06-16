import { apiClient } from '../../services/api'
import type { ClimateRecord, CountryLatest, CountryTrend } from './countryDetail.types'

export async function getCountryLatest(country: string): Promise<CountryLatest> {
  const { data } = await apiClient.get<unknown>(
    `/countries/${country}/climate-data/latest`,
  )
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response from climate-data/latest')
  }
  return data as CountryLatest
}

export async function getCountryHistory(country: string): Promise<ClimateRecord[]> {
  const { data } = await apiClient.get<unknown>(`/countries/${country}/climate-data`)
  if (!Array.isArray(data)) {
    throw new Error('Invalid response from climate-data')
  }
  return data as ClimateRecord[]
}

export async function getCountryTrend(country: string): Promise<CountryTrend | null> {
  const { data } = await apiClient.get<unknown>(
    `/countries/${country}/climate-data/trend`,
  )
  if (data === null) return null
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response from climate-data/trend')
  }
  return data as CountryTrend
}
