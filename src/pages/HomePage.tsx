import { Link } from 'react-router-dom'
import { TrendingUp, CalendarRange, Landmark, Leaf } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from 'recharts'

// Italy CO₂ emissions (Mt CO₂) — approximate values from public records (OWID / GCP)
const CO2_PREVIEW = [
  { year: 1990, value: 430 },
  { year: 1993, value: 428 },
  { year: 1996, value: 443 },
  { year: 1999, value: 452 },
  { year: 2002, value: 462 },
  { year: 2005, value: 478 },
  { year: 2007, value: 468 },
  { year: 2009, value: 428 },
  { year: 2012, value: 390 },
  { year: 2015, value: 358 },
  { year: 2017, value: 347 },
  { year: 2019, value: 329 },
]

const CAPABILITIES = [
  {
    Icon: TrendingUp,
    title: 'Historical trends',
    body: 'Trace how emissions, GDP, and population have changed over decades for any country in the dataset.',
  },
  {
    Icon: CalendarRange,
    title: 'Period comparisons',
    body: 'Select a start and end year to calculate the exact percentage change across any metric.',
  },
  {
    Icon: Landmark,
    title: 'Economic indicators',
    body: 'GDP and population figures alongside environmental metrics, showing where growth and emissions have diverged.',
  },
  {
    Icon: Leaf,
    title: 'CO₂ emissions',
    body: 'Annual carbon dioxide output in megatonnes, tracked from the 1970s through the present.',
  },
]

const DATA_SOURCES = [
  {
    name: 'World Bank Open Data',
    detail: 'GDP and population statistics by country and year',
    url: 'https://data.worldbank.org',
  },
  {
    name: 'Our World in Data',
    detail: 'CO₂ emissions sourced from the Global Carbon Project',
    url: 'https://ourworldindata.org/co2-emissions',
  },
  {
    name: 'European Environment Agency',
    detail: 'European environmental indicators and trend datasets',
    url: 'https://www.eea.europa.eu/data-and-maps',
  },
  {
    name: 'Global Carbon Project',
    detail: 'Annual global and national carbon budget data',
    url: 'https://www.globalcarbonproject.org',
  },
]

