// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../src/Bagz.sol";
import "../src/MockUSDC.sol";

// import { GameStateType, RoundStateType } from "../src/common.sol";

contract BagzTest is Test {

  event AlarmCreated(address indexed user,uint256 stakeAmount, uint256 endTime, string message);
  event AlarmClosed(address indexed user, uint256 stakeAmount, uint256 endTime, string message);
  event AlarmSlashed(address indexed user, address slasher, uint256 stakeAmount, uint256 endTime, string message);

		MockUSDC public usdc;
    Bagz public bagz;
    address public owner;

    address internal bob;
    address internal sally;
		address internal pete;

		uint256 public startingUsdcBalance = 100_000_000_000_000;
		uint256 public referralReward = 1_000_000;
		uint256 public referralPool = 1_000_000_00;

    function setUp() public {
			owner = makeAddr('owner');
			bob = makeAddr("bob");
			sally = makeAddr("sally");
			pete = makeAddr("pete");

			vm.deal(bob, 100 ether);
			vm.deal(sally, 100 ether);
			vm.deal(pete, 100 ether);


			usdc = new MockUSDC();
			bagz = new Bagz(owner, address(usdc));

			dealUsdc(bob);
			dealUsdc(sally);

			approveUsdc(bob);
			approveUsdc(sally);

    }

		function dealUsdc(address user) internal {
			// 100k usdc
			usdc.mint(user, startingUsdcBalance);

			assertEq(usdc.balanceOf(user), startingUsdcBalance);
		}


		function approveUsdc(address user) internal {
			// 100k usdc
			vm.prank(user);
			usdc.approve(address(bagz), startingUsdcBalance);
		}

    function registerItem(address user, uint256 price) public {

			string memory title = "title";
			string memory description = "description";
			string memory imageUrl = "imageUrl";


			uint256 listingId = bagz.listingCount();



			vm.prank(user);



			// 1 dollar referral, 100 pool
			bagz.registerItem(price, referralReward, referralPool, title, description, imageUrl);

			assertEq(usdc.balanceOf(address(bagz)), referralPool);

			assertEq(usdc.balanceOf(address(user)), startingUsdcBalance - referralPool);


			assertEq(listingId, 0);

			assertEq(bagz.referralPools(listingId), referralPool);
    }


		// no time to write unit tests :(
    function test_happyPath_happyPath_succeeds() external {
			// vm.prank(address(bagz));
			// usdc.transferFrom(bob, address(bagz), 100_000);
			uint256 price = 1_000_000;

      registerItem(bob, price);

			vm.prank(pete);
			bagz.signUp();

			vm.prank(sally);
			bagz.signUpWithReferral(pete);

			assertEq(bagz.referrals(sally), pete);

			vm.prank(sally);
			bagz.purchase(0, 0);

			assertEq(usdc.balanceOf(address(sally)), startingUsdcBalance - price);

			assertEq(bagz.rewardBalances(pete), referralReward);
    }
}
