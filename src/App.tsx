import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CategoryListPage } from './modules/heros/pages/CategoryListPage'
import { LoginPage, RegisterPage } from './modules/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { UserRoles } from './modules/auth/types/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CategorySinglePage, HeroPage } from './modules/heros'
import { VideoPage } from './modules/videos'

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoutes roles={[UserRoles.USER, UserRoles.ADMIN]} />,
    children: [
      {
        path: '/',
        element: <CategoryListPage />,
      },
      {
        path: '/categories/:id',
        element: <CategorySinglePage />,
      },
      {
        path: '/hero/:id',
        element: <HeroPage />,
      },
      {
        path: '/video/:id',
        element: <VideoPage />,
      },
    ],
  },
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App

