import { FC } from 'react'

import s from './PlayButton.module.css'
import { Pause, Play } from 'lucide-react'
import { useVideoPlayerStore } from '../../store/videoPlayerStore'
import clsx from 'clsx'

interface PlayButtonProps {
  center?: boolean
}

export const PlayButton: FC<PlayButtonProps> = ({ center }) => {
  const isPlay = useVideoPlayerStore((state) => state.isPlay)
  const setIsPlay = useVideoPlayerStore((state) => state.setIsPlay)

  const classes = clsx(s.playButton, {
    [s.center]: center,
  })

  return (
    <div className={classes} onClick={() => setIsPlay(!isPlay)}>
      {isPlay ? <Pause /> : <Play />}
    </div>
  )
}
