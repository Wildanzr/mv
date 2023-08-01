// global.d.ts

export {}

declare global {
  interface ChildrenProps {
    children: React.ReactNode
  }
  interface User {
    _id?: number
    name: string
    username: string
    email: string
    password: string
    photo: string
  }
}
