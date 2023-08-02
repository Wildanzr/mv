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
  interface DetailUser {
    name: string
    username: string
    email: string
    photo: string
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
  interface Post {
    _id?: number
    userId: number
    caption: string
    tags: string
    likes: number
    image: string
    createdAt?: Date
    updatedAt?: Date
  }
  interface CreatePostDTO {
    image: string
    caption: string
    tags: string
  }
  interface UpdatePostDTO {
    image: string
    caption: string
    tags: string
  }
  interface PostWithUser {
    _id: number
    image: string
    caption: string
    tags: string
    likes: number
    createdAt: Date
    updatedAt: Date
    userId: DetailUser
  }
  interface PostParams {
    params: {
      id: number
    }
  }
  interface PostQuery {
    page: number
    limit: number
    searchBy: 'caption' | 'tags'
    search: string
  }

  interface PostList {
    posts: PostWithUser[]
    total: number
  }

  interface PostListDTO {
    id: number
    image: string
    caption: string
    tags: string
    likes: number
    createdAt: Date
    updatedAt: Date
    user: {
      name: string
      username: string
      email: string
      photo: string
    }
  }
}
