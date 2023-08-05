'use client'

import { useRouter } from 'next/navigation'
import { HomeOutlined } from '@ant-design/icons'
import { Layout, theme } from 'antd'
import MenuItem from './MenuItem'
import { deleteCookie } from 'cookies-next'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const { Content, Sider } = Layout

const App = ({ children }: ChildrenProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const router = useRouter()

  const logout = () => {
    Swal.fire({
      title: 'Are you sure to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.info('You have been logged out')
        setTimeout(() => {
          deleteCookie('token')
          router.push('/auth/login')
        }, 500)
      }
    })
  }

  return (
    <Layout className="w-full h-full">
      <Sider breakpoint="md" collapsedWidth="0" className="h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col space-y-2 w-full bg-transparent items-center">
            <MenuItem href="/" icon={<HomeOutlined />} className="pb-2 text-3xl" />
            <MenuItem href="/dash/user" label="User" />
            <MenuItem href="/dash/change-password" label="Change Password" />
            <MenuItem href="/dash/posts" label="Post" />
          </div>

          <button
            className="bg-red-600 w-full py-2 text-base text-white"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </Sider>
      <Layout>
        <Content>
          <div className="w-full h-full bg-gray-50 p-4">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
