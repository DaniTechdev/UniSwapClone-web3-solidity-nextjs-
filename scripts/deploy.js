const hre = require("hardhat");

async function main() {
  //ERC20 BOO TOKEN
  const BooToken = await hre.ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();
  await booToken.deployed();
  console.log(`deployed to the contract address: ${booToken.address}`);
  // console.log(booToken);

  //ERC20 LifeToken TOKEN
  const LifeToken = await hre.ethers.getContractFactory("LifeToken");
  const lifeToken = await BooToken.deploy();
  await lifeToken.deployed();
  console.log(`deployed to the contract address: ${lifeToken.address}`);
  // console.log(lifeToken);

  // SingleSwapToken contract
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployed();
  console.log(`deployed to the contract address: ${singleSwapToken.address}`);
  // console.log( SingleSwapToken);

  //  SwapMultiHop
  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();
  await swapMultiHop.deployed();
  console.log(`deployed to the contract address: ${swapMultiHop.address}`);
  // console.log(  SwapMultiHop);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
