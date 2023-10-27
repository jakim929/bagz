import { Address } from 'viem'

export type Listing = {
  id: bigint
  price: bigint
  owner: Address
  referralReward: bigint
  title: string
  description: string
  imageURL: string
}
