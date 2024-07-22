const axios = require("axios");

const ETHERSCAN_API_KEY = "TDZCV8SD1AYAM713SGW5UA6BPT98U6N273";

//getting abi of the contract from the forked etherscan contracts I want to usse for seapping based on what many will love to swap
export const getAbi = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=&{ETHERSCAN_API_KEY}`;
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);

  return abi;
};

//get uniswap poolImmutable sdk and getting out token0, token1, fee from it
export const getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };

  return immutables;
};