export function HomePage() {
  return (
    <div>

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="-mx-6 -mt-10 border-b border-gray-100 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">

            {/* Left – mission */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
                Climate Hub
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Climate data should not be hidden inside spreadsheets.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                Climate Hub is an independent platform for exploring decades of
                climate and economic data across countries. GDP trends,
                population shifts, and CO₂ emissions — all visualised from
                publicly available sources.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-500">
                Built because the data already exists, but access to it is
                fragmented and difficult to navigate for most people.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/countries"
                  className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-md"
                >
                  Explore Countries
                </Link>
                <a
                  href="#data-sources"
                  className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  View Data Sources
                </a>
              </div>
            </div>

            {/* Right – product preview card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-500 dark:text-sky-400">
                    ITA
                  </span>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    Italy — CO₂ Emissions
                  </p>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
                  1990 – 2019
                </span>
              </div>
              <ResponsiveContainer width="100%" height={156}>
                <LineChart
                  data={CO2_PREVIEW}
                  margin={{ top: 4, right: 4, bottom: 0, left: -28 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0f2fe"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                    domain={[280, 500]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'CO₂ 2019', value: '329 Mt' },
                  { label: 'GDP 2019', value: '$2.0 T' },
                  { label: 'Population', value: '60.4 M' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-sky-50 p-3 text-center dark:bg-gray-700"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Why This Project Exists ──────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why this project exists
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Governments, research institutions, and international
              organisations publish vast amounts of climate and economic data.
              The World Bank, the European Environment Agency, and national
              statistical offices maintain decades of historical records that
              are, in principle, freely available to anyone.
            </p>
            <p>
              In practice, accessing this data meaningfully is not
              straightforward. It is scattered across different portals, buried
              in spreadsheets, or locked behind technical formats that require
              specialist tools to interpret. Most people do not have the time or
              the background to navigate those systems.
            </p>
            <p>
              Climate Hub brings this data together in a single, visual
              interface. No registration, no paywall, no preprocessing required.
              The goal is to make long-term trends visible and accessible to
              anyone who wants to understand them.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Explore Real Data ────────────────────────────────── */}
      <section className="-mx-6 border-y border-gray-100 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Explore the data directly
            </h2>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Every country page shows historical trends across GDP, population,
              and CO₂ emissions. Select any two years to compare and calculate
              the exact change over the period.
            </p>
          </div>

          {/* Product mockup */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-md dark:border-gray-700">

            {/* Mockup topbar */}
            <div className="border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-500 dark:text-sky-400">
                    ITA
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Italy
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Dataset: 1976 – 2019 &nbsp;·&nbsp; 44 records
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-700">
                    <span className="text-xs text-gray-400">From</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">1990</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-700">
                    <span className="text-xs text-gray-400">To</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">2019</span>
                  </div>
                  <span className="rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 dark:border-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                    CO₂ Emissions
                  </span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white px-6 pb-2 pt-4 dark:bg-gray-800">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={CO2_PREVIEW}
                  margin={{ top: 8, right: 16, bottom: 8, left: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0f2fe"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e0f2fe' }}
                    dy={6}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                    width={64}
                    tickFormatter={(v: number) => `${v} Mt`}
                    domain={[280, 500]}
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
            </div>

            {/* Metric row */}
            <div className="grid grid-cols-1 divide-y divide-gray-100 border-t border-gray-100 bg-white dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                {
                  label: 'CO₂ Emissions',
                  value: '329 Mt',
                  period: '2019',
                  change: '↓ 23.5% since 1990',
                  positive: true,
                },
                {
                  label: 'GDP',
                  value: '$2.0 T',
                  period: '2019',
                  change: '↑ 70.7% since 1990',
                  positive: false,
                },
                {
                  label: 'Population',
                  value: '60.4 M',
                  period: '2019',
                  change: '↑ 5.8% since 1990',
                  positive: false,
                },
              ].map(({ label, value, period, change, positive }) => (
                <div key={label} className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {value}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {period}
                  </p>
                  <p
                    className={`mt-2 text-xs font-medium ${positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
            Preview uses real historical data for Italy (1990 – 2019, sourced from World Bank and OWID).
            All charts are fully interactive in the application.
          </p>
        </div>
      </section>

      {/* ── 4. What You Can Discover ────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What you can discover
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Four views available on every country page.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CAPABILITIES.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <Icon
                  className="h-5 w-5 text-sky-500 dark:text-sky-400"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4.5 Why I Built This ────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
            A personal note
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            Why I built this
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Climate Hub started as a personal project. I wanted to make
              climate and economic data easier to explore — not because the data
              was missing, but because access to it was scattered and
              frustrating.
            </p>
            <p>
              Public datasets already exist. The World Bank and other
              organisations publish decades of records. But navigating those
              portals, finding the right dataset, extracting the numbers you
              need, and making sense of them over time is a process that
              excludes most people who are not data specialists.
            </p>
            <p>
              The goal was straightforward: take this publicly available data,
              put it in a clear visual interface, and make long-term trends
              readable for anyone.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Data Sources ─────────────────────────────────────── */}
      <section
        id="data-sources"
        className="-mx-6 border-y border-gray-100 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Where the data comes from
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            All data in Climate Hub is sourced from publicly available
            international datasets. Nothing is modified or reinterpreted.
          </p>

          <div className="mt-8 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-700 dark:border-gray-700">
            {DATA_SOURCES.map(({ name, detail, url }) => (
              <div
                key={name}
                className="flex items-start justify-between gap-6 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {detail}
                  </p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  Visit ↗
                </a>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Disclaimer.
              </span>{' '}
              Climate Hub visualises and republishes publicly available data. No
              original datasets are modified or reinterpreted. All data is
              provided as-is, as sourced from the organisations listed above.
              This platform does not make policy recommendations or act as an
              official data provider.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Why It Matters ───────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why it matters
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Long-term climate and economic trends are difficult to hold in
              perspective without visualisation. A figure like "CO₂ emissions
              fell 23% since 2005" means something very different when you can
              see the full curve — the years of acceleration, the turning point,
              and where a country stands today relative to its own history.
            </p>
            <p>
              Climate Hub does not interpret the data or take positions. Its
              purpose is to make the trends themselves visible, so users can
              draw their own conclusions from reliable, primary sources. Whether
              you are a student, a researcher, a journalist, or simply curious
              about how the world has changed — the data is here and it is
              yours to explore.
            </p>
          </div>
          <div className="mt-10">
            <Link
              to="/countries"
              className="inline-flex items-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-md"
            >
              Start exploring →
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
