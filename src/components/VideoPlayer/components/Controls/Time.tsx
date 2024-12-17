import { FC } from 'react'
import { convertTime } from '../../utils/convertTime'
import { useVideoPlayerStore } from '../../store/videoPlayerStore'
import s from './Controls.module.css'

export const Time: FC = () => {
  const currentTime = useVideoPlayerStore((state) => state.currentTime)
  const duration = useVideoPlayerStore((state) => state.duration)

  return (
    <span className={s.time}>
      {convertTime(currentTime)} / {convertTime(duration)}
    </span>
  )
}
