import { type FC } from 'react'

import { Link } from 'react-router-dom'
import { Category } from '../types/heroes'

interface CategoryCardProps {
  category: Category
}

export const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { category } = props

  return (
    <div className="categoryCard">
      <img src={category.imageUrl} alt="" />
      <h3>{category.name}</h3>
      <Link to={`/categories/${category.id}`} />
    </div>
  )
}

