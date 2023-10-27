import { BagzAbi } from '@/abis/BagzAbi'
import { Listing } from '@/lib/types'
import { karla } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { multicall } from 'viem/actions'
import { useChainId, usePublicClient, useReadContract, useReadContracts } from 'wagmi'

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
  const { data: listingsCount } = useReadContract({
    address: process.env.NEXT_PUBLIC_BAGZ_CONTRACT_ADDRESS as `0x${string}`,
    chainId: 31337,
    abi: BagzAbi,
    functionName: 'listingCount',
  })
  const chainId = useChainId()
  console.log('lukas', chainId)
  const client = usePublicClient({ chainId: 31337 })
  const { data } = useReadContracts({
    contracts: Array.from(Array(Number(listingsCount ?? 0)).keys()).map((i) => ({
      address: process.env.NEXT_PUBLIC_BAGZ_CONTRACT_ADDRESS as `0x${string}`,
      abi: BagzAbi,
      functionName: 'listings',
      args: [i],
    })),
  })

  const listings: Listing[] = data
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    ? data.map(({ result }: { result: any[] }) => ({
      id: result[0],
      price: result[1],
      owner: result[2],
      referralReward: result[3],
      title: result[4],
      description: result[5],
      imageURL: result[6],
    }))
    : []

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
