import { type FC } from 'react'
import s from './PlayerLoader.module.css'
import clsx from 'clsx'
import { useVideoPlayerStore } from '../../store/videoPlayerStore'

export const PlayerLoader: FC = () => {
  const isLoading = useVideoPlayerStore((state) => state.isLoading)

  return isLoading ? <span className={clsx(s.loader)} /> : <></>
}

