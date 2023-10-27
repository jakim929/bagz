import BottomNav from '@/components/bottom-nav'
import TopNav from '@/components/top-nav'
import { usePrivy } from '@privy-io/react-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { createConfig, http } from 'wagmi'
import { baseGoerli, foundry } from 'wagmi/chains'

export const config = createConfig({
  chains: [foundry],
  transports: {
    [foundry.id]: http('http://127.0.0.1:8545'),
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
          <main className='mx-auto pt-20 pb-16 px-safe sm:pb-0'>
            <div className='p-6 w-full'>{children}</div>
          </main>
          <BottomNav />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default AuthenticatedPage
