import { useCountries } from '../features/countries/useCountries'
import { CountriesGrid } from '../features/countries/CountriesGrid'

export function CountriesPage() {
  const { data, isLoading, isError, error } = useCountries()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Countries
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Explore climate and economic data across the world.
        </p>
      </div>

      {isLoading && (
        <p className="text-gray-500 dark:text-gray-400">Loading countries…</p>
      )}

      {isError && (
        <p className="text-red-600 dark:text-red-400">{error.message}</p>
      )}

      {data && <CountriesGrid countries={data} />}
    </div>
  )
}
