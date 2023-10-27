import BottomNav from '@/components/bottom-nav'
import TopNav from '@/components/top-nav'
import { usePrivy } from '@privy-io/react-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { createConfig, http } from 'wagmi'
import { baseGoerli } from 'wagmi/chains'

export const config = createConfig({
  chains: [baseGoerli],
  transports: {
    [baseGoerli.id]: http(),
  },
})

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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className='bg-white'>
          <TopNav />
          <main className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0 bg-white'>
            <div className='p-6'>{children}</div>
          </main>
          <BottomNav />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default AuthenticatedPage
