import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'
import { VideoPlayer } from '../../../components/VideoPlayer'
import { useQuery } from '@tanstack/react-query'
import { getVideo, getVideoHls } from '../api/VideosAPI'

export const VideoPage: FC = () => {
  const { id } = useParams()

  const { data: video } = useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideo(id || ''),
    // enabled: false,
    // placeholderData: {
    //   data: {
    //     id: 1,
    //     name: 'Axe Gameplay Guide',
    //     imageUrl: 'https://example.com/axe_video.jpg',
    //     heroId: 1,
    //   },
    // } as any,
  })

  const { data: videoHls } = useQuery({
    queryKey: ['videoHls', video?.data.id],
    queryFn: () => getVideoHls(id || ''),
    enabled: !!video?.data.id,
    // enabled: false,
    // placeholderData: {
    //   data: '/hls-video/output.m3u8',
    // } as any,
  })

  if (!videoHls?.data || !video?.data) {
    return null
  }

  return (
    <Layout className="videoPage">
      <Link className="selectCategory" to="/">
        Выбрать категорию
      </Link>
      <VideoPlayer hlsFile={videoHls?.data} title={video?.data.name} />
    </Layout>
  )
}

