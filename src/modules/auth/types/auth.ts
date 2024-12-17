export enum UserRoles {
  'ADMIN' = 'admin',
  'GUEST' = 'guest',
  'USER' = 'user',
}

export interface User {
  id: number
  username: string
  password: string
  role: UserRoles
}

