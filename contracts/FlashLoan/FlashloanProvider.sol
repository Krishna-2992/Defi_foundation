// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IFlashloanUser.sol";

contract FlashloanProvider is ReentrancyGuard {
    mapping (address => IERC20) public tokens;

    constructor(address[] memory _tokens) {
        for(uint i=0; i<_tokens.length; i++) {
            tokens[_tokens[i]] = IERC20(_tokens[i]);
        }
    }

    function executeFlashloan(
        address callback, 
        uint amount, 
        address _token, 
        bytes memory data
    ) external nonReentrant {
        IERC20 token = tokens[_token];
        uint originalBalance = token.balanceOf(address(this));
        require(address(token) != address(0), "token not supported");
        require(originalBalance >= amount, "amount too high");
        token.transfer(callback, amount);
        IFlashloanUser(callback).falshloanCallback(amount, _token, data);
        require(
            token.balanceOf(address(this)) == originalBalance, 
            "fallback not reimbursed"
        );
    }

    
}