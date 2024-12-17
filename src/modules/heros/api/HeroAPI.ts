import baseApi from '../../../services/api'
import { Category, Hero } from '../types/heroes'

export type GetCategoriesResponse = Category[]

export const getCategories = () => {
  return baseApi.get<GetCategoriesResponse>('/category')
}

export type GetHeroesResponse = Hero[]

export const getHeroes = (categoryId: string) => {
  return baseApi.get<GetHeroesResponse>('/hero', { params: { category: categoryId } })
}

export type GetHeroResponse = Hero

export const getHero = (heroId: number | string) => {
  return baseApi.get<GetHeroResponse>(`/hero/${heroId}`)
}

