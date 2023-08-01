import { connectDB } from '@/utils/database'
import { User } from '@/models'
import { success, formatErrorResponse } from '@/utils/response'
import { validateRegister } from '@/validators'
import { hashPassword } from '@/utils/hash'
import { checkDuplicateUsername, checkDuplicateEmail } from '@/services'

export const POST = async (req: Request) => {
  /* 
    Register flow:
    1. Connect to database
    2. Validate request body
    3. Check if username and email are already taken
    4. Hash password
    5. Create user
    6. Return response
  */
  try {
    await connectDB()
    const { name, username, email, password, photo } = await req.json()
    const user = {
      name,
      username,
      email,
      password,
      photo,
    }

    validateRegister(user)
    await checkDuplicateUsername(user.username)
    await checkDuplicateEmail(user.email)
    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    await User.create({
      _id: 0,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      photo: user.photo,
    })
    const response = success('Your account has been sucessfully created', {
      name: user.name,
      username: user.username,
      email: user.email,
      photo: user.photo,
    })
    return new Response(JSON.stringify(response), {
      status: 200,
    })
  } catch (error) {
    return formatErrorResponse(error as Error)
  }
}
