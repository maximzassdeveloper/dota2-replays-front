import { FC, useEffect } from 'react'
import { useEvent } from '../../../hooks/useEvent'
import { useVideoPlayerStore } from '../store/videoPlayerStore'

const TIME_REWIND = 5

export const VideoPlayerKeyHandler: FC = () => {
  const playerStore = useVideoPlayerStore((state) => state)

  const keyDownHandler = useEvent((e: KeyboardEvent) => {
    switch (e.code) {
      case 'Space':
        playerStore.setIsPlay(!playerStore.isPlay)
        break
      case 'ArrowRight':
        if (playerStore.currentTime < playerStore.duration) {
          playerStore.setCurrentTime(playerStore.currentTime + TIME_REWIND)
        }
        break
      case 'ArrowLeft':
        if (playerStore.currentTime > 0) {
          playerStore.setCurrentTime(playerStore.currentTime - TIME_REWIND)
        }
        break
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [keyDownHandler])

  return <></>
}

