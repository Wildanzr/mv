import React from 'react'
import { Button, ConfigProvider } from 'antd'
import theme from '@/theme/themeConfig'

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <main className="flex flex-col space-y-5 items-center justify-center w-full h-screen bg-gray-50">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <Button size="large" type="primary">
        Button
      </Button>

      <Button
        type="primary"
        className="bg-red-400 text-black font-bold hover:bg-green-500"
      >
        Button
      </Button>
    </main>
  </ConfigProvider>
)

export default HomePage
