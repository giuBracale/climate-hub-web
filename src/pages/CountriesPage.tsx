import { Link } from 'react-router-dom'
import { useCountries } from '../features/countries/useCountries'
import { CountriesGrid } from '../features/countries/CountriesGrid'
import { FeedbackState, classifyApiError } from '../components/FeedbackState'

export function CountriesPage() {
  const { data, isLoading, isError, error, refetch } = useCountries()
  const errorVariant = isError ? classifyApiError(error) : undefined

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

      {isError && errorVariant && (
        <FeedbackState
          variant={errorVariant}
          title={
            errorVariant === 'network-error'
              ? 'Data service unavailable'
              : 'Something went wrong'
          }
          description={
            errorVariant === 'network-error'
              ? 'Climate Hub is currently unable to retrieve climate data. Please try again in a few moments.'
              : 'An unexpected error occurred while loading this view.'
          }
          actions={
            <>
              <button
                onClick={() => refetch()}
                className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Retry
              </button>
              <Link
                to="/"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Return Home
              </Link>
            </>
          }
        />
      )}

      {data && <CountriesGrid countries={data} />}
    </div>
  )
}
