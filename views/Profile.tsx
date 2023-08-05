'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Form, Input, Button } from 'antd'
import { hasCookie, getCookie } from 'cookies-next'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { UpdateProfileForm } from '@/components'

const { Item } = Form

const Profile = () => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [profile, setProfile] = useState<UpdateUserDTO>({
    name: '',
    username: '',
    email: '',
    photo: '',
  })

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
        },
      })

      const data = (await res.json()) as GetUserResponse
      if (data.success) {
        console.log('here')
        console.log(data.data)
        setProfile({
          ...data.data,
        })
        setTimeout(() => setIsFetching(false), 300)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const uploadImage = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedImage as Blob)

      const res = await fetch('/api/v1/auth/register/avatar', {
        method: 'POST',
        body: formData,
      })

      const data = (await res.json()) as UploadImageResponse
      setProfile({
        ...profile,
        photo: data.data.url,
      })

      return data.data.url
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setProfile({
        ...profile,
        photo: URL.createObjectURL(file),
      })
    }
  }

  const onFinish = async (values: RegisterDTO) => {
    const { name, username, email, password, photo } = values
    Swal.fire({
      title: 'Updating profile...',
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
        photo: profile.photo,
      }
      if (selectedImage) {
        const image = await uploadImage()
        payload.photo = image as string
      }
      const res = await fetch('/api/v1/user', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
        },
      })
      const data = (await res.json()) as RegisterResponse
      if (!data.success) {
        return toast.error(data.message)
      }
      toast.success(data.message)

      setIsEditing(false)
    } catch (error) {
      console.log(error)
    } finally {
      Swal.close()
    }
  }

  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/auth/login')
    }

    fetchProfile()
  }, [router, fetchProfile])
  return (
    <section className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col space-y-5 w-full max-w-sm px-4 py-4 rounJded-md bg-gray-200 rounded-md">
        <h1 className="text-2xl font-bold text-center">My Insta Profile</h1>

        {isFetching ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Form
            name="loginForm"
            className="w-full h-full"
            onFinish={onFinish}
            initialValues={{
              name: profile.name,
              username: profile.username,
              email: profile.email,
            }}
          >
            <Item
              name="name"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 1, message: 'Username must be at least 4 characters long' },
                { max: 100, message: 'Username must be at most 20 characters long' },
              ]}
            >
              <Input placeholder="Name" disabled={!isEditing} />
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
              <Input placeholder="Username" disabled={!isEditing} />
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
              <Input placeholder="Email" disabled={!isEditing} />
            </Item>

            <div className="flex w-full flex-col space-y-2 pb-5">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!isEditing}
                className="flex w-full"
                placeholder="Profile picture"
              />
              <div className={`flex w-full ${selectedImage ? 'h-40' : 'h-full'}`}>
                <Image
                  src={profile.photo}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex w-full h-full flex-row justify-around items-center">
              <Button
                type="primary"
                disabled={isEditing}
                onClick={() => setIsEditing(!isEditing)}
                className={`${!isEditing ? 'bg-blue-700' : 'bg-gray-400'}`}
              >
                Edit
              </Button>

              <Button
                type="primary"
                disabled={!isEditing}
                htmlType="submit"
                className={`${isEditing ? 'bg-blue-700' : 'bg-gray-400'}`}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </div>
    </section>
  )
}

export default Profile
