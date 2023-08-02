import { Post } from '@/models'
import ClientError from '@/utils/error'
import { getUserById } from './user'

export const getPostWithUser = async (postId: number): Promise<PostWithUser> => {
  const post = (await Post.findById(postId)
    .populate('userId', 'name username email photo')
    .lean()) as unknown as PostWithUser
  if (!post) throw new ClientError('Post not found', 404)
  return post
}

export const createPost = async (
  userId: number,
  payload: CreatePostDTO
): Promise<PostWithUser> => {
  const { caption, tags, image } = payload
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

export const updatePost = async (
  postId: number,
  payload: UpdatePostDTO
): Promise<PostWithUser> => {
  const { caption, tags, image } = payload
  const willUpdatePost = await Post.findByIdAndUpdate(postId, {
    caption,
    tags,
    image,
    updatedAt: Date.now(),
  })
  if (!willUpdatePost) throw new ClientError('Failed to update post', 500)
  return await getPostWithUser(postId)
}

export const deletePost = async (postId: number) => {
  const post = await Post.findById(postId)
  if (!post) throw new ClientError('Post not found', 404)
  const willDeletePost = await Post.findByIdAndDelete(postId)
  if (!willDeletePost) throw new ClientError('Failed to delete post', 500)
}
