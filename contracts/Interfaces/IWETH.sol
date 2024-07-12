//SPDX-License-identifier:GPL-2.0-or-later

pragma solidity >=0.7 <0.9.0;

//we will define interface fro our entire ERC token
//The functions defined inside the IWETH are the basic functions found in ERC tokens/contracts

interface IWETH {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function deposit() external payable;

    function withdraw(uint) external;

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(
        address recipient,
        uint amount
    ) external view returns (uint);

    function allowance(address spender, uint amount) external returns (bool);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);

    event Approve(address indexed owner, address indexed spender, uint value);
}
