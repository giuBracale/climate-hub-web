import axios from 'axios'
import { ApiError } from '../types'

const baseURL = import.meta.env.VITE_API_URL

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // No HTTP response reached the client at all. We can't tell "your
      // network is down" apart from "their server is down" from an axios
      // error alone, so navigator.onLine is the best available signal.
      const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false
      return Promise.reject(
        isOffline
          ? new ApiError('NETWORK_ERROR', 'Unable to reach the server.')
          : new ApiError('BACKEND_UNAVAILABLE', 'The backend service is currently unavailable.'),
      )
    }

    const code = error.response.data?.code ?? 'INTERNAL_SERVER_ERROR'
    const message =
      error.response.data?.message ?? error.message ?? 'Unexpected server error.'
    return Promise.reject(new ApiError(code, message))
  },
)

export function warmUpBackend(): void {
  apiClient.get('/health').catch(() => {})
}
