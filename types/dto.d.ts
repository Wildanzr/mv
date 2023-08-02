// types dto.d.ts

export {}

declare global {
  interface User {
    _id?: number
    name: string
    username: string
    email: string
    password: string
    photo: string
    createdAt?: Date
    updatedAt?: Date
  }
  interface GetUserDTO {
    name: string
    username: string
    email: string
    photo: string
    createdAt: string
    updatedAt: string
  }
  interface CreateUserDTO {
    name: string
    username: string
    email: string
    photo: string
  }
  interface JwtDTO {
    _id: number
    iat: number
    exp: number
    iss: string
    sub: string
  }
  interface RegisterDTO {
    name: string
    username: string
    email: string
    password: string
    photo: string
  }
  interface UpdateUserDTO {
    name: string
    username: string
    email: string
    photo: string
  }
  interface ChangePasswordDTO {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
  }
}
