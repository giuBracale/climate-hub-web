import { apiClient } from '../../services/api'
import type { Country } from './countries.types'

export async function getCountries(): Promise<Country[]> {
  const { data } = await apiClient.get<unknown>('/countries')
  if (!Array.isArray(data)) {
    throw new Error('Invalid countries response: expected an array')
  }
  return data as Country[]
}
