import StackedTopNavLayout from '@/components/stacked-top-nav-layout'
import { useRouter } from 'next/router'

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

export default function Page() {
  const router = useRouter()
  const { listingId } = router.query

  return (
    <StackedTopNavLayout>
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 p-6 '>
          listing {listingId}
        </div>
        <div className='flex px-6 py-4'>
          <Button onClick={() => router.push('/listing/1')}>Buy now</Button>
        </div>
      </div>
    </StackedTopNavLayout>
  )
}
