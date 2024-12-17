import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'
import { VideosList } from '../../videos/components/VideosList'
import { CategoryCardUnstyled } from '../components/CategoryCardUnstyled'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getHero } from '../api/HeroAPI'

export const HeroPage: FC = () => {
  const { id } = useParams()

  const { data: hero } = useQuery({
    queryKey: ['hero', id],
    queryFn: () => getHero(id || ''),
    // enabled: false,
    // placeholderData: {
    //   data: {
    //     id: 3,
    //     name: 'Pudge',
    //     imageUrl: 'https://example.com/pudge.jpg',
    //     categoryId: 1,
    //   },
    // } as any,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    // enabled: false,
    // placeholderData: {
    //   data: [
    //     {
    //       id: 1,
    //       name: 'Strength',
    //       imageUrl: 'https://example.com/strength.jpg',
    //     },
    //     {
    //       id: 2,
    //       name: 'Agility',
    //       imageUrl: 'https://example.com/agility.jpg',
    //     },
    //     {
    //       id: 3,
    //       name: 'Intelligence',
    //       imageUrl: 'https://example.com/intelligence.jpg',
    //     },
    //   ],
    // } as any,
  })

  const category = categories?.data.find((i) => i.id === hero?.data.categoryId)

  if (!hero || !category) {
    return null
  }

  return (
    <Layout className="heroPage">
      <div className="heroInfo">
        <img src={hero.data.imageUrl} alt="" />
        <div className="heroInfoRight">
          <h3>{hero.data.name}</h3>
          <CategoryCardUnstyled className="heroInfoType" category={category} />
        </div>
      </div>

      <VideosList heroName={hero.data.name} />
    </Layout>
  )
}

