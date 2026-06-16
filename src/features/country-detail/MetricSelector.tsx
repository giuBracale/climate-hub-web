import type { ChartMetric } from './chart.utils'
import { METRIC_LABELS } from './chart.utils'

interface MetricSelectorProps {
  value: ChartMetric
  onChange: (metric: ChartMetric) => void
}

const METRICS: ChartMetric[] = ['gdp', 'population', 'co2']

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Metric
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ChartMetric)}
        className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        {METRICS.map((key) => (
          <option key={key} value={key}>
            {METRIC_LABELS[key]}
          </option>
        ))}
      </select>
    </div>
  )
}
