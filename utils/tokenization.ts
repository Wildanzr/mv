import jwt from 'jsonwebtoken'
import { formatErrorResponse } from './response'

const SECRET = process.env.SECRET || 'secret'

export const signToken = (user: User) => {
  return jwt.sign({ username: user.username }, SECRET, {
    expiresIn: '15m',
  })
}

export const verifyToken = (token: string) => {
  token = token.replace('Bearer ', '')
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return formatErrorResponse(error as Error, 401)
  }
}
