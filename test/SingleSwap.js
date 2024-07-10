//We will write test for the single swap here

const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const { WETH9 } = require("@uniswap/smart-order-router");
const { expect } = require("chai");
const { ethers } = require("hardhart");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const USDC = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";

describe("SingleSwapToken", () => {
  //singleSwapToken define the insstance of the contract
  let singleSwapToken;
  let accounts;
  let weth;
  let dai;
  let usdc;

  before(async () => {
    accounts = await getSigners(1);

    const SingleSwapToken = await getContractFactory(SingleSwapToken);
    singleSwapToken = await SingleSwapToken.deploy();

    await singleSwapToken.deployed(); //note the ethers js we have used is coming from hardhat for testing, we are not using from ether js package itself because in ethers package we wont fine the getContractAt method

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI); //IERC20 is coming from UNISWAP
    usdc = await ethers.getContractAt("IERC20", USDC);

    console.log(weth);
    console.log(dai);
    console.log(usdc);
    console.log(accounts);
    console.log(singleSwapToken);
  });
});
