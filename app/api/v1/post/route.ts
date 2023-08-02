import { createPost } from '@/services/post'
import { connectDB } from '@/utils/database'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'
import { createPostSchema, validatePayload } from '@/validators'

export const POST = async (req: Request) => {
  /* 
    Create post flow:
    1. Check authorization header
    2. Validate JWT
    3. Validate payload
    4. Connect to database
    5. Create post
    6. Return response
    */

  try {
    const authorization = getTokenFromRequest(req)
    const { _id } = verifyToken(authorization)
    const { image, caption, tags } = (await req.json()) as CreatePostDTO
    validatePayload({ image, caption, tags }, createPostSchema)
    await connectDB()
    const post = await createPost(_id, caption, tags, image)
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

    return success('Successfully create post', payload, 201)
  } catch (error) {
    return formatErrorResponse(error)
  }
}
