import BottomNav from '@/components/bottom-nav'
import TopNav from '@/components/top-nav'
import { usePrivy } from '@privy-io/react-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const queryClient = new QueryClient()
interface Props {
  children: React.ReactNode
}

const AuthenticatedPage = ({ children }: Props) => {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) router.push('/')
  }, [ready, authenticated, router])

  return (
    <div className='bg-white'>
      <TopNav />
      <main className='mx-auto pt-20 pb-16 px-safe sm:pb-0'>
        <div className='p-6 w-full'>{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}

export default AuthenticatedPage
