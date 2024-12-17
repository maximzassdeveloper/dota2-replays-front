import type { VIDEO_MIME_TYPES } from './const/videoConst'

export interface VideoSource {
  url: string
  type: VIDEO_MIME_TYPES
  size: number
}
