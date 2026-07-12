import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { FeedbackState } from '../components/FeedbackState'
import { classifyApiError } from '../utils/feedbackUtils'
import { useCountryHistory } from '../features/country-detail/useCountryHistory'
import { CountryHeader } from '../features/country-detail/CountryHeader'
import { MetricCard } from '../features/country-detail/MetricCard'
import { YearSelector } from '../features/country-detail/YearSelector'
import { MetricSelector } from '../features/country-detail/MetricSelector'
import { TrendChart } from '../features/country-detail/TrendChart'
import {
  calculatePercentageChange,
  findRecordByYear,
} from '../features/country-detail/countryDetail.utils'
import { toChartData } from '../features/country-detail/chart.utils'
import type { ChartMetric } from '../features/country-detail/chart.utils'
import type { MetricCardProps } from '../features/country-detail/MetricCard'
import type { Country } from '../features/countries/countries.types'

function formatGdp(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)} T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)} B`
  return `$${value.toLocaleString()}`
}

function formatPopulation(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`
  return value.toLocaleString()
}

function formatCo2(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return `${value.toFixed(2)}`
}

function formatChange(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A'
  const sign = value > 0 ? '+' : ''
  const abs = Math.abs(value)
  const formatted = abs >= 100 ? value.toFixed(0) : abs >= 10 ? value.toFixed(1) : value.toFixed(2)
  return `${sign}${formatted}%`
}

function changeSentiment(
  value: number | null | undefined,
  positiveIsGood: boolean,
): MetricCardProps['sentiment'] {
  if (value == null || value === 0) return 'neutral'
  const isPositive = value > 0
  return isPositive === positiveIsGood ? 'positive' : 'negative'
}

