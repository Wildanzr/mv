import { NextApiRequest } from 'next'
import { connectDB } from '@/utils/database'
import { User } from '@/models'
import { success, fail } from '@/utils/response'

export const POST = async (req: Request) => {
  try {
    const { name, username, email, password, photo } = await req.json()

    const user = {
      name,
      username,
      email,
      password,
      photo,
    }
    const response = success('user created', user)

    return new Response(JSON.stringify(response), {
      status: 200,
    })
  } catch (error) {
    const response = fail((error as Error).message)

    return new Response(JSON.stringify(response), {
      status: 500,
    })
  }
}
