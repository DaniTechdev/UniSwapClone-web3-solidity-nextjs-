//We will write test for the single swap here

const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
// const { WETH9, log } = require("@uniswap/smart-order-router");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
// const DAI_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
// const USDC_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

describe("SingleSwapToken", () => {
  //singleSwapToken define the insstance of the contract
  let singleSwapToken;
  let accounts;
  let weth;
  let dai;
  let usdc;

  before(async () => {
    accounts = await ethers.getSigners(1);

    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");

    singleSwapToken = await SingleSwapToken.deploy();

    await singleSwapToken.deployed(); //note the ethers js we have used is coming from hardhat for testing, we are not using from ether js package itself because in ethers package we wont fine the getContractAt method

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI); //IERC20 is coming from UNISWAP
    usdc = await ethers.getContractAt("IERC20", USDC);

    // console.log(weth);
    // console.log(dai);
    // console.log(usdc);
    // console.log(accounts);
    // console.log(singleSwapToken);
  });

  it("swapExactInputSingle", async () => {
    const amountIn = 10n ** 18n;

    //Let's deposit WETH

    await weth.deposit({ value: amountIn });
    await weth.approve(singleSwapToken.address, amountIn);

    //SWAP
    await singleSwapToken.swapExactInputSingle(amountIn);
    console.log("DAI balance", await dai.balanceOf(accounts[0].address));
    // console.log(weth);
    // console.log(dai);
    // console.log(usdc);
    // console.log(accounts);
    // console.log(singleSwapToken);
  });

  it("swapExactOutputSingle", async () => {
    const wethAmountInMax = 10n ** 18n;
    const daiAmountOut = 100n * 10n ** 18n;

    //DEPOSIT WETH
    await weth.deposit({ value: wethAmountInMax });
    await weth.approve(singleSwapToken.address, wethAmountInMax);

    //SWAP
    await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmountInMax);
    console.log(accounts[0].address);
    console.log(accounts[1].address);
    console.log("Dai balance", await dai.balanceOf(accounts[0].address));
    console.log("Dai balance", await dai.balanceOf(accounts[1].address));
  });
});
