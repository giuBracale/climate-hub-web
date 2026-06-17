import { useTranslation } from 'react-i18next'
import type { ChartMetric } from './chart.utils'

interface MetricSelectorProps {
  value: ChartMetric
  onChange: (metric: ChartMetric) => void
}

const METRICS: ChartMetric[] = ['gdp', 'population', 'co2']

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {t('country.controls.metric')}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ChartMetric)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        {METRICS.map((key) => (
          <option key={key} value={key}>
            {t(`country.metrics.${key}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
