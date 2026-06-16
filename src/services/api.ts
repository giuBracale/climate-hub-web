import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
console.log('VITE_API_URL=', import.meta.env.VITE_API_URL)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Unknown error'
    return Promise.reject(new Error(message))
  },
)
