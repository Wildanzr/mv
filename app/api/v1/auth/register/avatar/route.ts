import { createUploadDir, generateUniqueFilename } from '@/utils'
import ClientError from '@/utils/error'
import { formatErrorResponse, success } from '@/utils/response'
import { uploadImageSchema, validatePayload } from '@/validators'
import { writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import { join } from 'path'

const uploadDir: string = join(process.cwd(), '/public/uploads')
const HOST_URL: string = process.env.HOST_URL || 'http://localhost:3000'

export const POST = async (request: NextRequest) => {
  /*
    Upload image flow:
    1. Validate payload
    2. Create buffer from file
    3. Check or create upload directory
    4. Sanitize and rename filename
    5. Write file to upload directory
    6. Return response
    */

  try {
    const formData = await request.formData()
    const file = formData.get('file') as Blob | undefined
    if (!file) throw new ClientError('File is required', 400)
    validatePayload({ mimetype: file.type, size: file.size }, uploadImageSchema)
    const buffer = Buffer.from(await file.arrayBuffer())
    createUploadDir(uploadDir)
    const filename = generateUniqueFilename(file)
    await writeFile(`${uploadDir}/${filename}`, buffer)
    const finalFilePath = `${HOST_URL}/uploads/${filename}`
    const payload = {
      url: finalFilePath,
      filename: filename,
      mimetype: file.type,
    }

    return success('Successfully upload image', payload, 201)
  } catch (error: any) {
    return formatErrorResponse(error)
  }
}
