import BottomNav from '@/components/bottom-nav'
import Meta from '@/components/meta'
import TopNav from '@/components/top-nav'
import { usePrivy } from '@privy-io/react-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { createConfig, http } from 'wagmi'
import { foundry } from 'wagmi/chains'
import '@/styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'

const config = createConfig({
  chains: [foundry],
  transports: {
    [foundry.id]: http('http://127.0.0.1:8545'),
  },
})

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        loginMethods: ['sms', 'apple', 'google'],
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
      }}
    >
      <Meta />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  )
}

export default App
