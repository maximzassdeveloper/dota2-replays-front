import { FC } from 'react'
import { FullScreen, PlayerSettings, Time, Volume } from '.'
import { PlayButton } from '../PlayButton/PlayButton'
import s from './Controls.module.css'

export const Controls: FC = () => {
  return (
    <div className={s.controlsBottom}>
      <div className={s.col}>
        <PlayButton />
        <Time />
        <Volume />
      </div>
      <div className={`${s.col} ${s.colSecond}`}>
        <PlayerSettings />
        <FullScreen />
      </div>
    </div>
  )
}
