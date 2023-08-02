import ClientError from '@/utils/error'
import Joi from 'joi'

export const validatePayload = (payload: any, schema: Joi.Schema<any>) => {
  const { error } = schema.validate(payload)
  if (error) throw new ClientError(error.message, 400)
}

export const registerSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  username: Joi.string().min(1).max(20).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(50).required(),
  photo: Joi.string().uri().required(),
})

export const loginSchema = Joi.object({
  username: Joi.string().min(1).max(20).alphanum().required(),
  password: Joi.string().min(8).max(50).required(),
})
