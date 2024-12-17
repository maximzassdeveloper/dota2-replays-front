export interface Category {
  id: number
  name: string
  imageUrl: string
}

export interface Hero {
  id: number
  name: string
  imageUrl: string
  categoryId: number
}

