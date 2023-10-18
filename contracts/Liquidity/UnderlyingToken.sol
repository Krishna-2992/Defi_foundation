// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UnderlyingToken is ERC20 {
    constructor() ERC20('LpToken', 'LTK') {}

    function faucets(address to, uint amount) external {
        _mint(to, amount);
    }
}