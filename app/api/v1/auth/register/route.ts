import { connectDB } from '@/utils/database'
import { success, formatErrorResponse } from '@/utils/response'
import { validatePayload, registerSchema } from '@/validators'
import {
  checkDuplicateUsername,
  checkDuplicateEmail,
  createUser,
} from '@/services/user'

export const POST = async (req: Request) => {
  /* 
    Register flow:
    1. Connect to database
    2. Validate request body
    3. Check if username and email are already taken
    4. Hash password
    5. Create user
    6. Return response
  */
  try {
    await connectDB()
    const { name, username, email, password, photo } = await req.json()
    const user = {
      name,
      username,
      email,
      password,
      photo,
    }
    validatePayload(user, registerSchema)
    await checkDuplicateUsername(user.username)
    await checkDuplicateEmail(user.email)
    const newUser = await createUser(user)
    return success('Your account has been sucessfully created', newUser, 201)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
