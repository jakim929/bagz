import { akira } from '@/pages'
import { useLogout, usePrivy } from '@privy-io/react-auth'
import Rewards from './rewards'

const TopNav = () => {
  const { ready, authenticated } = usePrivy()
  const { logout } = useLogout()

  return (
    <div className='fixed top-0 left-0 z-20 w-full bg-white flex flex-row justify-between py-8 px-4'>
      <span className={`text-3xl text-black ${akira.className}`}>BAGZ</span>
      <Rewards />
    </div>
  )
}

export default TopNav
