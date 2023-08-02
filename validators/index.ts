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

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  username: Joi.string().min(1).max(20).alphanum().required(),
  email: Joi.string().email().required(),
  photo: Joi.string().uri().required(),
})

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).max(50).required(),
  newPassword: Joi.string().min(8).max(50).required(),
  confirmNewPassword: Joi.required().valid(Joi.ref('newPassword')),
})

export const createPostSchema = Joi.object({
  image: Joi.string().uri().required(),
  caption: Joi.string().min(1).max(1000).required(),
  tags: Joi.string().min(2).max(500).required(),
})

export const updatePostSchema = Joi.object({
  image: Joi.string().uri().required(),
  caption: Joi.string().min(1).max(1000).required(),
  tags: Joi.string().min(2).max(500).required(),
})

export const postQuerySchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).max(200).required(),
  searchBy: Joi.string().valid('caption', 'tags').required(),
  search: Joi.string().min(1).max(100).required(),
})
