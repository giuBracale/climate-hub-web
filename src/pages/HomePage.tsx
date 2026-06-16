import { Link } from 'react-router-dom'

const whyPillars = [
  {
    icon: '🌐',
    title: 'Open Data',
    body: 'All data is sourced from publicly available international datasets. Free to access, transparent, and regularly updated.',
  },
  {
    icon: '📊',
    title: 'Historical Context',
    body: 'Explore trends spanning decades. Compare years, identify shifts, and understand long-term patterns in economic and climate data.',
  },
  {
    icon: '🔗',
    title: 'Integrated View',
    body: 'GDP, population, and CO₂ emissions side by side. Economic and environmental data together give a more complete picture.',
  },
]

const explorerFeatures = [
  {
    icon: '📈',
    title: 'Historical Line Charts',
    body: 'Visualise how any metric changed over time with an interactive chart for every country.',
  },
  {
    icon: '🔄',
    title: 'Period Comparison',
    body: 'Calculate exact percentage changes between any two years from the dataset.',
  },
  {
    icon: '🌍',
    title: 'Global Coverage',
    body: 'Data from countries across every continent, compiled from internationally recognised sources.',
  },
  {
    icon: '💹',
    title: 'Economic Indicators',
    body: 'Gross Domestic Product and population trends for each country and year.',
  },
  {
    icon: '🌱',
    title: 'CO₂ Emissions',
    body: 'Annual carbon dioxide output in megatonnes — tracked from the 1970s to the present.',
  },
  {
    icon: '📅',
    title: 'Flexible Time Ranges',
    body: 'Filter any chart or comparison to a custom start and end year from the available dataset.',
  },
]

const dataSources = [
  { label: 'Dataset coverage', value: '1976 – present' },
  { label: 'Metrics per record', value: 'GDP · Population · CO₂' },
  { label: 'Data access', value: 'Free & public domain' },
]

const whyMatters = [
  {
    icon: '🕰️',
    title: 'Historical perspective',
    body: 'Decades of data help distinguish short-term events from long-term structural trends.',
  },
  {
    icon: '📐',
    title: 'Interconnected indicators',
    body: 'Economic growth and emissions levels are closely linked. Seeing both together adds important context.',
  },
  {
    icon: '💬',
    title: 'Informed public discourse',
    body: 'Open, visual data makes complex global topics easier to research, discuss, and understand.',
  },
]

export function HomePage() {
  return (
    <div>
      {/* ─── 1. Hero ─────────────────────────────────────────── */}
      <section className="-mx-6 -mt-10 bg-gradient-to-br from-sky-600 to-blue-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
            Climate Hub
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Understand the World Through Data
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sky-100 sm:text-xl">
            Explore decades of climate and economic data across countries.
            Track CO₂ emissions, GDP trends, and population changes — all from
            open, publicly available sources.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/countries"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sky-700 shadow transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Explore Countries →
            </Link>
            <a
              href="#why"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ─── 2. Why Climate Hub ──────────────────────────────── */}
      <section id="why" className="py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Why Climate Hub?
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            A platform built around clarity, transparency, and accessibility.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyPillars.map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-sky-100 bg-white p-7 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. What Can You Explore ─────────────────────────── */}
      <section className="rounded-2xl bg-sky-50 px-8 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            What Can You Explore?
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Every country page gives you multiple ways to explore the same
            dataset.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {explorerFeatures.map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900"
            >
              <span
                className="mt-0.5 shrink-0 text-2xl"
                role="img"
                aria-hidden="true"
              >
                {icon}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. Data Driven ──────────────────────────────────── */}
      <section className="py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-500">
              The Data
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              Built on Trusted Public Data
            </h2>
            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Climate Hub uses historical datasets compiled from internationally
              recognised sources, including data originally published by the
              World Bank, national statistical agencies, and climate monitoring
              organisations.
            </p>
            <p className="mt-3 leading-relaxed text-gray-500 dark:text-gray-400">
              The platform does not collect proprietary data. Everything
              displayed is available in the public domain and is provided here
              in a visual, interactive format for easier exploration.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3">
            {dataSources.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-sky-100 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:flex-row"
              >
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {label}
                </span>
                <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Why It Matters ───────────────────────────────── */}
      <section className="rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 px-8 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Why It Matters</h2>
          <p className="mt-3 text-sky-100">
            Understanding how economies and emissions have changed over decades
            helps put current events in context. Whether you are a student,
            researcher, journalist, or curious citizen, access to clear visual
            data makes it easier to form well-grounded views on complex topics.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyMatters.map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                {icon}
              </span>
              <h3 className="mt-3 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sky-100">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. Call To Action ───────────────────────────────── */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to Explore?
        </h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Browse the full country list and start exploring climate and economic
          trends.
        </p>
        <Link
          to="/countries"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-8 py-3 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-md"
        >
          Browse Countries →
        </Link>
      </section>
    </div>
  )
}
