// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceToken is ERC20, Ownable {
    constructor() ERC20('Government Token', 'GTK') Ownable(msg.sender) {}

    function mint(address to, uint amount) external {
        _mint(to, amount);
    }
}