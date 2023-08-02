import { deletePost, getPostWithUser, updatePost } from '@/services/post'
import { connectDB } from '@/utils/database'
import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'
import { updatePostSchema, validatePayload } from '@/validators'

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
    validatePayload({ caption, image, tags }, updatePostSchema)
    await connectDB()
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

export const DELETE = async (req: Request, params: PostParams) => {
  /* 
    Delete post flow:
    1. Check authorization header
    2. Validate JWT
    3. Connect to database
    4. Delete post
    5. Return response
    */

  try {
    const authorization = getTokenFromRequest(req)
    verifyToken(authorization)
    const { id: postId } = params.params
    if (isNaN(postId)) throw new ClientError('Post id must be a number', 400)
    await connectDB()
    await deletePost(postId)

    return success('Successfully delete post', null, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}

export const GET = async (req: Request, params: PostParams) => {
  /*
    Get post flow:
    1. Check authorization header
    2. Validate JWT
    3. Connect to database
    4. Get post
    5. Return response
  */

  try {
    const authorization = getTokenFromRequest(req)
    verifyToken(authorization)
    const { id: postId } = params.params
    if (isNaN(postId)) throw new ClientError('Post id must be a number', 400)
    await connectDB()
    const post = await getPostWithUser(postId)
    const payload = {
      id: post._id,
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

    return success('Successfully get post', payload, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
