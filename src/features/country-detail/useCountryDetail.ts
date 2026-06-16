import { useQuery } from '@tanstack/react-query'
import { getCountryLatest } from './countryDetail.api'

export function useCountryDetail(country: string | undefined) {
  return useQuery({
    queryKey: ['country-detail', country],
    queryFn: () => getCountryLatest(country!),
    enabled: !!country,
  })
}
