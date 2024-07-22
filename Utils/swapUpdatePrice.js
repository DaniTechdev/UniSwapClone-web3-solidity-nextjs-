import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers, BigNumber } from "ethers";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";

//GET DATA RIGHT
const V3_SWAP_ROUTER_ADDRESSSS = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";

//GET PRICE
const chainId = 1;

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/otFsUuSsaf38rr94Aslr2OUYKzMqHRoS"
);

const router = new AlphaRouter({ chainId: chainId, provider: provider });

const name0 = "wrapped Ether";
const symbol0 = "WETH";
const decimals0 = 18;
const address0 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

//Dai contract addresss is at Api feature or I can copy from etherscan
const name1 = "DAI";
const symbol1 = "DAI";
const decimals1 = 18;
const address1 = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
const DAI = new Token(chainId, address1, decimals1, symbol1, name1);

export const swapUpdatedPrice = async (
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, 100); //this will help to convert to percentage
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
  const CurrencyAmount = CurrencyAmount.fromRawAmount(
    WETH,
    BigNumber.from(wei)
  );

  const route = await router.route(CurrencyAmount, DAI, TradeType.EXACT_INPUT, {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  });

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESSSS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000),
  };

  const quoteAmountOut = route.quote.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);

  console.log(quoteAmountOut, ratio);

  return [transaction, quoteAmountOut, ratio];
};
