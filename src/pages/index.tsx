import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/login')
  }, [router])
  return null
}

export default Index;