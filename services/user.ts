import { User } from '@/models'
import { comparePassword, hashPassword } from '@/utils/hash'

export const checkDuplicateUsername = async (username: string) => {
  const user = await User.findOne({ username })
  if (user) throw new Error('Username already exists')
}

export const checkDuplicateEmail = async (email: string) => {
  const user = await User.findOne({ email })
  if (user) throw new Error('Email already exists')
}

export const createUser = async (user: User) => {
  const hashedPassword = await hashPassword(user.password)
  user.password = hashedPassword
  await User.create({
    _id: 0,
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    photo: user.photo,
  })

  return {
    name: user.name,
    username: user.username,
    email: user.email,
    photo: user.photo,
  }
}

export const checkLoginCredentials = async (
  username: string,
  password: string
): Promise<User> => {
  const user = await User.findOne({ username })
  if (!user) throw new Error('Invalid username or password')

  const isPasswordMatch = await comparePassword(password, user.password)
  if (!isPasswordMatch) throw new Error('Invalid username or password')

  return {
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    photo: user.photo,
  }
}
