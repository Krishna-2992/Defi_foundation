// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IFlashloanUser {
    function falshloanCallback(uint amount, address token, bytes memory data) external;
}