export function CountryOverviewPage() {
  const { country } = useParams<{ country: string }>()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  // All hooks before any early returns
  const history = useCountryHistory(country)
  const [startYear, setStartYear] = useState<number | undefined>(undefined)
  const [endYear, setEndYear] = useState<number | undefined>(undefined)
  const [metric, setMetric] = useState<ChartMetric>('gdp')

  // Read country name from cache (no extra request)
  const cachedCountries = queryClient.getQueryData<Country[]>(['countries'])
  const countryName = cachedCountries?.find(
    (c) => c.code.toLowerCase() === country?.toLowerCase(),
  )?.name

  const years = useMemo(
    () => (history.data ?? []).map((r) => r.year).sort((a, b) => b - a),
    [history.data],
  )

  // Derive effective range before early returns (fallback to 0 while data absent)
  const minYear = years.length > 0 ? years[years.length - 1] : 0
  const maxYear = years.length > 0 ? years[0] : 0
  // Default to the most recent 15 years — the full history is dominated by
  // long-run nominal growth and hides recent, more relevant variation.
  const defaultStartYear = years.length > 0 ? Math.max(minYear, maxYear - 14) : 0
  const effectiveStart = startYear ?? defaultStartYear
  const effectiveEnd = endYear ?? maxYear

  const chartData = useMemo(
    () => toChartData(history.data ?? [], metric, effectiveStart, effectiveEnd),
    [history.data, metric, effectiveStart, effectiveEnd],
  )

  // --- early returns ---

  if (!country) {
    return (
      <FeedbackState
        variant="not-found"
        title={t('country.error.unavailable_title')}
        description={t('country.error.unavailable_desc')}
        actions={
          <Link
            to="/countries"
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
          >
            {t('country.actions.view_countries')}
          </Link>
        }
      />
    )
  }

  if (history.isLoading) {
    return (
      <p className="text-gray-500 dark:text-gray-400">{t('country.loading')}</p>
    )
  }

  if (history.isError) {
    const variant = classifyApiError(history.error)
    const isNetwork = variant === 'network-error'
    const isNotFound = variant === 'not-found'
    return (
      <FeedbackState
        variant={variant}
        title={
          isNotFound
            ? t('country.error.unavailable_title')
            : isNetwork
              ? t('country.error.service_title')
              : t('country.error.generic_title')
        }
        description={
          isNotFound
            ? t('country.error.unavailable_desc')
            : isNetwork
              ? t('country.error.service_desc')
              : t('country.error.generic_desc')
        }
        actions={
          <>
            {isNetwork && (
              <button
                onClick={() => history.refetch()}
                className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
              >
                {t('country.actions.retry')}
              </button>
            )}
            <Link
              to="/countries"
              className={
                isNetwork
                  ? 'rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
                  : 'rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500'
              }
            >
              {t('country.actions.view_countries')}
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('country.actions.return_home')}
            </Link>
          </>
        }
      />
    )
  }

  const records = history.data ?? []

  if (records.length === 0) {
    return (
      <FeedbackState
        variant="empty"
        title={t('country.error.no_records_title')}
        description={t('country.error.no_records_desc')}
        actions={
          <Link
            to="/countries"
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
          >
            {t('country.actions.view_countries')}
          </Link>
        }
      />
    )
  }

  // --- render (years is non-empty here) ---

  const startYearOptions = years.filter((y) => y < effectiveEnd)
  const endYearOptions = years.filter((y) => y > effectiveStart)

  const startRecord = findRecordByYear(records, effectiveStart)
  const endRecord = findRecordByYear(records, effectiveEnd)

  const gdpChange = calculatePercentageChange(
    startRecord?.gdp ?? null,
    endRecord?.gdp ?? null,
  )
  const populationChange = calculatePercentageChange(
    startRecord?.population ?? null,
    endRecord?.population ?? null,
  )
  const co2Change = calculatePercentageChange(
    startRecord?.co2 ?? null,
    endRecord?.co2 ?? null,
  )

  const metricLabel = t(`country.metrics.${metric}`)

  return (
    <div className="space-y-8">
      <CountryHeader
        countryCode={country}
        countryName={countryName}
        datasetRange={{ first: minYear, last: maxYear }}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-gray-100 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <YearSelector
          label={t('country.controls.start_year')}
          years={startYearOptions}
          value={effectiveStart}
          onChange={setStartYear}
        />
        <YearSelector
          label={t('country.controls.end_year')}
          years={endYearOptions}
          value={effectiveEnd}
          onChange={setEndYear}
        />
        <div className="h-8 w-px self-end bg-gray-100 dark:bg-gray-700" />
        <MetricSelector value={metric} onChange={setMetric} />
      </div>

      {/* Historical Trends */}
      <section aria-labelledby="trends-heading">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="trends-heading"
            className="text-xl font-semibold text-gray-800 dark:text-gray-100"
          >
            {t('country.historical_trends')}
          </h2>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {t('country.dataset_coverage', { from: minYear, to: maxYear })}
          </span>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
          <TrendChart
            data={chartData}
            metric={metric}
            label={metricLabel}
          />
        </div>
      </section>

      {/* Climate Snapshot */}
      <section aria-labelledby="snapshot-heading">
        <h2
          id="snapshot-heading"
          className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
          {t('country.snapshot_heading', { year: effectiveEnd })}
        </h2>
        {endRecord !== undefined ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              label={t('country.snapshot.gdp_label')}
              value={formatGdp(endRecord.gdp)}
              description={t('country.snapshot.gdp_description')}
            />
            <MetricCard
              label={t('country.snapshot.population_label')}
              value={formatPopulation(endRecord.population)}
              description={t('country.snapshot.population_description')}
            />
            <MetricCard
              label={t('country.snapshot.co2_label')}
              value={formatCo2(endRecord.co2)}
              unit={t('country.snapshot.co2_unit')}
              description={t('country.snapshot.co2_description')}
            />
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {t('country.no_data_year', { year: effectiveEnd })}
          </p>
        )}
      </section>

      {/* Comparison */}
      <section aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
          {t('country.comparison_heading', { start: effectiveStart, end: effectiveEnd })}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            label={t('country.comparison.gdp_label')}
            value={formatChange(gdpChange)}
            sentiment={changeSentiment(gdpChange, true)}
            description={t('country.comparison.gdp_description', { start: effectiveStart, end: effectiveEnd })}
            emphasized
          />
          <MetricCard
            label={t('country.comparison.population_label')}
            value={formatChange(populationChange)}
            sentiment={changeSentiment(populationChange, true)}
            description={t('country.comparison.population_description', { start: effectiveStart, end: effectiveEnd })}
            emphasized
          />
          <MetricCard
            label={t('country.comparison.co2_label')}
            value={formatChange(co2Change)}
            sentiment={changeSentiment(co2Change, false)}
            description={t('country.comparison.co2_description', { start: effectiveStart, end: effectiveEnd })}
            emphasized
          />
        </div>
      </section>
    </div>
  )
}
