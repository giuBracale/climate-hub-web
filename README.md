# Climate Hub — Frontend

An open platform for exploring climate data and environmental indicators from around the world.

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

| Variable        | Description             | Example                    |
| --------------- | ----------------------- | -------------------------- |
| `VITE_API_URL`  | Base URL for the API    | `http://localhost:8000`    |

## Frontend Architecture

### Stack

| Tool                | Purpose                          |
| ------------------- | -------------------------------- |
| **React 19**        | UI library                       |
| **TypeScript**      | Type safety                      |
| **Vite**            | Build tool & dev server          |
| **React Router v7** | Client-side routing              |
| **TanStack Query**  | Async state & server data cache  |
| **Recharts**        | Data visualisation               |
| **Tailwind CSS v4** | Utility-first styling            |
| **Axios**           | HTTP client                      |

### Project Structure

```
src/
├── app/             # App-level singletons (QueryClient, …)
├── pages/           # Route-level page components
├── features/        # Domain feature modules (self-contained)
├── components/      # Shared UI components (Layout, Header, Footer, …)
├── services/        # API layer (apiClient, per-resource helpers)
├── hooks/           # Shared custom React hooks
├── routes/          # Router definition (createBrowserRouter)
├── types/           # Global TypeScript types & interfaces
└── utils/           # Pure utility functions
```

### Routing

Routes are defined in `src/routes/index.tsx` using React Router's `createBrowserRouter`.

| Path                    | Component       |
| ----------------------- | --------------- |
| `/`                     | `HomePage`      |
| `/countries/:country`   | `CountryPage`   |
| `/datasets`             | `DatasetsPage`  |
| `/about`                | `AboutPage`     |

All routes render inside the `Layout` component which provides the shared `Header` and `Footer`.

### Data Fetching

Server state is managed by **TanStack Query**. The `QueryClient` is configured in `src/app/queryClient.ts` with a 5-minute stale time and a single retry. All queries should use the `apiClient` from `src/services/api.ts` so that the base URL and error handling are applied uniformly.

### API Layer

`src/services/api.ts` exports a configured Axios instance (`apiClient`) that:

- Reads the base URL from `VITE_API_URL`
- Sets `Content-Type: application/json` globally
- Normalises error responses into a single `Error` with a `message` string

Add per-resource helper files alongside it (e.g. `src/services/countries.ts`) rather than calling `apiClient` directly from components or hooks.

### Styling

Tailwind CSS v4 is integrated via the `@tailwindcss/vite` plugin — no `tailwind.config` file is needed. All utility classes are available out of the box. Dark mode is handled through the CSS `color-scheme` property and `dark:` variants.
