import { useQuery } from '@tanstack/react-query'
import { getCountries } from './countries.api'

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  })
}
