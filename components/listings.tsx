import { Listing } from '@/lib/types'
import { karla } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'
import { formatUnits, parseUnits } from 'viem'

const Listing = ({ title, description, imageURL, price, id }: Listing) => {
  return (
    <Link href={`/listing/${id.toString()}`} className={`flex flex-col ${karla.className} flex-grow-0 flex-shrink-0`}>
      <div>
        <Image src={imageURL} alt={title} width={140} height={140} className='flex-shrink-0 rounded-md' />
      </div>
      <span className='text-black font-semibold'>{title}</span>
      <span className='text-zinc-40 w-36 text-sm max-h-24 text-ellipsis whitespace-nowrap'>
        {description}
      </span>
      <div className='flex flex-row space-x-1'>
        <Image src='/images/usdc.svg' alt='usdc' width={16} height={16} />
        <span className='text-sm text-black font-semibold'>{formatUnits(price, 6)}</span>
      </div>
    </Link>
  )
}

const Listings = () => {
  const listings: Listing[] = [{
    id: BigInt(1),
    title: 'Ledger',
    description: 'Ledger NanoX',
    imageURL: 'https://i.ibb.co/wpvnWXx/ledger-nano-img.jpg',
    price: parseUnits('100', 6),
    owner: '0x7C745902B3d90f474337463adef754d18b4121E6',
    referralReward: parseUnits('1', 6),
  }, {
    id: BigInt(2),
    title: 'Ledger',
    description: 'Ledger NanoX',
    imageURL: 'https://i.ibb.co/wpvnWXx/ledger-nano-img.jpg',
    price: parseUnits('100', 6),
    owner: '0x7C745902B3d90f474337463adef754d18b4121E6',
    referralReward: parseUnits('1', 6),
  }, {
    id: BigInt(3),
    title: 'Ledger',
    description: 'Ledger NanoX',
    imageURL: 'https://i.ibb.co/wpvnWXx/ledger-nano-img.jpg',
    price: parseUnits('100', 6),
    owner: '0x7C745902B3d90f474337463adef754d18b4121E6',
    referralReward: parseUnits('1', 6),
  }]

  return (
    <div className={`w-full flex flex-col items-start ${karla.className} space-y-4`}>
      <div className='flex flex-col w-full space-y-2'>
        <span className='text-black text-2xl font-bold'>Daily Deals</span>
        <div className={`w-screen flex flex-row space-x-6 overflow-x-scroll pr-12`}>
          {listings.map((listing) => <Listing key={listing.title} {...listing} />)}
        </div>
      </div>
      <div className='flex flex-col w-full space-y-2'>
        <span className='text-black text-2xl font-bold'>Crypto</span>
        <div className={`w-screen flex flex-row space-x-6 overflow-x-scroll pr-12`}>
          {listings.map((listing) => <Listing key={listing.title} {...listing} />)}
        </div>
      </div>
      <div className='flex flex-col w-full space-y-2'>
        <span className='text-black text-2xl font-bold'>Daily Deals</span>
        <div className={`w-screen flex flex-row space-x-6 overflow-x-scroll pr-12`}>
          {listings.map((listing) => <Listing key={listing.title} {...listing} />)}
        </div>
      </div>
    </div>
  )
}

export default Listings
