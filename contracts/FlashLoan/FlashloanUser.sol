// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FlashloanProvider.sol";
import "./IFlashloanUser.sol";

contract FlashloanUser is IFlashloanUser {
    function startFlashloan(
        address flashloan, 
        uint amount, 
        address token
    ) external {
        FlashloanProvider(flashloan).executeFlashloan(
            address(this), 
            amount, 
            token, 
            bytes('')
        );
    }

    function falshloanCallback(
        uint amount, 
        address token, 
        bytes memory /* data */
    ) external override {
        // do something arbitrage, liquidations, etc

        // Reimburse the tokens
        IERC20(token).transfer(msg.sender, amount);
    }
}