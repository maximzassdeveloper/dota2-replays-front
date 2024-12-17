import { FC, useState, useRef, useEffect } from 'react'
import { Slider } from '../../common/Slider'
import s from './ProgressBar.module.css'
import { useVideoPlayerStore } from '../../store/videoPlayerStore'
import { useShallow } from 'zustand/shallow'
import { useEvent } from '../../../../hooks/useEvent'

export const ProgressBar: FC = () => {
  const { videoRef, isPlay, duration, currentTime, setCurrentTime, setIsPlay } =
    useVideoPlayerStore(
      useShallow((state) => ({
        videoRef: state.videoRef,
        duration: state.duration,
        isPlay: state.isPlay,
        currentTime: state.currentTime,
        setCurrentTime: state.setCurrentTime,
        setIsPlay: state.setIsPlay,
      })),
    )

  const sliderRef = useRef<HTMLDivElement>(null)
  const [bufferedPercents, setBufferedPercents] = useState(0)
  const isLocalIsPlay = useRef(false)

  const sliderChangeHandler = (val: number) => {
    setCurrentTime(val)
  }

  const sliderMouseDownHandler = () => {
    isLocalIsPlay.current = isPlay ? true : false
    setIsPlay(false)
  }

  const sliderMouseUpHandler = () => {
    if (isLocalIsPlay.current) {
      setIsPlay(true)
    }
  }

  const onTimeUpdate = useEvent(() => {
    if (!videoRef.current) return
    setCurrentTime(Math.floor(videoRef.current?.currentTime || 0), false)
  })

  const onProgress = useEvent(() => {
    if (!videoRef.current) return
    if (videoRef.current.buffered.length <= 0) return

    setBufferedPercents((videoRef.current.buffered.end(0) / duration) * 100)
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('progress', onProgress)

    return () => {
      video?.removeEventListener('timeupdate', onTimeUpdate)
      video?.removeEventListener('progress', onProgress)
    }
  }, [onTimeUpdate, onProgress, videoRef])

  return (
    <div className={s.bar}>
      {/* <PreviewThumb video={video} slider={sliderRef} duration={duration} /> */}

      <Slider
        ref={sliderRef}
        value={currentTime}
        max={duration}
        min={0}
        showLabel={false}
        onChange={sliderChangeHandler}
        onMouseDown={sliderMouseDownHandler}
        onMouseUp={sliderMouseUpHandler}
        addonAfter={<div className={s.buffered} style={{ width: `${bufferedPercents}%` }} />}
      />
    </div>
  )
}
