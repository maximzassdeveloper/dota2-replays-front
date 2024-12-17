import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../types/heroes'

interface CategoryCardUnstyledProps {
  category: Category
  className?: string
  withLink?: boolean
}

export const CategoryCardUnstyled: FC<CategoryCardUnstyledProps> = (props) => {
  const { category, className, withLink } = props

  return (
    <div className={className}>
      <img src={category.imageUrl} alt="" />
      <span>{category.name}</span>
      {withLink ? <Link to={`/category/${category.id}`} /> : null}
    </div>
  )
}

