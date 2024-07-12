const hre = require("hardhat");

async function main() {
  //ERC20 BOO TOKEN
  const BooToken = await hre.ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();
  await booToken.deployed();
  console.log(
    ` BooToken deployed to the contract address: ${booToken.address}`
  );
  // console.log(booToken);

  //ERC20 LifeToken TOKEN
  const LifeToken = await hre.ethers.getContractFactory("LifeToken");
  const lifeToken = await LifeToken.deploy();
  await lifeToken.deployed();
  console.log(
    ` LifeToken  deployed to the contract address: ${lifeToken.address}`
  );
  // console.log(lifeToken);

  // SingleSwapToken contract
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployed();
  console.log(
    `SingleSwapToken deployed to the contract address: ${singleSwapToken.address}`
  );
  // console.log( SingleSwapToken);

  //  SwapMultiHop
  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();
  await swapMultiHop.deployed();
  console.log(
    `  SwapMultiHop deployed to the contract address: ${swapMultiHop.address}`
  );
  // console.log(  SwapMultiHop);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
