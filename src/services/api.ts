import axios from 'axios'

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
      return Promise.reject(new Error('Service unavailable. Please try again later.'))
    }
    const message =
      error.response.data?.message ??
      error.response.data?.error ??
      error.message ??
      'Unknown error'
    return Promise.reject(new Error(message))
  },
)
