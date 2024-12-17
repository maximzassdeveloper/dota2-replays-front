import { create } from 'zustand'
import { User, UserRoles } from '../types/auth'

interface AuthStore {
  user: User | null
  token: string
  setUser: (user: User | null) => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  // user: { id: 1, username: 'Admin', password: '', role: UserRoles.ADMIN },
  user: null,
  token: '',
  setToken: (token) => set(() => ({ token })),
  setUser: (user) => set(() => ({ user })),
}))

