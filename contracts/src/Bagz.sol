// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Owned } from "solmate/auth/Owned.sol";

contract Bagz is Owned {
	constructor(address _owner) Owned(owner) {

	}
}
