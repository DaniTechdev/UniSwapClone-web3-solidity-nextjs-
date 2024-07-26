const axios = require("axios");

// const ETHERSCAN_API_KEY = "TDZCV8SD1AYAM713SGW5UA6BPT98U6N273";
const ETHERSCAN_API_KEY = "QQ26CVR6SZ7W4FDC1IRAZGNWAZQQZES55G";

//getting abi of the contract from the forked etherscan contracts I want to usse for seapping based on what many will love to swap
const getAbi = async (address) => {
  const url = `api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);

  return abi;
};

//get uniswap poolImmutable sdk and getting out token0, token1, fee from it
const getPoolImmutables = async (poolContract) => {
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

export { getAbi, getPoolImmutables };
