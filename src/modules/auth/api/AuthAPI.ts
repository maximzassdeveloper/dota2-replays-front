import baseApi from '../../../services/api'
import { UserRoles } from '../types/auth'

export interface RegisterFormData {
  username: string
  password: string
  role: UserRoles
}

export type RegisterResponse = {
  token: string
  username: string
  role: UserRoles
  id: number
}

export const register = (data: RegisterFormData) => {
  return baseApi.post<RegisterResponse>('/auth/register', data)
}

export interface LoginFormData {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  username: string
  role: UserRoles
  id: number
}

export const login = (data: LoginFormData) => {
  return baseApi.post<LoginResponse>('/auth/login', data)
}

