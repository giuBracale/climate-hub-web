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
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          No data available for the selected range.
        </p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={460}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={{ stroke: '#e0f2fe' }}
          dy={6}
        />
        <YAxis
          tickFormatter={(v: number) => formatYAxisTick(v, metric)}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          width={76}
        />
        <Tooltip
          cursor={{ stroke: '#0ea5e9', strokeWidth: 1, strokeDasharray: '4 2' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const point = payload[0].payload as ChartDataPoint
            return (
              <div className="rounded-lg border border-sky-100 bg-white p-3 text-sm shadow-md dark:border-gray-700 dark:bg-gray-900">
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  {point.year}
                </p>
                <p className="mt-1 text-sky-600 dark:text-sky-400">
                  {label}: {formatChartValue(point.value, metric)}
                </p>
              </div>
            )
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0ea5e9"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#0ea5e9', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
