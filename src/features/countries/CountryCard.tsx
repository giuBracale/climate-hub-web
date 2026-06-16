import { Link } from 'react-router-dom'
import type { Country } from './countries.types'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      to={`/countries/${country.code}`}
      className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:shadow-gray-800"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {country.code}
      </span>
      <span className="text-base font-medium text-gray-900 dark:text-white">
        {country.name ?? country.code}
      </span>
    </Link>
  )
}
