import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Country } from './countries.types'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/countries/${country.code}`}
      className="group flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-sky-700"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-sky-500 dark:text-sky-400">
        {country.code}
      </span>
      <span className="text-sm font-semibold text-gray-800 dark:text-white">
        {country.name ?? country.code}
      </span>
      <span className="mt-1 text-xs font-medium text-sky-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-sky-400">
        {t('countries.view_trends')}
      </span>
    </Link>
  )
}
