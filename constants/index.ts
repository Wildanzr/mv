import React from 'react'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { HomeOutlined } from '@ant-design/icons'

export const menuItems: MenuItemType[] = [
  {
    icon: React.createElement(HomeOutlined),
    key: 'home',
  },
  {
    title: 'User',
    label: 'User',
    key: 'user',
  },
  {
    title: 'Change Password',
    label: 'Change Password',
    key: 'change-password',
  },
  {
    title: 'Post',
    label: 'Post',
    key: 'post',
  },
]
