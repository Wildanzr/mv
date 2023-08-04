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
}
