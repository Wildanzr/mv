import Joi from 'joi'

export const registerSchema = Joi.object({
  name: Joi.string().min(1).max(100).alphanum().required(),
  username: Joi.string().min(1).max(20).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(50).required(),
  photo: Joi.string().uri().required(),
})
