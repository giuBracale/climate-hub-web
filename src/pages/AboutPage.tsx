const stack = [
  { label: 'Frontend', value: 'React 19, TypeScript, Vite, Tailwind CSS v4' },
  { label: 'Charts', value: 'Recharts' },
  { label: 'Data fetching', value: 'TanStack Query, Axios' },
  { label: 'Routing', value: 'React Router v7' },
  { label: 'Backend', value: 'Node.js, Express 5, TypeScript' },
  { label: 'Database', value: 'PostgreSQL via Prisma ORM' },
  { label: 'Icons', value: 'Lucide React' },
]

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
          About
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          Climate Hub
        </h1>
      </div>

      <div className="space-y-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            What this is
          </h2>
          <p className="mt-3">
            Climate Hub is a personal, open-access platform for exploring
            historical climate and economic data. It is not a product, not a
            company, and not affiliated with any research institution or
            government body.
          </p>
          <p className="mt-3">
            The platform visualises publicly available datasets — GDP,
            population, and CO₂ emissions — across a set of countries, covering
            records from 1976 onwards. All data comes from internationally
            recognised sources. Nothing is collected from users, and nothing is
            sold.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Goal
          </h2>
          <p className="mt-3">
            Public datasets on climate and economic change already exist, but
            accessing them in a way that is useful to non-specialists is often
            difficult. The goal of Climate Hub is to make long-term trends
            visible and easy to explore — without requiring data science tools,
            portals, or spreadsheet skills.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Data sources
          </h2>
          <p className="mt-3">
            All data is sourced from publicly available international datasets:
            World Bank Open Data, Our World in Data (sourcing from the Global
            Carbon Project), and the European Environment Agency. No original
            datasets are modified. For full details, see the{' '}
            <a
              href="/methodology"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              Methodology page
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tech stack
          </h2>
          <div className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-700 dark:border-gray-700">
            {stack.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-6 px-5 py-3"
              >
                <span className="shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
                <span className="text-right text-sm text-gray-500 dark:text-gray-400">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Source code
          </h2>
          <p className="mt-3">
            Climate Hub is an open project. The source code is available on{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              GitHub ↗
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  )
}
