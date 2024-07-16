const { expect } = require("chai");
const { ethers, network } = require("hardhat");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

//since in our liquidity, we will need account that has Dai and Usdc in order to test our liquididy. we will have to
//unlock an account that contains Dai and Usdc from mainnet and use it in our testnet

//this two account were unlocked from th mainnet to forknet

const DAI_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
// const USDC_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
const USDC_WHALE = "0x4B16c5dE96EB2117bBE5fd171E4d203624B014aa";

describe("LiquidityExamples", () => {
  let liquidityExamples;
  let accounts;
  let dai;
  let usdc;

  before(async () => {
    accounts = await ethers.getSigners(1);
    const LiquidityExamples = await ethers.getContractFactory(
      "LiquidityExamples"
    );

    liquidityExamples = await LiquidityExamples.deploy();
    await liquidityExamples.deployed();

    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
    // console.log("dai", dai);
    // console.log("usdc", usdc);
    // Fund the impersonated accounts with Ether
    await accounts[0].sendTransaction({
      to: DAI_WHALE,
      value: ethers.utils.parseEther("1.0"),
    });
    await accounts[0].sendTransaction({
      to: USDC_WHALE,
      value: ethers.utils.parseEther("1.0"),
    });

    //Unlock DAI and USDC whales to use it

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    });

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [USDC_WHALE],
    });

    const daiWhale = await ethers.getSigner(DAI_WHALE);
    const usdcWhale = await ethers.getSigner(USDC_WHALE);

    console.log("whale_address balance", await dai.balanceOf(daiWhale.address));

    // console.log("Whale object", usdcWhale);

    //Send DAI and USDC to accounts[0] since our metamask account contains only ether
    const daiAmount = 10n ** 18n;
    const usdcAmount = 10n ** 6n;

    const daiBal = await dai.balanceOf(daiWhale.address);
    const usdcBal = await usdc.balanceOf(usdcWhale.address);
    console.log(daiBal, usdcBal, daiAmount, usdcAmount);

    expect(await dai.balanceOf(daiWhale.address)).to.gte(daiAmount);
    expect(await usdc.balanceOf(usdcWhale.address)).to.gte(usdcAmount);

    await dai.connect(daiWhale).transfer(accounts[0].address, daiAmount);
    await usdc.connect(usdcWhale).transfer(accounts[0].address, usdcAmount);

    console.log(
      "balance of dai from hardhat account,",
      await dai.balanceOf(accounts[0].address),
      await usdc.balanceOf(accounts[0].address)
    );
  });

  it("mintNewPosition", async () => {
    // const daiAmount = 100n * 10n ** 18n;
    // const usdcAmount = 100n * 10n ** 6n;
    const daiAmount = 10n ** 18n;
    const usdcAmount = 10n ** 6n;
    await dai
      .connect(accounts[0])
      .transfer(liquidityExamples.address, daiAmount);
    await usdc
      .connect(accounts[0])
      .transfer(liquidityExamples.address, usdcAmount);

    await liquidityExamples.mintNewPosition();

    console.log(
      "dai balance after adding liquidity",
      await dai.balanceOf(accounts[0].address)
    );
    console.log(
      "usdc balance after adding liquidity",
      await usdc.balanceOf(accounts[0].address)
    );
  });
});
