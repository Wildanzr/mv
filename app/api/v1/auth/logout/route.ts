import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'

export const POST = async (req: Request) => {
  /* 
    Logout flow:
    1. Check authorization header
    2. Validate JWT
    3. Return response
    */

  try {
    const authorization = getTokenFromRequest(req)
    verifyToken(authorization)
    return success('Successfully logged out', null, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
