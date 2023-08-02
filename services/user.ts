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

export const updateUserProfile = async (
  _id: number,
  user: UpdateUserDTO
): Promise<GetUserDTO> => {
  const willUpdateUser = await User.findByIdAndUpdate(_id, {
    username: user.username,
    email: user.email,
    name: user.name,
    photo: user.photo,
    updatedAt: Date.now(),
  })

  if (!willUpdateUser) throw new ClientError('Failed to update user', 500)

  return await getUserById(_id)
}

export const checkNewUsernameAndEmail = async (
  _id: number,
  username: string,
  email: string
) => {
  // find user with username or email same but not with the same id
  const user = await User.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: _id },
  })
  if (user) {
    if (user.username === username)
      throw new ClientError('Username already taken', 400)

    if (user.email === email) throw new ClientError('Email already taken', 400)
  }
}
