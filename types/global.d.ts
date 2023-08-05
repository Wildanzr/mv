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
}
