import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Video } from '../../types/videos'
import s from './VideoCard.module.css'
import { Trash2 } from 'lucide-react'
import { useAuthStore } from '../../../auth/store/authStore'
import { UserRoles } from '../../../auth/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteVideo } from '../../api/VideosAPI'
import { VIDEOS_QUERY_KEY } from '../VideosList'

interface VideoCardProps {
  video: Video
}

export const VideoCard: FC<VideoCardProps> = (props) => {
  const { video } = props
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteVideo(video.id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [VIDEOS_QUERY_KEY] })
    },
  })

  const deleteHandler = () => {
    deleteMutation.mutate()
  }

  return (
    <div key={video.id} className={s.videoCard}>
      <div className={s.videoCardImage}>
        <img width={300} height={180} src={video.imageUrl} alt="" />
      </div>
      <div className={s.videoCardBottom}>
        <span className={s.videoCardTitle}>{video.name}</span>
        {/* <span className="videoCardDuration">{video.duration}</span> */}
      </div>

      <Link to={`/video/${video.id}`} />

      {user?.role === UserRoles.ADMIN ? (
        <button className={s.deleteBtn} onClick={deleteHandler}>
          <Trash2 />
        </button>
      ) : null}
    </div>
  )
}

