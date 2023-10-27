// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Owned } from "solmate/auth/Owned.sol";
import { ERC20 } from "solmate/tokens/ERC20.sol";
import { ReentrancyGuard } from "solmate/utils/ReentrancyGuard.sol";

contract Bagz is Owned, ReentrancyGuard{
  event SignedUp(address indexed user, address referrer);
  event ListingCreated(uint256 indexed listingId, address indexed creator, uint256 price, uint256 referralReward, string title, string description, string imageUrl);
  event ListingPurchased(uint256 indexed listingId, address indexed buyer);
	event ReferralRewardReceived(uint256 indexed listingId, address indexed referrer, address indexed referredBuyer, uint256 rewardAmount);

  struct Listing {
    uint256 price;
    address owner;
	  uint256 referralReward;
    string title;
		string description;
		string imageUrl;
  }

  ERC20 immutable public erc20Token;

  uint256 public listingCount;

  mapping(address => address) public referrals;

  mapping(address => uint256) public rewardBalances;

  mapping(address => bool) public users;

  mapping(uint256 => Listing) public listings;

  mapping(uint256 => uint256) public referralPools;

	mapping(address => uint256) public salesProceeds;

  constructor(address _owner, address _erc20TokenAddress) Owned(_owner)  {
    erc20Token = ERC20(_erc20TokenAddress);
		listingCount = 0;
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

  function registerItem(uint256 _price, uint256 _referralReward, uint256 _referralRewardTotal, string memory _title, string memory _description, string memory _imageUrl) public {
		uint256 listingId = listingCount;

		listings[listingId] = Listing({
      owner: msg.sender,
      price: _price,
      referralReward: _referralReward,
			title: _title,
			description: _description,
			imageUrl: _imageUrl
    });

		referralPools[listingId] = _referralRewardTotal;

    listingCount++;

		erc20Token.transferFrom(msg.sender, address(this), _referralRewardTotal);

    emit ListingCreated(listingId, msg.sender, _price, _referralReward, _title, _description, _imageUrl);

  }

  function purchase(uint256 _listingId, uint256 _rewardBalanceToUse) public nonReentrant() {

		Listing memory listing = listings[_listingId];

		require(users[msg.sender], "User needs to be signed up");
		require(_rewardBalanceToUse <= rewardBalances[msg.sender], "Requested reward usage exceeds user's balance");


		require(listing.owner !=  address(0), "Listing does not exist");
		require(listing.price >= _rewardBalanceToUse, "Reward balance exceeds listing price");

		uint256 remainingPaymentBalance = listing.price - _rewardBalanceToUse;

		if (_rewardBalanceToUse > 0) {
			rewardBalances[msg.sender] -= _rewardBalanceToUse;
			salesProceeds[listing.owner] += _rewardBalanceToUse;
		}

		if (remainingPaymentBalance > 0) {
			salesProceeds[listing.owner] += remainingPaymentBalance;
			erc20Token.transferFrom(msg.sender, address(this), remainingPaymentBalance);
		}

		_distributeReferralAwards(msg.sender, _listingId);

		emit ListingPurchased(_listingId, msg.sender);
  }

	function _distributeReferralAwards(address _buyer, uint256 _listingId) internal {
		Listing memory listing = listings[_listingId];

		address referrer = referrals[_buyer];

		if (referrer != address(0)) {
			uint256 referralReward = listing.referralReward;

			uint256 referralRewardTotal = referralPools[_listingId];

			if (referralReward <= referralRewardTotal) {
				referralPools[_listingId] -= referralReward;
				rewardBalances[referrer] += referralReward;

				emit ReferralRewardReceived(_listingId, referrer, _buyer, referralReward);
			}
		}
	}

	function withdraw() public {
		require(salesProceeds[msg.sender] > 0, "No sales proceeds to withdraw");

		uint256 balance = salesProceeds[msg.sender];
		salesProceeds[msg.sender] = 0;

		erc20Token.transfer(msg.sender, balance);
	}
}
