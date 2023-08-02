import { Post, UserLiked } from '@/models'
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

export const likePost = async (postId: number, userId: number) => {
  const post = await Post.findById(postId)
  if (!post) throw new ClientError('Post not found', 404)
  const checkLikedBefore = await UserLiked.findOne({ userId, postId })
  if (checkLikedBefore) throw new ClientError('You already liked this post', 400)
  const willLikePost = await Post.findByIdAndUpdate(postId, {
    likes: post.likes + 1,
    updatedAt: Date.now(),
  })
  await UserLiked.create({ userId, postId })
  if (!willLikePost) throw new ClientError('Failed to like post', 500)
}

export const unlikePost = async (postId: number, userId: number) => {
  const post = await Post.findById(postId)
  if (!post) throw new ClientError('Post not found', 404)
  const checkLikedBefore = await UserLiked.findOne({ userId, postId })
  if (!checkLikedBefore) throw new ClientError('You are not liked this post before', 400)
  const willUnlikePost = await Post.findByIdAndUpdate(postId, {
    likes: post.likes - 1,
    updatedAt: Date.now(),
  })
  await UserLiked.findOneAndDelete({ userId, postId })
  if (!willUnlikePost) throw new ClientError('Failed to unlike post', 500)
}

export const getPostList = async (payload: PostQuery): Promise<PostList> => {
  const { page, limit, searchBy, search } = payload
  const skip = (page - 1) * limit
  const query = search ? { [searchBy]: { $regex: search, $options: 'i' } } : {}
  const posts = (await Post.find(query)
    .populate('userId', 'name username email photo')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()) as PostWithUser[]
  const total = await Post.countDocuments(query)
  return { posts, total }
}

export const getPostListByUserId = async (
  userId: number,
  payload: PostQuery
): Promise<PostList> => {
  const { page, limit, searchBy, search } = payload
  const skip = (page - 1) * limit
  const query = search ? { [searchBy]: { $regex: search, $options: 'i' } } : {}
  const posts = (await Post.find({ userId, ...query })
    .populate('userId', 'name username email photo')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()) as PostWithUser[]
  const total = await Post.countDocuments({ userId, ...query })
  return { posts, total }
}
