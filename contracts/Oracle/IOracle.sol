// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IOracle {
    function getData(bytes32 key) 
    external
    view 
    returns(bool result, uint timestamp, uint payload);
}
