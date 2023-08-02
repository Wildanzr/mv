import { connectDB } from '@/utils/database'
import { success, formatErrorResponse } from '@/utils/response'
import { validatePayload, loginSchema } from '@/validators'
import { checkLoginCredentials } from '@/services/user'
import { signToken } from '@/utils/tokenization'

export const POST = async (req: Request) => {
  /* 
    Login flow:
    1. Connect to database
    2. Validate request body
    3. Check any user with the given username and make sure password is correct
    4. Build JWT payload
    5. Sign JWT
    6. Return response
  */

  try {
    await connectDB()
    const { username, password } = await req.json()
    validatePayload({ username, password }, loginSchema)
    const user = await checkLoginCredentials(username, password)
    const token = signToken(user)
    return success('Successfully logged in', { token }, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
