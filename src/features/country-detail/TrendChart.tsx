import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import type { ChartDataPoint, ChartMetric } from './chart.utils'
import { formatChartValue, formatYAxisTick } from './chart.utils'

interface TrendChartProps {
  data: ChartDataPoint[]
  metric: ChartMetric
  label: string
}

export function TrendChart({ data, metric, label }: TrendChartProps) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        No data available for the selected range.
      </p>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          tickFormatter={(v: number) => formatYAxisTick(v, metric)}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
          axisLine={false}
          width={72}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const point = payload[0].payload as ChartDataPoint
            return (
              <div className="rounded-md border border-gray-200 bg-white p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {point.year}
                </p>
                <p className="mt-0.5 text-gray-500 dark:text-gray-400">
                  {label}: {formatChartValue(point.value, metric)}
                </p>
              </div>
            )
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
