import { registerSchema, loginSchema } from './schema'

export const validateRegister = (payload: any) => {
  const { error } = registerSchema.validate(payload)
  if (error) throw new Error(error.message)
}

export const validateLogin = (payload: any) => {
  const { error } = loginSchema.validate(payload)
  if (error) throw new Error(error.message)
}
