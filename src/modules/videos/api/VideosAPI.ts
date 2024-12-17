import baseApi from '../../../services/api'
import { PaginatedResponse } from '../../../types'
import { Video } from '../types/videos'

export interface GetVideosQueryParams {
  hero: string
  page?: number
  size?: number
  sortBy?: string
}

export type GetVideosResponse = PaginatedResponse<Video>

export const getVideos = (params: GetVideosQueryParams) => {
  return baseApi.get<GetVideosResponse>('/video', { params })
}

export interface DeleteVideosQueryParams {}

export const deleteVideo = (videoId: number | string) => {
  return baseApi.delete<DeleteVideosQueryParams>(`/video/${videoId}`)
}

export type GetVideoResponse = Video

export const getVideo = (videoId: number | string) => {
  return baseApi.get<GetVideoResponse>(`/video/${videoId}`)
}

export type GetVideoHLSResponse = string

export const getVideoHls = (videoId: number | string) => {
  return baseApi.get<GetVideoHLSResponse>(`/video/stream/${videoId}`)
}

