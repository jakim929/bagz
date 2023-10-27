import { BagzAbi } from '@/abis/BagzAbi'
import { MockUSDCAbi } from '@/abis/MockUSDCAbi'
import 'dotenv/config'
import { Address, createTestClient, createWalletClient, http, parseEther, parseUnits } from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { foundry } from 'viem/chains'

const USDC_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as Address
const BAGZ_CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as Address

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
    transport: http('http://127.0.0.1:8545'),
  })
}

const initializeWallet = async (anvil: typeof testClient) => {
  const amount = parseUsdc('10000000')
  const walletClient = await spawnFundedWallet(anvil)

  await walletClient.writeContract({
    abi: MockUSDCAbi,
    address: USDC_CONTRACT_ADDRESS as Address,
    functionName: 'mint',
    args: [walletClient.account.address, amount],
  })

  await walletClient.writeContract({
    abi: MockUSDCAbi,
    address: USDC_CONTRACT_ADDRESS as Address,
    functionName: 'approve',
    args: [BAGZ_CONTRACT_ADDRESS as Address, amount],
  })

  return walletClient
}

const createListing = async () => {
  const price = parseUsdc('10')
  const referralAward = parseUsdc('1')
  const referralTotal = parseUsdc('100')
  const newWalletClient = await initializeWallet(testClient)
  const result = await newWalletClient.writeContract({
    abi: BagzAbi,
    address: BAGZ_CONTRACT_ADDRESS as Address,
    functionName: 'registerItem',
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
    // await sleep(5000)
  }
}

createSlashableAlarms()
