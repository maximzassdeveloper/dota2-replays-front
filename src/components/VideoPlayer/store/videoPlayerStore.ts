import { createRef, type RefObject } from 'react'
import { create, useStore } from 'zustand'
import type { VideoSource } from '../types'
import { useVideoPlayerContext } from './videoPlayerContext'

interface VideoPlayerStore {
  videoRef: RefObject<HTMLVideoElement>
  playerRef: RefObject<HTMLDivElement>
  isPlay: boolean
  setIsPlay: (val: boolean) => void
  sources: VideoSource[]
  setSources: (val: VideoSource[]) => void
  duration: number
  setDuration: (val: number) => void
  src: string
  setSrc: (val: string) => void
  isLoading: boolean
  setIsLoading: (val: boolean) => void
  volume: number
  setVolume: (val: number, withVideo?: boolean) => void
  currentTime: number
  setCurrentTime: (val: number, withVideo?: boolean) => void
  playbackRate: number
  setPlaybackRate: (val: number) => void

  initVideo: () => void
  setCurrentSource: (source: VideoSource) => void
}

export const createVideoPlayerStore = () => {
  return create<VideoPlayerStore>((set) => ({
    videoRef: createRef<HTMLVideoElement>(),
    playerRef: createRef<HTMLDivElement>(),

    sources: [],
    setSources: (sources) => set(() => ({ sources })),
    duration: 0,
    setDuration: (duration) => set(() => ({ duration })),
    src: '',
    setSrc: (src) => set(() => ({ src })),
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),

    volume: 0,
    setVolume: (volume, withVideo = true) =>
      set((state) => {
        const video = state.videoRef?.current
        if (!video) return { volume }

        if (withVideo) {
          video.volume = volume
        }

        return { volume }
      }),

    currentTime: 0,
    setCurrentTime: (currentTime, withVideo = true) =>
      set((state) => {
        const video = state.videoRef?.current
        if (!video) return { currentTime }

        if (withVideo) {
          video.currentTime = currentTime
        }

        return { currentTime }
      }),

    playbackRate: 1,
    setPlaybackRate: (playbackRate, withVideo = true) =>
      set((state) => {
        const video = state.videoRef?.current
        if (!video) return { playbackRate }

        if (withVideo) {
          video.playbackRate = playbackRate
        }

        return { playbackRate }
      }),

    isPlay: false,
    setIsPlay: (isPlay) =>
      set((state) => {
        const video = state.videoRef?.current
        if (!video) return { isPlay }

        if (isPlay) {
          video.play()
        } else {
          video.pause()
        }

        return { isPlay }
      }),

    initVideo: () =>
      set((state) => {
        state.setVolume(0)
        state.setIsPlay(true)

        return state
      }),

    setCurrentSource: (source) =>
      set((state) => {
        const video = state.videoRef?.current
        if (!video) return state

        const oldCurrentTime = state.currentTime
        const oldVolume = state.volume
        const oldPlaybackRate = state.playbackRate

        setTimeout(() => {
          state.setCurrentTime(oldCurrentTime)
          state.setVolume(oldVolume)
          state.setPlaybackRate(oldPlaybackRate)
        }, 200)

        return { src: source.url }
      }),
  }))
}

export const useVideoPlayerStore = <T>(selector: (state: VideoPlayerStore) => T) => {
  const store = useVideoPlayerContext()
  const slice = useStore(store, selector)

  return slice
}

