import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../modules/auth/store/authStore'
import { UserRoles } from '../modules/auth/types/auth'
import { useMemo } from 'react'

interface ProtectedRoutesProps {
  roles?: UserRoles[]
}

export const ProtectedRoutes = (props: ProtectedRoutesProps) => {
  const { roles } = props

  const user = useAuthStore((state) => state.user)

  const isAuth = useMemo(() => {
    return roles?.length && user ? roles.includes(user?.role) : !!user
  }, [user, roles])

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

