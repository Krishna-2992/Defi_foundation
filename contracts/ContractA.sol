// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ContractB {
    function deposit(uint amount) external;
    function withdraw(uint amount) external; 
}

contract ContractA {
    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }
    function deposit(uint amount) public {
        token.transferFrom(msg.sender, address(this), amount);
    }
    function withdraw(uint amount) public {
        token.transfer(msg.sender, amount);
    }
}