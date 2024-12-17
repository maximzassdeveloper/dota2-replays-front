import { FC } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../modules/auth/store/authStore'
import { UserRoles } from '../../modules/auth/types/auth'

export const Header: FC = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const navigate = useNavigate()

  const logout = () => {
    setUser(null)
    setToken('')
    navigate('/login')
  }

  if (!user?.role || user.role === UserRoles.GUEST) {
    return null
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/">Dota 2 replays</Link>

        {user ? (
          <div>
            <span className="username">{user.username}</span>
            <button className="logout" onClick={logout}>
              Выйти
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}

