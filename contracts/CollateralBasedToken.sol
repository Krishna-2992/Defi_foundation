// SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CollateralBasedToken is ERC20 {
    IERC20 public collateral;
    uint public price = 1;

    constructor(address _collateral) ERC20("Collateral Based Token", "CBT") {
        collateral = IERC20(_collateral);
    }

    function deposit(uint collateralAmount) external {
        collateral.transferFrom(msg.sender, address(this), collateralAmount);
        _mint(msg.sender, collateralAmount*price);
    }

    function withdraw(uint amount) external {
        require(balanceOf(msg.sender) >= amount, "insufficient balance");
        _burn(msg.sender, amount);
        collateral.transferFrom(address(this), msg.sender, amount);

    }
}

