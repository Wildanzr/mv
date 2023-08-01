import { registerSchema } from './schema'

export const validateRegister = (payload: any) => {
  const { error } = registerSchema.validate(payload)
  if (error) throw new Error(error.message)
}
