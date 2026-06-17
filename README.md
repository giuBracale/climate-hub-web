# Climate Hub Web

## Live

Frontend: https://climate-hub-web.vercel.app  
API: https://eu-climate-data-hub.onrender.com

---

React frontend for browsing GDP, population, and CO₂ emission data by country. Data is served by [ClimateHubAPI](https://eu-climate-data-hub.onrender.com), a separate backend that pulls from public World Bank datasets stored in PostgreSQL.

This repository contains only the frontend. For the backend, see the ClimateHubAPI repository:
https://github.com/giuBracale/eu-climate-data-hub

---

## Features

- Country list page with a searchable/browsable grid
- Country detail page with historical climate and economic indicators (GDP, population, CO₂)
- Interactive time-series charts (Recharts)
- Trend summary per country (growth rates over a period)
- English and Italian localisation, with language persisted to `localStorage`
- Responsive layout via Tailwind CSS
- API-backed data fetching with TanStack Query (5-minute stale time, single retry)
- Error and empty-state feedback components per route

---

## Architecture

```
Browser
  ↓
React + Vite  (this repo)
  ↓  VITE_API_URL
ClimateHubAPI  (Render)
  ↓
PostgreSQL  (Neon)
```

The frontend communicates with the backend exclusively through `VITE_API_URL`. All HTTP requests are made via an Axios instance in `src/services/api.ts` that normalises error responses into plain `Error` objects. There is no direct database access from the frontend.

---

## Tech Stack

| Library | Role |
|---|---|
| React | UI rendering |
| TypeScript | Type safety |
| Vite | Build tool and development server |
| React Router | Client-side routing (`createBrowserRouter`) |
| TanStack Query | Server state, request deduplication, and caching |
| Recharts | Time-series charts on the country detail page |
| Axios | HTTP client; configured in `src/services/api.ts` |
| i18next | Localisation (English / Italian) |
| i18next-browser-languagedetector | Detects locale from `localStorage` then `navigator` |
| Tailwind CSS | Utility-first styling (via `@tailwindcss/vite`, no config file needed) |

---

## Project Structure

```
src/
├── app/             # QueryClient instance (staleTime: 5m, retry: 1)
├── assets/          # Static assets (logo, favicon)
├── components/      # Shared UI: Layout, Header, Footer, LanguageSwitcher, FeedbackState
├── features/
│   ├── countries/       # Country list: API call, types, grid and card components, useCountries hook
│   └── country-detail/  # Country detail: API calls, types, chart/metric/year components, hooks
├── hooks/           # Shared custom React hooks
├── i18n/            # en.json, it.json translation files and i18next initialisation
├── pages/           # Route-level components (one per route)
├── routes/          # createBrowserRouter definition
├── services/        # Axios instance and error normalisation
├── types/           # Shared TypeScript types
└── utils/           # Pure utility functions (e.g. classifyApiError)
```

**`features/`** groups each domain by co-location: API functions, TypeScript types, React components, and hooks live together rather than split by layer.

---

## Routes

| Path | Page component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page |
| `/countries` | `CountriesPage` | Grid of all countries returned by the API |
| `/countries/:country` | `CountryOverviewPage` | Charts and indicators for a single country |
| `/datasets` | `DatasetsPage` | Data source information |
| `/about` | `AboutPage` | Project description |
| `/methodology` | `MethodologyPage` | How metrics are computed |
| `/privacy` | `PrivacyPage` | Privacy policy |

All routes render inside the shared `Layout` component. Unmatched paths render `NotFoundPage`; router-level errors render `ErrorPage`.

---

## Data Flow

1. A page component calls a custom hook (e.g. `useCountryHistory`).
2. The hook calls TanStack Query's `useQuery` with a key and a fetcher from `features/*/`.
3. The fetcher calls `apiClient.get(...)` — the Axios instance reads `VITE_API_URL` as its `baseURL`.
4. On success, the data is passed to Recharts components or rendered directly.
5. On error, the Axios response interceptor normalises the error into a plain `Error`; the hook returns it and the page renders a `FeedbackState` component.

**API endpoints used:**

- `GET /countries` — list of all countries
- `GET /countries/:country/climate-data` — full historical records
- `GET /countries/:country/climate-data/latest` — most recent year
- `GET /countries/:country/climate-data/trend` — growth rates over a period

---

## Local Development

```bash
cp .env.example .env
# Edit .env: set VITE_API_URL to your local backend
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` by default.

```bash
npm run build    # tsc -b && vite build → dist/
npm run preview  # serve dist/ locally
npm run lint     # ESLint
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:3000
```

`VITE_API_URL` is the only required variable. It must not have a trailing slash. In production it is set to the Render service URL in Vercel's environment settings.

Variables prefixed `VITE_` are inlined at build time by Vite and end up in the compiled JS bundle — do not put secrets here.

---

## Localisation

Two locales: English (`en`) and Italian (`it`). Translation keys live in `src/i18n/en.json` and `src/i18n/it.json`.

Language detection order: `localStorage` key `i18nLng` → browser `navigator.language`. The language switcher in the header writes the selection back to `localStorage`. The `document.documentElement.lang` attribute is updated on every language change.

Fallback locale is `en`.

---

## Deployment

| Layer | Platform | Notes |
|---|---|---|
| Frontend | [Vercel](https://climate-hub-web.vercel.app) | Framework preset: Vite. Set `VITE_API_URL` in Vercel environment settings. |
| Backend | [Render](https://eu-climate-data-hub.onrender.com) | ClimateHubAPI — separate repository |
| Database | Neon | PostgreSQL, accessed only by the backend |

No custom `vercel.json` is needed.

---

## Limitations

- The frontend has no data of its own — it depends entirely on the ClimateHubAPI being reachable. If the API is down, every data page shows an error state.
- The list of supported countries is determined by the backend; there is no frontend filter or override.
- No offline support or service worker.
- Client-side caching is limited to TanStack Query's in-memory cache (5-minute stale time). Cache is lost on page reload.
- The Render backend runs on a free tier and may take ~30 seconds to respond after a period of inactivity (cold start).

---

## Live Demo

Frontend: https://climate-hub-web.vercel.app  
API: https://eu-climate-data-hub.onrender.com
