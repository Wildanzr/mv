'use client'

import { useRouter } from 'next/navigation'
import { Form, Input, Button, message } from 'antd'
import { setCookie } from 'cookies-next'
const { Item } = Form
const { Password } = Input

const LoginPage = () => {
  const router = useRouter()

  const onFinish = async (credential: Credentials) => {
    try {
      const response = await fetch(`/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential),
      })
      const res = (await response.json()) as LoginResponse

      if (!res.success) {
        return message.error(res.message)
      }

      message.info(res.message)
      setCookie('token', res.data.token, {
        maxAge: 15 * 60,
      })

      setTimeout(() => router.push('/dash'), 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex flex-col space-y-5 w-full max-w-sm px-4 py-4 rounJded-md bg-gray-200">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <Form name="loginForm" className="w-full" onFinish={onFinish}>
        <Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 1, message: 'Username must be at least 4 characters long' },
            { max: 20, message: 'Username must be at most 20 characters long' },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: 'Username must only contain alphanumeric characters',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Item>
        <Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters long' },
            { max: 20, message: 'Password must be at most 50 characters long' },
          ]}
        >
          <Password placeholder="Password" />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-700">
            Login
          </Button>
        </Item>
      </Form>
    </section>
  )
}

export default LoginPage