import type { ClimateRecord } from './countryDetail.types'

export function calculatePercentageChange(
  startValue: number | null,
  endValue: number | null,
): number | null {
  if (startValue === null || endValue === null || startValue === 0) return null
  return ((endValue - startValue) / Math.abs(startValue)) * 100
}

export function findRecordByYear(
  records: ClimateRecord[],
  year: number,
): ClimateRecord | undefined {
  return records.find((r) => r.year === year)
}
