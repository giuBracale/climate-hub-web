import type { Country } from './countries.types'
import { CountryCard } from './CountryCard'

interface CountriesGridProps {
  countries: Country[]
}

export function CountriesGrid({ countries }: CountriesGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </div>
  )
}
