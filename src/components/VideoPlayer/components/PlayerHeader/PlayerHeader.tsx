import { type FC } from 'react'
import s from './PlayerHeader.module.css'

interface PlayerHeaderProps {
  title: string
}

export const PlayerHeader: FC<PlayerHeaderProps> = (props) => {
  const { title } = props

  return (
    <div className={s.header}>
      <span className={s.headerTitle}>{title}</span>
    </div>
  )
}

