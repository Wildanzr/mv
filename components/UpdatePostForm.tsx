'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Form, Modal, Input, Button } from 'antd'
import Swal from 'sweetalert2'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'

const { TextArea } = Input
const { Item } = Form

const UpdatePostForm = ({ isOpen, setIsOpen, post, setFetcher }: UpdatePostFormProps) => {
  const [form] = Form.useForm()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const uploadImage = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedImage as Blob)

      const res = await fetch('/api/v1/file', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
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
      post.image = URL.createObjectURL(file)
    }
  }

  const onFinish = async (values: CreatePostDTO) => {
    if (!selectedImage) {
      toast.error('Please upload an image first!')
      return
    }
    Swal.fire({
      title: 'Updating post...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    try {
      const image = await uploadImage()
      const payload = {
        caption: values.caption,
        tags: values.tags,
        image,
      }

      const res = await fetch(`/api/v1/post/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(payload),
      })

      const data = (await res.json()) as CreatePostResponse
      toast.success(data.message)
      setFetcher(true)
      closeModal()
    } catch (error) {
      console.log(error)
    } finally {
      Swal.close()
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
    form.resetFields()
    setIsOpen(false)
  }
  return (
    <Modal
      title="Create Post"
      centered
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <Form
        name="create-post"
        className="w-full h-full"
        onFinish={onFinish}
        form={form}
        initialValues={{
          caption: post.caption,
          tags: post.tags,
        }}
      >
        <div className="flex w-full flex-col space-y-2 pb-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="flex w-full"
            placeholder="Post picture"
          />
          <div className={`flex w-full ${selectedImage ? 'h-40' : ''}`}>
            <Image
              src={post.image}
              alt="Post picture"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        <Item
          name="caption"
          rules={[
            { required: true, message: 'Please input caption of your post!' },
            { min: 1, message: 'Caption must be at least 1 characters long' },
            { max: 1000, message: 'Caption must be at most 1000 characters long' },
          ]}
        >
          <TextArea placeholder="Caption..." autoSize={{ minRows: 3, maxRows: 6 }} />
        </Item>

        <Item
          name="tags"
          rules={[
            { required: true, message: 'Please input tags of your post!' },
            { min: 2, message: 'Tags must be at least 2 characters long' },
            { max: 500, message: 'Tags must be at most 500 characters long' },
          ]}
        >
          <Input placeholder="#yourtag" />
        </Item>

        <div className="flex w-full h-full flex-row justify-around items-center">
          <Button type="primary" className="bg-gray-700" onClick={closeModal}>
            Cancel
          </Button>

          <Button type="primary" htmlType="submit" className="bg-blue-700">
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default UpdatePostForm
