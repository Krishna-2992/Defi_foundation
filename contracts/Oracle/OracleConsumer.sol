// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IOracle.sol";

contract OracleConsumer {
    IOracle public oracle;

    constructor(address _oracle) {
        oracle = IOracle(_oracle);
    }
    function foo() external view returns(uint256){
        bytes32 key = keccak256(abi.encodePacked('BTC/USD'));
        (bool result, uint timestamp, uint data) = oracle.getData(key);
        require(result, "could not fetch data");
        require(timestamp >= block.timestamp - 2 minutes, "price too old");
        // do something with the price
        return data;
    }
}
