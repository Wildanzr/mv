'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FloatButton, Spin } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { CreatePostForm, SearchForm, DisplayPosts, PostPagination } from '@/components'
import { getCookie, hasCookie } from 'cookies-next'
import Swal from 'sweetalert2'

const Posts = () => {
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [posts, setPosts] = useState<PostDetail[]>([])
  const [fetcher, setFetcher] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const [mode, setMode] = useState<string>('caption')
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    Swal.fire({
      title: 'Fetching posts...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    try {
      const res = await fetch(
        `/api/v1/post?page=${page}&limit=${limit}&searchBy=${mode}&search=${search}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        }
      )

      const response = (await res.json()) as FetchPostResponse
      console.log(response)
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      Swal.close()
      setFetcher(false)
      setLoading(false)
    }
  }, [limit, mode, page, search])

  const deletePost = async (id: number) => {
    Swal.fire({
      title: 'Are you sure to delete this post?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/v1/post/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${getCookie('token')}`,
            },
          })

          const response = await res.json()
          if (response.status === 'success') {
            Swal.fire({
              title: 'Post deleted!',
              icon: 'success',
            })
          }
          setFetcher(true)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const openCreateModal = () => setCreateModal(true)

  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/auth/login')
    } else if (fetcher) {
      fetchPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fetcher) {
      fetchPosts()
    }
  }, [fetcher, page, limit, mode, search, fetchPosts])
  return (
    <div className="flex flex-col w-full overflow-y-auto items-center justify-between space-y-4">
      <SearchForm setSearch={setSearch} setMode={setMode} setFetcher={setFetcher} />
      {loading ? null : (
        <DisplayPosts posts={posts} deletePost={deletePost} setFetcher={setFetcher} />
      )}

      <div className="flex w-full items-center justify-center">
        <PostPagination
          total={total}
          setFetcher={setFetcher}
          setPage={setPage}
          setLimit={setLimit}
        />

        <CreatePostForm
          isOpen={createModal}
          setIsOpen={setCreateModal}
          setFetcher={setFetcher}
        />
        <FloatButton
          icon={<PlusCircleFilled />}
          type="primary"
          style={{ right: 24 }}
          className="bg-blue-700"
          onClick={openCreateModal}
        />
      </div>
    </div>
  )
}

export default Posts
