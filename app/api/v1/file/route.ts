import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { getTokenFromRequest, verifyToken } from '@/utils/tokenization'
import { uploadImageSchema, validatePayload } from '@/validators'
import { mkdir, stat, writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import { extname, join } from 'path'

const uploadDir: string = join(process.cwd(), '/public/uploads')
const HOST_URL: string = process.env.HOST_URL || 'http://localhost:3000'

const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, '_')
}

const generateUniqueFilename = (file: Blob): string => {
  const uniqueSuffix = `${Date.now()}`
  const fileExtension = extname(file.name)
  const originalFilename = file.name.replace(/\.[^/.]+$/, '')
  const sanitizedFilename = sanitizeFilename(originalFilename)

  return `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`
}

const createUploadDir = async () => {
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

export const POST = async (request: NextRequest) => {
  /*
    Upload image flow:
    1. Check authorization header
    2. Validate JWT
    3. Validate payload
    4. Create buffer from file
    5. Check or create upload directory
    6. Sanitize and rename filename
    */

  try {
    const authorization = getTokenFromRequest(request)
    const { _id } = verifyToken(authorization)
    const formData = await request.formData()
    const file = formData.get('file') as Blob | undefined
    if (!file) throw new ClientError('File is required', 400)
    validatePayload({ mimetype: file.type, size: file.size }, uploadImageSchema)
    const buffer = Buffer.from(await file.arrayBuffer())
    createUploadDir()
    const filename = generateUniqueFilename(file)
    await writeFile(`${uploadDir}/${filename}`, buffer)
    const finalFilePath = `${HOST_URL}/uploads/${filename}`
    const payload = {
      id: _id,
      url: finalFilePath,
      filename: filename,
      mimetype: file.type,
    }

    return success('Successfully upload image', payload, 201)
  } catch (error: any) {
    return formatErrorResponse(error)
  }
}
