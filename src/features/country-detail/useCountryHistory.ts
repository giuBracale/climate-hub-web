import { useQuery } from '@tanstack/react-query'
import { getCountryHistory } from './countryDetail.api'

export function useCountryHistory(country: string | undefined) {
  return useQuery({
    queryKey: ['country-history', country],
    queryFn: () => getCountryHistory(country!),
    enabled: !!country,
  })
}
