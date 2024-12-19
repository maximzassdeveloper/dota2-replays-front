import axios from 'axios'
import { config } from '../config'
import { AUTH_TOKEN_KEY } from '../modules/auth'

const baseApi = axios.create({
  baseURL: `${config.BASE_API_URL}/`,
  withAuth: true,
})

baseApi.interceptors.request.use((config) => {
  if (config.withAuth) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `${token}`
    }
  }

  return config
})

export default baseApi

