import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ConfigProvider } from 'antd'
import theme from '@/theme/themeConfig'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: ChildrenProps) => (
  <html lang="en">
    <body className={inter.className}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>
          <main className="flex flex-col space-y-5 items-center justify-center w-full h-screen bg-gray-50">
            {children}
          </main>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
)

export default RootLayout
