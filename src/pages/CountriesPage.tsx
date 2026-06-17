import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCountries } from '../features/countries/useCountries'
import { CountriesGrid } from '../features/countries/CountriesGrid'
import { FeedbackState } from '../components/FeedbackState'
import { classifyApiError } from '../utils/feedbackUtils'

export function CountriesPage() {
  const { t } = useTranslation()
  const { data, isLoading, isError, error, refetch } = useCountries()
  const errorVariant = isError ? classifyApiError(error) : undefined

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

      {isLoading && (
        <p className="text-gray-500 dark:text-gray-400">{t('countries.loading')}</p>
      )}

      {isError && errorVariant && (
        <FeedbackState
          variant={errorVariant}
          title={
            errorVariant === 'network-error'
              ? t('country.error.service_title')
              : t('country.error.generic_title')
          }
          description={
            errorVariant === 'network-error'
              ? t('country.error.service_desc')
              : t('country.error.generic_desc')
          }
          actions={
            <>
              <button
                onClick={() => refetch()}
                className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
              >
                {t('country.actions.retry')}
              </button>
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

      {data && <CountriesGrid countries={data} />}
    </div>
  )
}
