import { useTranslation } from 'react-i18next'

interface CountryHeaderProps {
  countryCode: string
  countryName?: string
  datasetRange?: { first: number; last: number }
}

export function CountryHeader({ countryCode, countryName, datasetRange }: CountryHeaderProps) {
  const { t } = useTranslation()
  return (
    <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-8 text-white shadow-md">
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
        {t('country.overview_badge')}
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        {countryName ?? countryCode.toUpperCase()}
      </h1>
      {countryName && (
        <p className="mt-0.5 text-lg font-medium text-sky-200">
          {countryCode.toUpperCase()}
        </p>
      )}
      <p className="mt-1 text-sky-100">{t('country.subtitle')}</p>
      {datasetRange !== undefined && (
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-100">
          {t('country.dataset_coverage', { from: datasetRange.first, to: datasetRange.last })}
        </span>
      )}
    </div>
  )
}
