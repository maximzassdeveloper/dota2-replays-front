import { FC } from 'react'
import { Layout } from '../../../components/Layout'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/HeroAPI'
import { CategoryCard } from '../components/CategoryCard'

// export const cats: Category[] = [
//   {
//     id: 1,
//     name: 'Сила',
//     type: CategoryEnum.POWER,
//   },
//   {
//     id: 2,
//     name: 'Ловкость',
//     type: CategoryEnum.AGILITY,
//   },
//   {
//     id: 3,
//     name: 'Интеллект',
//     type: CategoryEnum.INTELLECT,
//   },
//   {
//     id: 4,
//     name: 'Универсальные',
//     type: CategoryEnum.UNIVERSAL,
//   },
// ]

export const CategoryListPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    // enabled: false,
    // placeholderData: {
    //   data: [
    //     {
    //       id: 1,
    //       name: 'Strength',
    //       imageUrl:
    //         'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Strength_attribute_symbol.png',
    //     },
    //     {
    //       id: 2,
    //       name: 'Agility',
    //       imageUrl:
    //         'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Agility_attribute_symbol.png',
    //     },
    //     {
    //       id: 3,
    //       name: 'Intelligence',
    //       imageUrl:
    //         'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/56/Intelligence_attribute_symbol.png',
    //     },
    //   ],
    // } as any,
  })

  return (
    <Layout className="categoryListPage">
      <div className="categoryList">
        {data?.data.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
      </div>
    </Layout>
  )
}

