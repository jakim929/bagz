export const BagzAbi = [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_owner',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': '_erc20TokenAddress',
        'type': 'address',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'listingId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'creator',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'referralReward',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'title',
        'type': 'string',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'description',
        'type': 'string',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'imageUrl',
        'type': 'string',
      },
    ],
    'name': 'ListingCreated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'listingId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'buyer',
        'type': 'address',
      },
    ],
    'name': 'ListingPurchased',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'OwnershipTransferred',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'listingId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'referrer',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'referredBuyer',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'rewardAmount',
        'type': 'uint256',
      },
    ],
    'name': 'ReferralRewardReceived',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'referrer',
        'type': 'address',
      },
    ],
    'name': 'SignedUp',
    'type': 'event',
  },
  {
    'inputs': [],
    'name': 'erc20Token',
    'outputs': [
      {
        'internalType': 'contract ERC20',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'listingCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'listings',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'referralReward',
        'type': 'uint256',
      },
      {
        'internalType': 'string',
        'name': 'title',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': 'description',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': 'imageUrl',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_listingId',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '_rewardBalanceToUse',
        'type': 'uint256',
      },
    ],
    'name': 'purchase',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'referralPools',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'referrals',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_price',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '_referralReward',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '_referralRewardTotal',
        'type': 'uint256',
      },
      {
        'internalType': 'string',
        'name': '_title',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': '_description',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': '_imageUrl',
        'type': 'string',
      },
    ],
    'name': 'registerItem',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'rewardBalances',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'salesProceeds',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'signUp',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_referrer',
        'type': 'address',
      },
    ],
    'name': 'signUpWithReferral',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'users',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'withdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
] as const
