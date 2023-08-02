import {
  checkNewUsernameAndEmail,
  getUserById,
  updateUserProfile,
} from '@/services/user'
import { connectDB } from '@/utils/database'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'
import { updateUserSchema, validatePayload } from '@/validators'

export const GET = async (req: Request) => {
  /* 
    Get user by id flow:
    1. Check authorization header
    2. Connect to database
    3. Validate JWT
    4. Get user by id
    5. Return response
  */

  try {
    const authorization = getTokenFromRequest(req)
    await connectDB()
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

export const PUT = async (req: Request) => {
  /* 
    Update user flow:
    1. Check authorization header
    2. Validate JWT
    3. Validate payload
    4. Connect to database
    5. Check if username and email are already taken by other user
    6. Update user
    7. Return response
  */

  try {
    const authorization = getTokenFromRequest(req)
    const { _id } = verifyToken(authorization)
    const { email, name, photo, username } = (await req.json()) as UpdateUserDTO
    validatePayload({ email, name, photo, username }, updateUserSchema)
    await connectDB()
    await checkNewUsernameAndEmail(_id, username, email)
    const user = await updateUserProfile(_id, { email, name, photo, username })
    const { createdAt, updatedAt } = user

    return success(
      'Successfully update user',
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
