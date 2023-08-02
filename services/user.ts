import { User } from '@/models'
import ClientError from '@/utils/error'
import { comparePassword, hashPassword } from '@/utils/hash'

export const checkDuplicateUsername = async (username: string) => {
  const user = await User.findOne({ username })
  if (user) throw new ClientError('Username already exists', 400)
}

export const checkDuplicateEmail = async (email: string) => {
  const user = await User.findOne({ email })
  if (user) throw new ClientError('Email already exists', 400)
}

export const createUser = async (user: User): Promise<CreateUserDTO> => {
  const hashedPassword = await hashPassword(user.password)
  user.password = hashedPassword
  const newUser = new User({ _id: 0, ...user })
  await newUser.save()
  if (!newUser) throw new ClientError('Failed to create user', 500)
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
  if (!user) throw new ClientError('Invalid username or password', 401)

  const isPasswordMatch = await comparePassword(password, user.password)
  if (!isPasswordMatch)
    throw new ClientError('Invalid username or password', 401)

  return user
}

export const getUserById = async (id: number): Promise<GetUserDTO> => {
  const user = User.findById(id).select(
    'name username email photo createdAt updatedAt'
  )
  if (!user) throw new ClientError('User not found', 404)
  return user
}
