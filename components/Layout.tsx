'use client'

import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Layout, theme } from 'antd'
import MenuItem from './MenuItem'

const { Content, Sider } = Layout

const App = ({ children }: ChildrenProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

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

          <button className="bg-red-600 w-full py-2 text-base text-white">Logout</button>
        </div>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 600, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
