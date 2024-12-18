import { VideoPlayerContextValue } from '../context/VideoPlayerProvider'

const defaultCodecs: Record<string, string> = {
  'audio/ogg': 'vorbis',
  'audio/wav': '1',
  'video/webm': 'vp8, vorbis',
  'video/mp4': 'avc1.42E01E, mp4a.40.2',
  'video/ogg': 'theora',
}

export const checkCanPlay = (type?: string) => {
  if (!type || !defaultCodecs[type]) return false

  const video = document.createElement('video')
  const mimetype = `${type}; codecs="${defaultCodecs[type]}"`
  const playable = video.canPlayType(mimetype)

  if (playable !== '') return true

  return false
}

// Key events
export const keyDownHandler = (code: number, context: VideoPlayerContextValue) => {
  const { changePlay, video } = context
  if (!video.current) return
  const { duration, currentTime } = video.current
  let updated: number = 0

  switch (code) {
    case 32:
      // Space
      return changePlay()
    case 39:
      // ArrowRight
      updated = currentTime + 5
      if (currentTime > duration - 5) updated = duration

      return (video.current.currentTime = updated)
    case 37:
      // ArrowLeft
      updated = currentTime - 5
      if (currentTime < 5) updated = 0
      return (video.current.currentTime = updated)
    case 38:
      // ArrowUp
      updated = video.current.volume + 0.05
      if (updated > 1) updated = 1
      return (video.current.volume = updated)
    case 40:
      // ArrowDown
      updated = video.current.volume - 0.05
      if (updated < 0) updated = 0
      return (video.current.volume = updated)
  }
}
