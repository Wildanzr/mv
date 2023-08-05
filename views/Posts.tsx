'use client'

import { useState } from 'react'
import { FloatButton } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { CreatePostForm, SearchForm } from '@/components'

const Posts = () => {
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [posts, setPosts] = useState<Post[]>([])
  const [fetch, setFetch] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const openCreateModal = () => setCreateModal(true)
  return (
    <div className="flex flex-col w-full h-full">
      <SearchForm
        search={search}
        setSearch={setSearch}
        setPost={setPosts}
        setTotal={setTotal}
        setPage={setPage}
      />
      <CreatePostForm isOpen={createModal} setIsOpen={setCreateModal} />
      <FloatButton
        icon={<PlusCircleFilled />}
        type="primary"
        style={{ right: 24 }}
        className="bg-blue-700"
        onClick={openCreateModal}
      />
    </div>
  )
}

export default Posts
