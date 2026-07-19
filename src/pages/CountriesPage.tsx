import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCountries } from '../features/countries/useCountries'
import { CountriesGrid } from '../features/countries/CountriesGrid'
import { FeedbackState } from '../components/FeedbackState'
import { classifyApiError, getFeedbackCopy } from '../utils/feedbackUtils'

export function CountriesPage() {
  const { t } = useTranslation()
  const { data, isLoading, isError, error, refetch } = useCountries()
  const errorVariant = isError ? classifyApiError(error) : undefined
  const errorCopy = errorVariant ? getFeedbackCopy(errorVariant, t) : undefined
  const [search, setSearch] = useState('')

  const filteredCountries = data?.filter((country) => {
    const query = search.trim().toLowerCase()
    if (!query) return true
    return (
      country.code.toLowerCase().includes(query) ||
      (country.name?.toLowerCase().includes(query) ?? false)
    )
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('countries.title')}
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {t('countries.description')}
        </p>
      </div>

      {data && (
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('countries.search_placeholder')}
            className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-sky-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
      )}

      {isLoading && (
        <p className="text-gray-500 dark:text-gray-400">{t('countries.loading')}</p>
      )}

      {isError && errorVariant && errorCopy && (
        <FeedbackState
          variant={errorVariant}
          title={errorCopy.title}
          description={errorCopy.description}
          actions={
            <>
              {errorVariant !== 'not-found' && (
                <button
                  onClick={() => refetch()}
                  className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
                >
                  {t('country.actions.retry')}
                </button>
              )}
              <Link
                to="/"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t('country.actions.return_home')}
              </Link>
            </>
          }
        />
      )}

      {filteredCountries && filteredCountries.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          {t('countries.no_results', { query: search })}
        </p>
      )}

      {filteredCountries && filteredCountries.length > 0 && (
        <CountriesGrid countries={filteredCountries} />
      )}
    </div>
  )
}
