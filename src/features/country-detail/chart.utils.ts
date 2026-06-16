import type { ClimateRecord } from './countryDetail.types'

export type ChartMetric = 'gdp' | 'population' | 'co2'

export interface ChartDataPoint {
  year: number
  value: number | null
}

export const METRIC_LABELS: Record<ChartMetric, string> = {
  gdp: 'GDP',
  population: 'Population',
  co2: 'CO₂ Emissions',
}

export function toChartData(
  records: ClimateRecord[],
  metric: ChartMetric,
  startYear: number,
  endYear: number,
): ChartDataPoint[] {
  return records
    .filter((r) => r.year >= startYear && r.year <= endYear)
    .sort((a, b) => a.year - b.year)
    .map((r) => ({ year: r.year, value: r[metric] }))
}

export function formatChartValue(value: number | null, metric: ChartMetric): string {
  if (value === null) return 'N/A'
  switch (metric) {
    case 'gdp':
      if (value >= 1e12) return `$${(value / 1e12).toFixed(2)} Trillion`
      if (value >= 1e9) return `$${(value / 1e9).toFixed(2)} Billion`
      return `$${value.toLocaleString()}`
    case 'population':
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Billion`
      if (value >= 1e6) return `${(value / 1e6).toFixed(2)} Million`
      return value.toLocaleString()
    case 'co2':
      return `${value.toFixed(2)} Mt CO₂`
  }
}

export function formatYAxisTick(value: number, metric: ChartMetric): string {
  switch (metric) {
    case 'gdp':
      if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
      if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
      return `$${value}`
    case 'population':
      if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
      if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
      return `${value}`
    case 'co2':
      return `${Math.round(value)}`
  }
}
