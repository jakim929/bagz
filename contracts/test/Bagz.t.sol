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

    function setUp() public {
			owner = makeAddr('owner');
			bob = makeAddr("bob");
			sally = makeAddr("sally");
			vm.deal(bob, 100 ether);
			vm.deal(sally, 100 ether);

			usdc = new MockUSDC();
			bagz = new Bagz(owner, address(usdc));

			dealUsdc(bob);
			dealUsdc(sally);
    }

		function dealUsdc(address user) internal {
			// 100k usdc
			usdc.mint(user, 100_000_000_000);
		}

    function registerItem(address user, uint256 price) public {
      vm.prank(user);



    }


		// no time to write unit tests :(
    function test_happyPath_happyPath_succeeds() external {
      // bagz.registerItem();
    }
}
