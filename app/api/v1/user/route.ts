import { getUserById } from '@/services/user'
import { connectDB } from '@/utils/database'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'

export const GET = async (req: Request) => {
  /* 
    Get user by id flow:
    1. Connect to database
    2. Check authorization header
    3. Validate JWT
    4. Get user by id
    5. Return response
  */

  try {
    await connectDB()
    const authorization = getTokenFromRequest(req)
    const { _id } = verifyToken(authorization)
    const user = await getUserById(_id)
    const { name, username, email, photo, createdAt, updatedAt } = user

    return success(
      'Successfully get user',
      {
        name,
        username,
        email,
        photo,
        createdAt,
        updatedAt,
      },
      200
    )
  } catch (error) {
    return formatErrorResponse(error)
  }
}
