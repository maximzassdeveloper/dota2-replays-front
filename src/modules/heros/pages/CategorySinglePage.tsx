import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Layout } from '../../../components/Layout'

import { useQuery } from '@tanstack/react-query'
import { getCategories, getHeroes } from '../api/HeroAPI'
import { CategoryCardUnstyled } from '../components/CategoryCardUnstyled'

export const CategorySinglePage: FC = () => {
  const { id } = useParams<{ id: string }>()

  // const getHeroestList = () => {
  //   switch (type) {
  //     case CategoryEnum.POWER:
  //       return powerHeroes
  //     case CategoryEnum.AGILITY:
  //       return agilityHeroes
  //     case CategoryEnum.INTELLECT:
  //       return intellectHeroes
  //     case CategoryEnum.UNIVERSAL:
  //       return universalHeroes
  //     default:
  //       return []
  //   }
  // }

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

  const { data: heroes } = useQuery({
    queryKey: ['heroes', id],
    queryFn: () => getHeroes(id || ''),
    // enabled: false,
    // placeholderData: {
    //   data: [
    //     {
    //       id: 1,
    //       name: 'Axe',
    //       imageUrl:
    //         'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a1/Queen_of_Pain_icon.png',
    //       categoryId: 1,
    //     },
    //     {
    //       id: 2,
    //       name: 'Earthshaker',
    //       imageUrl: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2f/Jakiro_icon.png',
    //       categoryId: 1,
    //     },
    //     {
    //       id: 3,
    //       name: 'Pudge',
    //       imageUrl: 'https://example.com/pudge.jpg',
    //       categoryId: 1,
    //     },
    //   ],
    // } as any,
  })

  const category = categories?.data.find((i) => String(i.id) === id)

  if (!id || !category) {
    return null
  }

  return (
    <Layout className="categorySinglePage">
      <CategoryCardUnstyled className="categoryAsTitle" category={category} />

      <div className="heroesList">
        {heroes?.data.map((hero) => (
          <div key={hero.id} className="heroCard">
            <img src={hero.imageUrl} alt="" />
            <span>{hero.name}</span>
            <Link to={`/hero/${hero.id}`} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

