'use client'

import { Layout } from '@/components'
import { hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/auth/login')
    }
  }, [router])
  return (
    <Layout>
      <h1>Home Pagess</h1>
    </Layout>
  )
}

export default Home
