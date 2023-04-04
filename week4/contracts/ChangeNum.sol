// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChangeNum{
    uint256 constant public CONST_NUM = 100;

    uint256 private _value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 value);

    // Stores a new value in the contract
    function init(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }

    function setValue(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function getConstNum() public pure returns (uint256) {
        return CONST_NUM;
    }

}