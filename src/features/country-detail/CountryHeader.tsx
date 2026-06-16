interface CountryHeaderProps {
  countryCode: string
  datasetRange?: { first: number; last: number }
}

export function CountryHeader({ countryCode, datasetRange }: CountryHeaderProps) {
  return (
    <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Country Overview
      </span>
      <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
        {countryCode.toUpperCase()}
      </h1>
      {datasetRange !== undefined && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Dataset available: {datasetRange.first}–{datasetRange.last}
        </p>
      )}
    </div>
  )
}
