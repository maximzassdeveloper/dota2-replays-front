export enum UserRoles {
  'ADMIN' = 'ROLE_ADMIN',
  'GUEST' = 'ROLE_GUEST',
  'USER' = 'ROLE_USER',
}

export interface User {
  id: number
  username: string
  password: string
  role: UserRoles
}

