import { likePost } from '@/services/post'
import { connectDB } from '@/utils/database'
import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'

export const PUT = async (req: Request, params: PostParams) => {
  /*
    Like post flow:
    1. Check authorization header
    2. Validate JWT
    3. Connect to database
    4. Check if post exist, then like it
    5. Return response
    */

  try {
    const authorization = getTokenFromRequest(req)
    const { _id } = verifyToken(authorization)
    const { id: postId } = params.params
    await connectDB()
    if (isNaN(postId)) throw new ClientError('Post id must be a number', 400)
    await likePost(postId, _id)

    return success('Sucessfully liked post', null, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
