import { karla } from '@/pages'
import { usePrivy } from '@privy-io/react-auth'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const BreadCrumbTopBar = () => {
  return (
    <div className='p-6 flex justify-center relative border-b border-gray-200'>
      <button className='absolute left-[24px]'>
        <ChevronLeft className='w-6 h-6' />
      </button>
      <div className='font-semibold'>
        Ledger
      </div>
    </div>
  )
}

const StackedTopNavLayout = ({ children }: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) router.push('/')
  }, [ready, authenticated, router])

  return (
    <div className={`bg-white flex-1 flex flex-col ${karla.className}`}>
      <BreadCrumbTopBar />
      <div className='flex-1 flex flex-col'>{children}</div>
    </div>
  )
}

export default StackedTopNavLayout
