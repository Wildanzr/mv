import { updatePost } from '@/services/post'
import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'

export const PUT = async (req: Request, params: PostParams) => {
  /* 
    Update post flow:
    1. Check authorization header
    2. Validate JWT
    3. Validate payload
    4. Connect to database
    5. Update post
    6. Return response
  */

  try {
    const authorization = getTokenFromRequest(req)
    verifyToken(authorization)
    const { id: postId } = params.params
    const { caption, image, tags } = (await req.json()) as UpdatePostDTO
    if (isNaN(postId)) throw new ClientError('Post id must be a number', 400)
    const post = await updatePost(postId, { caption, image, tags })
    const payload = {
      image: post.image,
      caption: post.caption,
      tags: post.tags,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        name: post.userId.name,
        username: post.userId.username,
        email: post.userId.email,
        photo: post.userId.photo,
      },
    }

    return success('Successfully update post', payload, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
