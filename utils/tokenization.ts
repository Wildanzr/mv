import jwt from 'jsonwebtoken'
import ClientError from './error'

const SECRET = process.env.SECRET || 'secret'
const HOST_URL = process.env.HOST_URL || 'http://localhost:3000'

export const signToken = (user: User) => {
  return jwt.sign({ _id: user._id }, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
    subject: user.username,
    issuer: HOST_URL,
  })
}

export const verifyToken = (token: string) => {
  token = token.replace('Bearer ', '')
  try {
    return jwt.verify(token, SECRET, {
      algorithms: ['HS256'],
      issuer: HOST_URL,
    })
  } catch (error: any) {
    const message = error.message || 'Invalid token'
    throw new ClientError(message, 401)
  }
}
