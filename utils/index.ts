export const getPostQuery = (url: string): PostQuery => {
  const urlObject = new URL(url)
  const queryParams = urlObject.searchParams

  const page = Number(queryParams.get('page')) || 1
  const limit = Number(queryParams.get('limit')) || 10
  const searchBy = (queryParams.get('searchBy') as 'caption' | 'tags') || 'caption'
  const search = queryParams.get('search') || ''

  return { page, limit, searchBy, search }
}

export const mapPostListDTO = (post: PostWithUser[]): PostListDTO[] => {
  return post.map((item) => ({
    id: item._id,
    image: item.image,
    caption: item.caption,
    tags: item.tags,
    likes: item.likes,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    user: {
      name: item.userId.name,
      username: item.userId.username,
      email: item.userId.email,
      photo: item.userId.photo,
    },
  }))
}
