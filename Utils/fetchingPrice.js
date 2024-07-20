const { ethers } = require("ethers");

//IUniswapV3PoolABI will get use the IUniswapV3PoolABI from the unisswap
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");

//the quoterABI will give use the price the output will get before we swap the token
const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const { getAbi, getPoolImmutables } = require("./priceHelpers");
