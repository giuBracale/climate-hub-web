import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { FeedbackState, classifyApiError } from '../components/FeedbackState'
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
import {
  toChartData,
  METRIC_LABELS,
} from '../features/country-detail/chart.utils'
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
  const effectiveStart = startYear ?? minYear
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
        title="Country unavailable"
        description="We couldn't find climate records for the requested country."
        actions={
          <Link
            to="/countries"
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
          >
            View Countries
          </Link>
        }
      />
    )
  }

  if (history.isLoading) {
    return (
      <p className="text-gray-500 dark:text-gray-400">Loading climate data…</p>
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
            ? 'Country unavailable'
            : isNetwork
              ? 'Data service unavailable'
              : 'Something went wrong'
        }
        description={
          isNotFound
            ? "We couldn't find climate records for the requested country."
            : isNetwork
              ? 'Climate Hub is currently unable to retrieve climate data. Please try again in a few moments.'
              : 'An unexpected error occurred while loading this view.'
        }
        actions={
          <>
            {isNetwork && (
              <button
                onClick={() => history.refetch()}
                className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Retry
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
              View Countries
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Return Home
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
        title="No records found"
        description="No climate records match the current selection."
        actions={
          <Link
            to="/countries"
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
          >
            View Countries
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
          label="Start Year"
          years={startYearOptions}
          value={effectiveStart}
          onChange={setStartYear}
        />
        <YearSelector
          label="End Year"
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
            Historical Trends
          </h2>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            Dataset coverage: {minYear} → {maxYear}
          </span>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
          <TrendChart
            data={chartData}
            metric={metric}
            label={METRIC_LABELS[metric]}
          />
        </div>
      </section>

      {/* Climate Snapshot */}
      <section aria-labelledby="snapshot-heading">
        <h2
          id="snapshot-heading"
          className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
          Climate Snapshot — {effectiveEnd}
        </h2>
        {endRecord !== undefined ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              label="Gross Domestic Product (GDP)"
              value={formatGdp(endRecord.gdp)}
              description="Total value of goods and services produced in a year"
            />
            <MetricCard
              label="Total Population"
              value={formatPopulation(endRecord.population)}
              description="Estimated number of inhabitants"
            />
            <MetricCard
              label="CO₂ Emissions"
              value={formatCo2(endRecord.co2)}
              unit="Mt CO₂"
              description="Annual carbon dioxide output, measured in megatonnes"
            />
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No data available for {effectiveEnd}.
          </p>
        )}
      </section>

      {/* Comparison */}
      <section aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
          Comparison — {effectiveStart} to {effectiveEnd}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            label="GDP Growth"
            value={formatChange(gdpChange)}
            sentiment={changeSentiment(gdpChange, true)}
            description={`Change in economic output from ${effectiveStart} to ${effectiveEnd}`}
            emphasized
          />
          <MetricCard
            label="Population Growth"
            value={formatChange(populationChange)}
            sentiment={changeSentiment(populationChange, true)}
            description={`Change in total population from ${effectiveStart} to ${effectiveEnd}`}
            emphasized
          />
          <MetricCard
            label="CO₂ Emissions Change"
            value={formatChange(co2Change)}
            sentiment={changeSentiment(co2Change, false)}
            description={`Change in annual carbon emissions from ${effectiveStart} to ${effectiveEnd}. A decrease is climate-positive.`}
            emphasized
          />
        </div>
      </section>
    </div>
  )
}
