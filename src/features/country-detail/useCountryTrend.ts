import { useQuery } from '@tanstack/react-query'
import { getCountryTrend } from './countryDetail.api'

export function useCountryTrend(country: string | undefined) {
  return useQuery({
    queryKey: ['country-trend', country],
    queryFn: () => getCountryTrend(country!),
    enabled: !!country,
  })
}
