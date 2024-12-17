import { FC, useCallback, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow'
import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { Slider } from '../../../common/Slider'
import { useVideoPlayerStore } from '../../../store/videoPlayerStore'
import { useEvent } from '../../../../../hooks/useEvent'
import s from './Volume.module.css'

const VOLUME_CHANGE_DISTANCE = 0.1

export const Volume: FC = () => {
  const { videoRef, volume, setVolume } = useVideoPlayerStore(
    useShallow((state) => ({
      videoRef: state.videoRef,
      volume: state.volume,
      setVolume: state.setVolume,
    })),
  )

  const oldVolume = useRef(0)

  const muteHandler = () => {
    if (!videoRef.current) return

    if (volume === 0) {
      setVolume(oldVolume.current)
    } else {
      oldVolume.current = volume
      setVolume(0)
    }
  }

  const sliderChangeHandler = (val: number) => {
    setVolume(val / 100)
  }

  const volumeChangeListener = useEvent(() => {
    setVolume(videoRef.current?.volume || 0, false)
  })

  useEffect(() => {
    const video = videoRef.current

    video?.addEventListener('volumechange', volumeChangeListener)
    return () => {
      video?.removeEventListener('volumechange', volumeChangeListener)
    }
  }, [volumeChangeListener, videoRef])

  const keyDownHandler = useEvent((e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
        setVolume(Math.min(volume + VOLUME_CHANGE_DISTANCE, 1))
        break
      case 'ArrowDown':
        if (volume > 0) {
          setVolume(Math.max(volume - VOLUME_CHANGE_DISTANCE, 0))
        }
        break
      case 'KeyM':
        muteHandler()
        break
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [keyDownHandler])

  const renderIcon = useCallback(() => {
    if (volume > 0.5) return <Volume2 />
    else if (volume > 0) return <Volume1 />
    else return <VolumeX />
  }, [volume])

  return (
    <div className={s.volume}>
      <div className={s.icon} onClick={muteHandler}>
        {renderIcon()}
      </div>

      <Slider
        value={volume * 100}
        showLabel={false}
        labelText={Math.round(volume * 100)}
        onChange={sliderChangeHandler}
      />
    </div>
  )
}
