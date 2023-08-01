import { User, Post } from '@/models'

export const checkDuplicateUsername = async (username: string) => {
  const user = await User.findOne({ username })
  if (user) throw new Error('Username already exists')
}

export const checkDuplicateEmail = async (email: string) => {
  const user = await User.findOne({ email })
  if (user) throw new Error('Email already exists')
}
