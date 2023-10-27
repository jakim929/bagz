import { BagzAbi } from '@/abis/BagzAbi'
import { MockUSDCAbi } from '@/abis/MockUSDCAbi'
import 'dotenv/config'
import { Address, createTestClient, createWalletClient, http, parseEther, parseUnits } from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { foundry } from 'viem/chains'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const listing = {
  title: 'Ledger Nano X',
  description: 'Ledger Nano X a hardware wallet',
  imageUrl: 'https://ibb.co/p4mHz89',
}

const parseUsdc = (amount: string) => {
  return parseUnits(amount, 6)
}

const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(),
})

const spawnFundedWallet = async (anvil: typeof testClient) => {
  const newAccount = privateKeyToAccount(generatePrivateKey())

  await anvil.setBalance({
    address: newAccount.address,
    value: parseEther('10'),
  })

  return createWalletClient({
    chain: foundry,
    account: newAccount,
    transport: http(process.env.NEXT_PUBLIC_JSON_RPC_HTTP_URL!),
  })
}

const initializeWallet = async (anvil: typeof testClient) => {
  const amount = parseUsdc('1000000')
  const walletClient = await spawnFundedWallet(anvil)
  await walletClient.writeContract({
    abi: MockUSDCAbi,
    address: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as Address,
    functionName: 'mint',
    args: [walletClient.account.address, amount],
  })

  await walletClient.writeContract({
    abi: MockUSDCAbi,
    address: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as Address,
    functionName: 'approve',
    args: [process.env.NEXT_PUBLIC_BAGZ_CONTRACT_ADDRESS as Address, amount],
  })

  await sleep(6000)

  return walletClient
}

const createListing = async () => {
  const price = parseUsdc('10')
  const referralAward = parseUsdc('1')
  const referralTotal = parseUsdc('100')
  const newWalletClient = await initializeWallet(testClient)
  const result = await newWalletClient.writeContract({
    abi: BagzAbi,
    address: process.env.NEXT_PUBLIC_BAGZ_CONTRACT_ADDRESS as Address,
    functionName: 'registerItem',
    // set for 20 seconds later
    args: [price, referralAward, referralTotal, listing.title, listing.description, listing.imageUrl],
  })
  console.log('created an item with', newWalletClient.account.address, result)
}

const createSlashableAlarms = async () => {
  // if (newWalletClient.chain.id !== 31337) {
  //   console.log('only run on test chain')
  //   return
  // }

  for (let i = 0; i < 10; i++) {
    await Promise.all([createListing()])
    await sleep(5000)
  }
}

createSlashableAlarms()
