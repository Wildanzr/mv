import { Post } from '@/models'
import ClientError from '@/utils/error'
import { getUserById } from './user'

export const getPostWithUser = async (
  postId: number
): Promise<PostWithUser> => {
  const post = (await Post.findById(postId)
    .populate('userId', 'name username email photo')
    .lean()) as unknown as PostWithUser
  if (!post) throw new ClientError('Post not found', 404)
  return post
}

export const createPost = async (
  userId: number,
  caption: string,
  tags: string,
  image: string
): Promise<PostWithUser> => {
  const user = await getUserById(userId)
  if (!user) throw new ClientError('User not found', 404)

  const post = (await Post.create({
    userId,
    caption,
    tags,
    image,
  })) as unknown as Post
  if (!post) throw new ClientError('Failed to create post', 500)
  return await getPostWithUser(post._id as number)
}
