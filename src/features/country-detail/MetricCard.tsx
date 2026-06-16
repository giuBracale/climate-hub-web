export interface MetricCardProps {
  label: string
  value: string
  unit?: string
  description?: string
  sentiment?: 'positive' | 'negative' | 'neutral'
}

const sentimentClass: Record<NonNullable<MetricCardProps['sentiment']>, string> = {
  positive: 'text-emerald-600 dark:text-emerald-400',
  negative: 'text-red-600 dark:text-red-400',
  neutral: 'text-gray-900 dark:text-white',
}

export function MetricCard({ label, value, unit, description, sentiment = 'neutral' }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${sentimentClass[sentiment]}`}>
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            {unit}
          </span>
        )}
      </p>
      {description && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}
