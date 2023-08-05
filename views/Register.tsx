'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Form, Input, Button, message } from 'antd'
import Swal from 'sweetalert2'
const { Item } = Form
const { Password } = Input

const Register = () => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const uploadImage = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedImage as Blob)

      const res = await fetch('/api/v1/auth/register/avatar', {
        method: 'POST',
        body: formData,
      })

      const data = (await res.json()) as UploadImageResponse
      return data.data.url
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const onFinish = async (e: any) => {
    const { name, username, email, password } = e

    // Show loading
    Swal.fire({
      title: 'Registering...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    try {
      const payload = {
        name,
        username,
        email,
        password,
        photo: 'http://localhost:3000/uploads/init.jpg', // default image
      }
      if (selectedImage) {
        const image = await uploadImage()
        payload.photo = image as string
      }

      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const data = (await res.json()) as RegisterResponse
      message.success(data.message)

      setTimeout(() => {
        router.push('/auth/login')
      }, 500)
    } catch (error) {
      console.log(error)
    } finally {
      Swal.close()
    }
  }
  return (
    <section className="flex flex-col space-y-5 w-full max-w-sm px-4 py-4 rounJded-md bg-gray-200">
      <h1 className="text-2xl font-bold text-center">Register</h1>

      <Form name="loginForm" className="w-full" onFinish={onFinish}>
        <Item
          name="name"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 1, message: 'Username must be at least 4 characters long' },
            { max: 100, message: 'Username must be at most 20 characters long' },
          ]}
        >
          <Input placeholder="Name" />
        </Item>

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
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please input a valid email!' },
            { min: 1, message: 'Email must be at least 4 characters long' },
            { max: 100, message: 'Email must be at most 100 characters long' },
          ]}
        >
          <Input placeholder="Email" />
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

        <Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Confirm password does not match!')
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Item>

        <div className="flex w-full flex-col space-y-2 pb-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="flex w-full"
            placeholder="Profile picture"
          />
          {selectedImage && (
            <div className="flex w-full">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Picture of the author"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          )}
        </div>

        <Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-700">
            Register
          </Button>
        </Item>
        <Link href="/auth/login" className="flex w-full items-center justify-center">
          Login
        </Link>
      </Form>
    </section>
  )
}

export default Register
