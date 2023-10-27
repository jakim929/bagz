import { BagzAbi } from '@/abis/BagzAbi'
import StackedTopNavLayout from '@/components/stacked-top-nav-layout'
import { useRouter } from 'next/router'
import { Address, formatUnits, parseUnits } from 'viem'
import { useContractRead, useReadContract } from 'wagmi'

const Button = ({
  className,
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex justify-center text-lg rounded-full w-full p-4 border-[2px] border-black font-bold ${className}`}
    >
      {children}
    </button>
  )
}

const useListing = (listingId: bigint) => {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_BAGZ_CONTRACT_ADDRESS as Address,
    abi: BagzAbi,
    functionName: 'listings',
    args: [listingId],
    chainId: 31337,
  })
}

export default function Page() {
  const router = useRouter()
  const { listingId } = router.query

  const { data } = useListing(BigInt((listingId || '0') as string))

  const [id, price, owner, referralReward, title, description, imageUrl] = data
  console.log(data)

  return (
    <StackedTopNavLayout>
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 p-6 '>
          <div className=''>
            <img src={imageUrl} className='w-full' />
          </div>
          <div className='flex flex-col'>
            <div>
              {title}
            </div>
            <div>
              {description}
            </div>
            <div>
              {formatUnits(price, 6)}
            </div>
          </div>
        </div>
        <div className='flex px-6 py-4'>
          <Button onClick={() => router.push('/listing/1')}>Buy now</Button>
        </div>
      </div>
    </StackedTopNavLayout>
  )
}
