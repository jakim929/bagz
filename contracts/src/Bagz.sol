// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Owned } from "solmate/auth/Owned.sol";
import { ERC20 } from "solmate/tokens/ERC20.sol";

contract Bagz is Owned {
  event SignedUp(address indexed user, address referrer);
  event ListingCreated(uint256 indexed listingId, address indexed creator, uint256 price, string metadata, uint256 referralReward);
  event ListingPurchased(uint256 indexed listingId, address indexed buyer, uint256 price);

  struct Listing {
    uint256 price;
    address owner;
    string metadata;
    uint256 referralReward;
  }

  ERC20 immutable public erc20Token;

  uint256 public listingCount;

  mapping(address => address) public referrals;
  mapping(address => uint256) public rewardBalances;
  mapping(address => bool) public users;

  mapping(uint256 => Listing) public listings;

  mapping(uint256 => uint256) public referralPools;

  constructor(address _owner, address _erc20TokenAddress) Owned(_owner) {
    erc20Token = ERC20(_erc20TokenAddress);
  }

  function signUpWithReferral(address _referrer) public {
    require(!users[msg.sender], "User already signed up");
    require(_referrer != msg.sender, "Cannot refer yourself");
    require(users[_referrer], "Referrer must be a user");

    referrals[msg.sender] = _referrer;
    users[msg.sender] = true;

    emit SignedUp(msg.sender, _referrer);

  }

  function signUp() public {
    require(!users[msg.sender], "User already signed up");

    users[msg.sender] = true;

    emit SignedUp(msg.sender, address(0));
  }

  function registerItem(uint256 _price, uint256 _referralReward, string memory _metadata) public {
    listings[listingCount] = Listing({
      owner: msg.sender,
      price: _price,
      metadata: _metadata,
      referralReward: _referralReward
    });

		// erc20Token.transferFrom(msg.sender, )

    emit ListingCreated(listingCount, msg.sender, _price, _metadata, _referralReward);

    listingCount++;
  }

  function purchase(uint256 _listingId) public {
    require(!users[msg.sender], "User already signed up");

  }
}
