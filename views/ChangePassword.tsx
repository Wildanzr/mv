'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, message } from 'antd'
import { getCookie, hasCookie } from 'cookies-next'
import Swal from 'sweetalert2'
const { Item } = Form
const { Password } = Input

const ChangePassword = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = async (values: ChangePasswordDTO) => {
    Swal.fire({
      title: 'Are you sure to change password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Changing Password...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })
        try {
          const response = await fetch(`/api/v1/user/change-password`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getCookie('token'),
            },
            body: JSON.stringify(values),
          })
          const res = (await response.json()) as BaseResponse

          if (!res.success) {
            return message.error(res.message)
          }
          message.info(res.message)
          form.resetFields()
        } catch (error) {
          console.log(error)
        } finally {
          Swal.close()
        }
      }
    })
  }

  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <section className="flex flex-col space-y-5 w-full max-w-sm px-4 py-4 rounJded-md bg-gray-200 rounded-md">
      <h1 className="text-2xl font-bold text-center">Change Password</h1>

      <Form name="loginForm" className="w-full" onFinish={onFinish} form={form}>
        <Item
          name="oldPassword"
          rules={[
            { required: true, message: 'Please input your old password!' },
            { max: 20, message: 'Password must be at most 50 characters long' },
          ]}
        >
          <Password placeholder="Old password" />
        </Item>

        <Item
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new password!' },
            { min: 8, message: 'Password must be at least 8 characters long' },
            { max: 20, message: 'Password must be at most 50 characters long' },
          ]}
        >
          <Password placeholder="Password" />
        </Item>

        <Item
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Confirm password does not match!')
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-700">
            Update
          </Button>
        </Item>
      </Form>
    </section>
  )
}

export default ChangePassword
