import { useQuery } from '@tanstack/react-query'
import { type FC } from 'react'
import { getVideos } from '../../api/VideosAPI'
import { VideoCard } from '../VideoCard/VideoCard'

interface VideosListProps {
  heroName: string
}

// const VIDEOS_PER_PAGE = 10
export const VIDEOS_QUERY_KEY = 'getVideos'

export const VideosList: FC<VideosListProps> = (props) => {
  const { heroName } = props

  // const [page, setPage] = useState(1)

  const getVideosQuery = useQuery({
    queryKey: [VIDEOS_QUERY_KEY, { heroName }],
    queryFn: () => getVideos({ hero: heroName }),
    // enabled: false,
    // placeholderData: {
    //   data: {
    //     content: [
    //       {
    //         id: 1,
    //         title: 'cow.mp4',
    //         description: 'Это видео о корове',
    //         category: null,
    //         thumbnailUrl: 'https://goo.su/O0wyP',
    //         hlsLink: null,
    //       },
    //       {
    //         id: 3,
    //         title: 'Lies of P 2024.12.03 - 01.11.15.02.DVR.mp4',
    //         description: 'Описание видео Lies of P',
    //         category: null,
    //         thumbnailUrl: 'https://goo.su/O0wyP',
    //         hlsLink: null,
    //       },
    //     ],
    //     pageable: {
    //       pageNumber: 0,
    //       pageSize: 10,
    //       sort: {
    //         empty: false,
    //         sorted: true,
    //         unsorted: false,
    //       },
    //       offset: 0,
    //       paged: true,
    //       unpaged: false,
    //     },
    //     last: true,
    //     totalPages: 2,
    //     totalElements: 2,
    //     size: 10,
    //     number: 0,
    //     sort: {
    //       empty: false,
    //       sorted: true,
    //       unsorted: false,
    //     },
    //     first: true,
    //     numberOfElements: 2,
    //     empty: false,
    //   },
    // } as any,
  })
  const videos = getVideosQuery.data?.data || []

  return (
    <div>
      <div className="videosList">
        {getVideosQuery.isLoading ? (
          <p>Загрузка...</p>
        ) : !videos?.length ? (
          <p>Результатов нет</p>
        ) : (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        )}
      </div>

      {/* <Pagination page={page} onChange={setPage} total={results?.totalPages || 1} /> */}
    </div>
  )
}

