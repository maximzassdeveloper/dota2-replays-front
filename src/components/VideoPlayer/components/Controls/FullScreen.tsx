import { FC, useEffect, useState } from 'react'
import { Maximize, Minimize } from 'lucide-react'
import { useVideoPlayerStore } from '../../store/videoPlayerStore'
import { useEvent } from '../../../../hooks/useEvent'

export const FullScreen: FC = () => {
  const playerRef = useVideoPlayerStore((state) => state.playerRef)
  const [isFull, setIsFull] = useState(false)

  const toggleFullScreen = () => {
    const video = playerRef.current
    if (!video) return

    if (isFull) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    } else {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      }
    }
    setIsFull(!isFull)
  }

  useEffect(() => {
    const player = playerRef.current

    function onChangeFullScreen() {
      if (document.fullscreenElement?.isEqualNode(playerRef.current)) {
        setIsFull(true)
      } else {
        setIsFull(false)
      }
    }

    player?.addEventListener('fullscreenchange', onChangeFullScreen)
  }, [playerRef])

  const keyDownHandler = useEvent((e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyF':
        toggleFullScreen()
        break
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [keyDownHandler])

  return (
    <div style={{ cursor: 'pointer' }} onClick={toggleFullScreen}>
      {!isFull ? <Maximize /> : <Minimize />}
    </div>
  )
}
