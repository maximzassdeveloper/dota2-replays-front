import axios from 'axios'
import { config } from '../config'
import { AUTH_TOKEN_KEY } from '../modules/auth'

const baseApi = axios.create({
  baseURL: `${config.BASE_API_URL}/`,
})

baseApi.interceptors.request.use((axiosConfig) => {
  const uuid = localStorage.getItem(AUTH_TOKEN_KEY)
  if (uuid) {
    axiosConfig.headers.Authorization = `${uuid}`
  }

  return axiosConfig
})

export default baseApi

