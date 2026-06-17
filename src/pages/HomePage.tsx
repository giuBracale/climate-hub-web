import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrendingUp, CalendarRange, Landmark, Leaf } from 'lucide-react'
import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
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

const CAPABILITY_ICONS: Record<string, ComponentType<LucideProps>> = {
  trends: TrendingUp,
  periods: CalendarRange,
  economic: Landmark,
  co2: Leaf,
}

const CAPABILITY_KEYS = ['trends', 'periods', 'economic', 'co2'] as const

type DataSource = { name: string; detail: string; url: string }
type MetricPreview = { label: string; value: string; period: string; change: string; positive: boolean }
type HeroStat = { label: string; value: string }

export function HomePage() {
  const { t } = useTranslation()

  const dataSources = t('home.sources.list', { returnObjects: true }) as DataSource[]
  const metricsPreview = t('home.explore.metrics_preview', { returnObjects: true }) as MetricPreview[]
  const heroStats = t('home.hero.stats', { returnObjects: true }) as HeroStat[]

  return (
    <div>

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="-mx-6 -mt-10 border-b border-gray-100 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">

            {/* Left – mission */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
                {t('home.hero.badge')}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {t('home.hero.headline')}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {t('home.hero.lead')}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-500">
                {t('home.hero.subtext')}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/countries"
                  className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-md"
                >
                  {t('home.hero.cta_explore')}
                </Link>
                <a
                  href="#data-sources"
                  className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {t('home.hero.cta_sources')}
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
                    {t('home.hero.chart.metric_label')}
                  </p>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
                  {t('home.hero.chart.period')}
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
                {heroStats.map(({ label, value }) => (
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
            {t('home.why.title')}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>{t('home.why.p1')}</p>
            <p>{t('home.why.p2')}</p>
            <p>{t('home.why.p3')}</p>
          </div>
        </div>
      </section>

      {/* ── 3. Explore Real Data ────────────────────────────────── */}
      <section className="-mx-6 border-y border-gray-100 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('home.explore.title')}
            </h2>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              {t('home.explore.description')}
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
                    {t('home.explore.dataset_label')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-700">
                    <span className="text-xs text-gray-400">{t('home.explore.from')}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">1990</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-700">
                    <span className="text-xs text-gray-400">{t('home.explore.to')}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">2019</span>
                  </div>
                  <span className="rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 dark:border-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                    {t('home.explore.metric_badge')}
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
              {metricsPreview.map(({ label, value, period, change, positive }) => (
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
            {t('home.explore.caption')}
          </p>
        </div>
      </section>

      {/* ── 4. What You Can Discover ────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('home.capabilities.title')}
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            {t('home.capabilities.subtitle')}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CAPABILITY_KEYS.map((key) => {
              const Icon = CAPABILITY_ICONS[key]
              return (
                <div
                  key={key}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <Icon
                    className="h-5 w-5 text-sky-500 dark:text-sky-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {t(`home.capabilities.${key}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {t(`home.capabilities.${key}.body`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4.5 Why I Built This ────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
            {t('home.personal.badge')}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            {t('home.personal.title')}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>{t('home.personal.p1')}</p>
            <p>{t('home.personal.p2')}</p>
            <p>{t('home.personal.p3')}</p>
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
            {t('home.sources.title')}
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            {t('home.sources.description')}
          </p>

          <div className="mt-8 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-700 dark:border-gray-700">
            {dataSources.map(({ name, detail, url }) => (
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
                  {t('home.sources.visit')}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {t('home.sources.disclaimer_label')}
              </span>{' '}
              {t('home.sources.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Why It Matters ───────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('home.matters.title')}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>{t('home.matters.p1')}</p>
            <p>{t('home.matters.p2')}</p>
          </div>
          <div className="mt-10">
            <Link
              to="/countries"
              className="inline-flex items-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-md"
            >
              {t('home.matters.cta')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
