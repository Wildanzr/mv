import { changePassword } from '@/services/user'
import { connectDB } from '@/utils/database'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'
import { changePasswordSchema, validatePayload } from '@/validators'

export const PUT = async (req: Request) => {
  /* 
    Change password flow:
    1. Check authorization header
    2. Validate JWT
    3. Validate payload
    4. Connect to database
    5. Check if old password is correct, then update password
    6. Return response
  */

  try {
    const authorization = getTokenFromRequest(req)
    const { _id } = verifyToken(authorization)
    const { oldPassword, newPassword, confirmNewPassword } =
      (await req.json()) as ChangePasswordDTO
    validatePayload(
      { oldPassword, newPassword, confirmNewPassword },
      changePasswordSchema
    )
    await connectDB()
    await changePassword(_id, oldPassword, newPassword)

    return success('Successfully change password', null, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
