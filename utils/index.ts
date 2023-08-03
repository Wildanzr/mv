import ClientError from '@/utils/error'
import { mkdir, stat } from 'fs/promises'
import { extname } from 'path'

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

export const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, '_')
}

export const generateUniqueFilename = (file: Blob): string => {
  const uniqueSuffix = `${Date.now()}`
  const fileExtension = extname(file.name)
  const originalFilename = file.name.replace(/\.[^/.]+$/, '')
  const sanitizedFilename = sanitizeFilename(originalFilename)

  return `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`
}

export const createUploadDir = async (uploadDir: string) => {
  try {
    await stat(uploadDir)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true })
    } else {
      throw new ClientError('Failed to create upload directory', 500)
    }
  }
}
