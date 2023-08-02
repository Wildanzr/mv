import { unlikePost } from '@/services/post'
import { connectDB } from '@/utils/database'
import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'

export const PUT = async (req: Request, params: PostParams) => {
  /*
    Unlike post flow:
    1. Check authorization header
    2. Validate JWT
    3. Connect to database
    4. Check if post exist, then unlike it
    5. Return response
    */

  try {
    const authorization = getTokenFromRequest(req)
    const { _id } = verifyToken(authorization)
    const { id: postId } = params.params
    if (isNaN(postId)) throw new ClientError('Post id must be a number', 400)
    await connectDB()
    await unlikePost(postId, _id)

    return success('Sucessfully unliked post', null, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
