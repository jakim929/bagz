import { karla } from '@/pages'
import { useWallets } from '@privy-io/react-auth'
import Image from 'next/image'
import { useReadContract } from 'wagmi'

const Rewards = () => {
  const { wallets } = useWallets()
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy')

  return (
    <div
      className={`text-black bg-[#D0FD52] rounded-full px-4 ${karla.className} flex flex-row space-x-2 items-center justify-center font-semibold`}
    >
      <Image
        src='images/usdc.svg'
        alt='usdc'
        width={24}
        height={24}
      />
      <span>
        10 USDC
      </span>
    </div>
  )
}

export default Rewards
