export interface MetricCardProps {
  label: string
  value: string
  unit?: string
  description?: string
  sentiment?: 'positive' | 'negative' | 'neutral'
  emphasized?: boolean
}

const sentimentValueClass: Record<NonNullable<MetricCardProps['sentiment']>, string> = {
  positive: 'text-emerald-600 dark:text-emerald-400',
  negative: 'text-red-600 dark:text-red-400',
  neutral: 'text-gray-900 dark:text-white',
}

const sentimentCardClass: Record<NonNullable<MetricCardProps['sentiment']>, string> = {
  positive: 'border-emerald-100 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950',
  negative: 'border-red-100 bg-red-50 dark:border-red-900 dark:bg-red-950',
  neutral: 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900',
}

export function MetricCard({
  label,
  value,
  unit,
  description,
  sentiment = 'neutral',
  emphasized = false,
}: MetricCardProps) {
  const cardClass = emphasized ? sentimentCardClass[sentiment] : 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900'

  return (
    <div className={`rounded-xl border p-6 shadow-sm ${cardClass}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p
        className={`mt-2 font-bold leading-none ${emphasized ? 'text-3xl' : 'text-2xl'} ${sentimentValueClass[sentiment]}`}
      >
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-gray-400 dark:text-gray-500">
            {unit}
          </span>
        )}
      </p>
      {description && (
        <p className="mt-3 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}
