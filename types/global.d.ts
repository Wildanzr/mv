// global.d.ts

export {}

declare global {
  interface ChildrenProps {
    children: React.ReactNode
  }
  interface MenuItemProps {
    href: string
    icon?: React.ReactNode
    label?: string
    className?: string
  }
  interface UpdateProfileFormProps {
    profile: DetailUser
    onFinish: (values: any) => void
    isEditing: boolean
    handleImageChange: (e: any) => void
    selectedImage: any
    setIsEditing: (value: boolean) => void
  }
  interface CreatePostFormProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    setFetcher: (value: boolean) => void
  }
  interface UpdatePostFormProps extends CreatePostFormProps {
    post: PostDetail
    setFetcher: (value: boolean) => void
  }
  interface SearchFormProps {
    setSearch: (value: string) => void
    setMode: (value: string) => void
    setFetcher: (value: boolean) => void
  }
  interface DisplayPostProps {
    posts: PostDetail[]
    deletePost: (id: number) => void
    setFetcher: (value: boolean) => void
  }

  interface PostProps {
    post: PostDetail
    deletePost: (id: number) => void
    setFetcher: (value: boolean) => void
  }
}
