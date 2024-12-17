export enum CategoryEnum {
  'POWER' = 'power',
  'AGILITY' = 'agility',
  'INTELLECT' = 'intellect',
  'UNIVERSAL' = 'universal',
}

export const categoryImages: Record<CategoryEnum, string> = {
  [CategoryEnum.POWER]: '/power.png',
  [CategoryEnum.AGILITY]: '/agility.png',
  [CategoryEnum.INTELLECT]: '/intellect.png',
  [CategoryEnum.UNIVERSAL]: '/universal.png',
}

