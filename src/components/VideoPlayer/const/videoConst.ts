export const VIDEO_MIME_TYPES = {
  mp4: 'video/mp4',
} as const

export type VIDEO_MIME_TYPES = (typeof VIDEO_MIME_TYPES)[keyof typeof VIDEO_MIME_TYPES]

