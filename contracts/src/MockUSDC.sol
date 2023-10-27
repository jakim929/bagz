// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Owned } from "solmate/auth/Owned.sol";
import { ERC20 } from "solmate/tokens/ERC20.sol";

contract MockUSDC is ERC20 {
	constructor() ERC20("Mock USDC", "USDC", 6) {
	}
}
