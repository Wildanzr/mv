import { getPostListByUserId } from '@/services/post'
import { getPostQuery, mapPostListDTO } from '@/utils'
import { connectDB } from '@/utils/database'
import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'
import { validatePayload, postQuerySchema } from '@/validators'

export const GET = async (req: Request, params: PostParams) => {
  /*
    Get list post by user id flow:
    1. Check authorization header
    2. Validate JWT
    3. Get query params
    4. Validate query params
    5. Connect to database
    6. Get list post
    7. Return response
    */

  try {
    const authorization = getTokenFromRequest(req)
    verifyToken(authorization)
    const { id: userId } = params.params
    if (isNaN(userId)) throw new ClientError('User id must be a number', 400)
    const { page, limit, searchBy, search } = getPostQuery(req.url as string)
    validatePayload({ page, limit, searchBy, search }, postQuerySchema)
    await connectDB()
    const { posts, total } = await getPostListByUserId(userId, {
      page,
      limit,
      searchBy,
      search,
    })
    const payload = mapPostListDTO(posts)
    const pagination = {
      total,
      page,
      limit,
    }

    return success('Successfully get user post', payload, 200, pagination)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
