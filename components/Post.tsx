'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HeartTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UpdatePostForm } from '.'

const Post = ({ post, deletePost, setFetcher }: PostProps) => {
  const randomLikes = () => {
    return Math.floor(Math.random() * 670) + 1
  }

  const { id, image, caption, tags, likes, user } = post
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState<number>(randomLikes())
  const [isOpen, setIsOpen] = useState(false)

  const likedPost = () => {
    if (liked) {
      setTotalLikes(totalLikes - 1)
    } else {
      setTotalLikes(totalLikes + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="rounded overflow-hidden text-gray-900 hover:shadow-lg transition-shadow duration-300 ease-in-out bg-slate-100">
      <div className="flex w-full h-40 bg-slate-50">
        <Image
          className="object-cover object-center"
          src={image}
          alt={'Post image'}
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-col px-6 py-4">
        <div className="flex flex-row space-x-2">
          <HeartTwoTone
            twoToneColor={liked ? '#000' : '#eb2f96'}
            onClick={() => likedPost()}
            className="cursor-pointer"
          />
          <p className="text-gray-700 text-base">{totalLikes}</p>
        </div>

        <p className="text-gray-900 font-semibold text-base">{user.username}</p>
        <p className="text-gray-700 text-base truncate">{caption}</p>
        <p className="text-blue-700 text-sm">{tags}</p>
        <div className="flex flex-row space-x-3 items-end justify-end">
          <EditOutlined className="cursor-pointer" onClick={() => setIsOpen(true)} />
          <DeleteOutlined className="cursor-pointer" onClick={() => deletePost(id)} />
        </div>
      </div>

      <UpdatePostForm
        post={post}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFetcher={setFetcher}
      />
    </div>
  )
}

export default Post
