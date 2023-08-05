'use client'

import Image from 'next/image'
import { Form, Input, Button } from 'antd'

const { Item } = Form

const UpdateProfileForm = ({
  profile,
  onFinish,
  isEditing,
  handleImageChange,
  selectedImage,
  setIsEditing,
}: UpdateProfileFormProps) => {
  return (
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
        {selectedImage && (
          <div className={`flex w-full ${selectedImage ? 'h-40' : 'h-full'}`}>
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
  )
}

export default UpdateProfileForm
