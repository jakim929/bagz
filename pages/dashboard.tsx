import AuthenticatedPage from '@/components/authenticated-page'
import Search from '@/components/search'
import Section from '@/components/section'
import { links } from '@/lib/links'
import { usePrivy } from '@privy-io/react-auth'

const Dashboard = () => {
  // You can also import other linking methods, like linkWallet, linkEmail, linkDiscord, etc.
  const { user, linkPhone, linkGoogle, linkApple } = usePrivy()
  return (
    <AuthenticatedPage>
      <Section>
        <div className='flex flex-col items-center space-y-2'>
          <Search />
        </div>
      </Section>
    </AuthenticatedPage>
  )
}

export default Dashboard
