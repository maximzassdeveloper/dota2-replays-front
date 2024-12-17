import { ReactNode, createContext, useContext, useMemo } from 'react'
import { createVideoPlayerStore } from './videoPlayerStore'

const VideoPlayerContext = createContext({} as ReturnType<typeof createVideoPlayerStore>)

export const useVideoPlayerContext = () => useContext(VideoPlayerContext)

export const VideoPlayerProvider = ({ children }: { children: ReactNode }) => {
  const store = useMemo(() => createVideoPlayerStore(), [])

  return <VideoPlayerContext.Provider value={store}>{children}</VideoPlayerContext.Provider>
}

