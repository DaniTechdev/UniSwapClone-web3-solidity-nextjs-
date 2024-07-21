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

const MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/otFsUuSsaf38rr94Aslr2OUYKzMqHRoS";

const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

//uniswap quota address iss the same everywhere
const quotaAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

//GET PRICE FUNCTION
//GET PRICE FUNCTION
//GET PRICE FUNCTION
//GET PRICE FUNCTION
//note different pools have difference price quote thats why we pass the poolAddress as argument
export const getPrice = async (inputAmount, poolAddress) => {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  // console.log("poolContract", poolContract);
  //note poolContract will help us get address of the two tokens because every pool contains two tokens
  const tokenAddrss0 = await poolContract.token0();
  const tokenAddrss1 = await poolContract.token1();

  console.log(tokenAddrss0, tokenAddrss1);

  const tokenAbi0 = await getAbi(tokenAddrss0);
  const tokenAbi1 = await getAbi(tokenAddrss1);

  const tokenContract0 = new ethers.Contract(tokenAddrss0, tokenAbi0, provider);
  const tokenContract1 = new ethers.Contract(tokenAddrss1, tokenAbi1, provider);

  const tokenSymbol0 = await tokenContract0.symbol();
  const tokenSymbol1 = await tokenContract1.symbol();
  const tokenDecimals0 = await tokenContract0.decimals();
  const tokenDecimals1 = await tokenContract1.decimals();

  const quoterContract = new ethers.Contract(quotaAddress, QuoterABI, provider);

  const immutables = await getPoolImmutables(poolContract);

  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    tokenDecimals0
  );

  const quoteAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    0
  );

  const amountOut = ethers.utils.formatUnits(quoteAmountOut, tokenDecimals1);

  return [amountOut, tokenSymbol0, tokenSymbol0];
};
