import { ReactNode, type FC } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children, className } = props

  return (
    <div className="page">
      <Header />

      <div className="wrapper">
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}

