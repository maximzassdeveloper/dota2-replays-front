import {
  type FC,
  type ReactEventHandler,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from 'react'
import Hls from 'hls.js'
import type { VideoSource } from './types'
import { checkCanPlay } from './utils/videoPlayerHelpers'
import { Controls } from './components/Controls'
import s from './VideoPlayer.module.css'
import { ProgressBar } from './components/ProgressBar/ProgressBar'
import { useVideoPlayerStore } from './store/videoPlayerStore'
import { PlayerHeader } from './components/PlayerHeader/PlayerHeader'
import { PlayerLoader } from './components/PlayerLoader/PlayerLoader'
import { useShallow } from 'zustand/shallow'
import { VideoPlayerProvider } from './store/videoPlayerContext'
import { VideoPlayerKeyHandler } from './components/VideoPlayerKeyHandler'
import { AUTH_TOKEN_KEY } from '../../modules/auth'

export interface VideoPlayerProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  sources?: VideoSource[]
  title?: string
  hlsFile: string
}

const INTERACTION_TIME = 2_000

export const VideoPlayerInner: FC<VideoPlayerProps> = (props) => {
  const {
    sources,
    width = 900,
    height = 500,
    // poster,
    hlsFile,
    title,
    onSeeking,
    onSeeked,
    onPlay,
    onPause,
    onLoadedMetadata,

    onEnded,
    onDurationChange,
    ...rest
  } = props

  const { initVideo, setCurrentSource, setSources, ...playerStore } = useVideoPlayerStore(
    useShallow((state) => ({
      initVideo: state.initVideo,
      setCurrentSource: state.setCurrentSource,
      setDuration: state.setDuration,
      setIsLoading: state.setIsLoading,
      setIsPlay: state.setIsPlay,
      setSources: state.setSources,
      isPlay: state.isPlay,
      videoRef: state.videoRef,
      playerRef: state.playerRef,
      src: state.src,
    })),
  )

  const [isShow, setIsShow] = useState(false)
  const interactionTimeout = useRef<NodeJS.Timeout>()

  /* ----------------------- Events ----------------------- */
  const changeDurationHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    playerStore.setDuration(Math.floor(playerStore.videoRef?.current?.duration ?? 0))
    onDurationChange?.(e)
  }

  const seekingHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    playerStore.setIsLoading(true)
    onSeeking?.(e)
  }

  const seekedHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    playerStore.setIsLoading(false)
    onSeeked?.(e)
  }

  const playHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    playerStore.setIsPlay(true)
    onPlay?.(e)
  }

  const pauseHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    playerStore.setIsPlay(false)
    onPause?.(e)
  }

  const endedHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    playerStore.setIsPlay(false)
    onEnded?.(e)
  }

  const loadedMetadataHandler: ReactEventHandler<HTMLVideoElement> = (e) => {
    initVideo()
    onLoadedMetadata?.(e)
  }

  /* ----------------------- HLS ----------------------- */
  useEffect(() => {
    const video = playerStore.videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem(AUTH_TOKEN_KEY) || '')
        },
      })

      hls.loadSource(hlsFile)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS манифест загружен, воспроизведение готово.')
        video.play()
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('Произошла ошибка HLS:', data)
      })

      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Для браузеров с поддержкой встроенного HLS (например, Safari)
      video.src = hlsFile
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    } else {
      console.error('HLS не поддерживается в этом браузере.')
    }
  }, [playerStore.videoRef, hlsFile])

  /* ----------------------- Logic ----------------------- */
  // useEffect(() => {
  //   setSources(sources)

  //   for (const source of sources) {
  //     if (checkCanPlay(source.type)) {
  //       setCurrentSource(source)
  //       break
  //     }
  //   }
  // }, [sources, setSources, setCurrentSource])

  useEffect(() => {
    if (isShow) {
      clearTimeout(interactionTimeout.current)
      interactionTimeout.current = setTimeout(() => {
        setIsShow(false)
      }, INTERACTION_TIME)
    }
  }, [isShow])

  useEffect(() => {
    if (!playerStore.isPlay) {
      setIsShow(true)
    }
  }, [playerStore.isPlay])

  const mouseMoveHandler = () => {
    setIsShow(true)
    clearTimeout(interactionTimeout.current)
    interactionTimeout.current = setTimeout(() => {
      setIsShow(false)
    }, INTERACTION_TIME)
  }

  const clickHandler = () => {
    playerStore.setIsPlay(!playerStore.isPlay)
  }

  useEffect(() => {
    return () => {
      clearTimeout(interactionTimeout.current)
    }
  }, [])

  /* ----------------------- JSX ----------------------- */
  return (
    <div className={s.player} ref={playerStore.playerRef} onMouseMove={mouseMoveHandler}>
      <video
        className={s.video}
        ref={playerStore.videoRef}
        // src={playerStore.src}
        onSeeking={seekingHandler}
        onSeeked={seekedHandler}
        onPlay={playHandler}
        onPause={pauseHandler}
        onEnded={endedHandler}
        onLoadedMetadata={loadedMetadataHandler}
        onDurationChange={changeDurationHandler}
        width={width}
        height={height}
        onClick={clickHandler}
        {...rest}
      >
        {/* {sources.map((source, index) => (
          <source
            key={source.url + index}
            src={source.url}
            type={source.type}
            data-size={source.size}
          />
        ))} */}
      </video>

      <VideoPlayerKeyHandler />
      <PlayerLoader />
      {/* <PlayButton center /> */}

      <div style={{ opacity: isShow ? '1' : '0', transition: 'opacity .2s' }}>
        {title ? <PlayerHeader title={title} /> : null}
        <div className={s.footer}>
          <ProgressBar />
          <Controls />
        </div>
      </div>
    </div>
  )
}

export const VideoPlayer: FC<VideoPlayerProps> = (props) => (
  <VideoPlayerProvider>
    <VideoPlayerInner {...props} />
  </VideoPlayerProvider>
)

