const sources = [
  {
    name: 'World Bank Open Data',
    url: 'https://data.worldbank.org',
    metrics: 'GDP (current USD), total population',
    coverage: 'Global, annual records from 1960 onwards',
  },
  {
    name: 'Our World in Data',
    url: 'https://ourworldindata.org/co2-emissions',
    metrics: 'Annual CO₂ emissions (tonnes, converted to megatonnes)',
    coverage: 'Global, compiled from the Global Carbon Project',
  },
  {
    name: 'Global Carbon Project',
    url: 'https://www.globalcarbonproject.org',
    metrics: 'National and global carbon budget data',
    coverage: 'Global, annual from 1959 onwards',
  },
  {
    name: 'European Environment Agency',
    url: 'https://www.eea.europa.eu/data-and-maps',
    metrics: 'European environmental indicators',
    coverage: 'EU member states and candidate countries',
  },
]

export function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
          Transparency
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          Data Methodology
        </h1>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          How Climate Hub sources, processes, and presents data.
        </p>
      </div>

      <div className="space-y-12 text-base leading-relaxed text-gray-600 dark:text-gray-400">

        {/* Data Sources */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Data sources
          </h2>
          <p className="mt-3">
            Climate Hub uses exclusively publicly available datasets from
            internationally recognised organisations. No proprietary data is
            used. The table below lists each source, the metrics derived from
            it, and its coverage.
          </p>
          <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-700 dark:border-gray-700">
            {sources.map(({ name, url, metrics, coverage }) => (
              <div key={name} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {name}
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
                  >
                    Visit ↗
                  </a>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Metrics:
                  </span>{' '}
                  {metrics}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Coverage:
                  </span>{' '}
                  {coverage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data ingestion */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Data ingestion
          </h2>
          <p className="mt-3">
            Source datasets are fetched from provider APIs or published bulk
            downloads. Records are mapped to a unified schema — country code
            (ISO 3166-1 alpha-3), year, GDP (USD), population (persons), and
            CO₂ emissions (megatonnes CO₂) — and stored in a relational
            database.
          </p>
          <p className="mt-3">
            Where a source publishes data in a different unit (for example,
            tonnes of CO₂), values are converted to the display unit during
            ingestion. No values are otherwise modified, smoothed, or
            interpolated. If a data point is missing from the source, it is
            stored as null and displayed as "—" in the interface.
          </p>
        </section>

        {/* Aggregation */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Aggregation and calculations
          </h2>
          <p className="mt-3">
            Climate Hub does not produce aggregated or composite metrics beyond
            what is described below:
          </p>
          <ul className="mt-3 space-y-2 pl-5 text-sm">
            <li className="list-disc">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Percentage change:
              </span>{' '}
              Calculated as{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono dark:bg-gray-800">
                ((end − start) / |start|) × 100
              </code>
              . Applied to GDP, population, and CO₂ between any two user-selected years.
            </li>
            <li className="list-disc">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Trend direction:
              </span>{' '}
              Derived from the first and last valid record in the full dataset
              for the selected country. Records with all null metric values are
              excluded from trend calculations.
            </li>
          </ul>
        </section>

        {/* Visualisation */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Visualisation
          </h2>
          <p className="mt-3">
            Charts are rendered client-side using{' '}
            <a
              href="https://recharts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              Recharts
            </a>
            , an open-source charting library for React. All chart data is
            fetched directly from the Climate Hub API, which serves records
            stored in the database with no further transformation applied
            at the API layer.
          </p>
          <p className="mt-3">
            Year range filters applied in the interface affect which records are
            displayed in the chart and used for percentage-change calculations.
            They do not affect the underlying stored data.
          </p>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Limitations
          </h2>
          <ul className="mt-3 space-y-2 pl-5 text-sm">
            <li className="list-disc">
              Data coverage varies by country and metric. Not all countries have
              records from the earliest available year. Gaps in coverage are
              shown as null values.
            </li>
            <li className="list-disc">
              Source datasets are updated by their respective providers on their
              own schedules. Climate Hub does not guarantee that the data
              presented reflects the most recent release from any given source.
            </li>
            <li className="list-disc">
              Historical records may be revised by source providers. Climate Hub
              does not automatically backfill historical revisions once data has
              been ingested.
            </li>
            <li className="list-disc">
              CO₂ emissions data represents territorial emissions and may differ
              from consumption-based figures published by other organisations.
            </li>
            <li className="list-disc">
              GDP figures are expressed in current USD. No purchasing-power or
              inflation adjustments are applied.
            </li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Disclaimer
          </h2>
          <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Climate Hub visualises publicly available datasets from third-party
              organisations. Data is provided for educational and informational
              purposes only. While every effort is made to present information
              accurately, no guarantee is provided regarding completeness,
              accuracy, or suitability for decision-making. Climate Hub is not
              affiliated with, endorsed by, or acting as an official agent of
              any of the source organisations listed above.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
