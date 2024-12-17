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

  return (
    <Layout className="categoryListPage">
      <div className="categoryList">
        {data?.data.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
      </div>
    </Layout>
  )
}

