import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";

//INTERNAL IMPORT
import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithBooToken,
  connectingWithLifeToken,
  connectingWithSingleSwapContract,
  connectingWithIWETHToken,
  connectingWithDAIToken,
} from "../Utils/apiFeatures";

import { IWETHABI } from "./constants";
import { log } from "@uniswap/smart-order-router";
// import ERC20Data from "./IWETH.json";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  //USESTATE
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokenData] = useState([]);

  const addToken = [
    // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //WETH9 token mainnetoken
    "0x49AeF2C4005Bf572665b09014A563B5b9E46Df21", //Boo token
    "0xa9efDEf197130B945462163a0B852019BA529a66", //Life Token
  ];

  //FETCH DATA
  //When a user come to our application we have to display some
  //information about the user, therefore we have to fetch data\

  const fetchingData = async () => {
    try {
      //GET USER ACCOUNT
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);

      //CREATE PROVIDER(so that the user can interact with the smart contracts)
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      //CHECK Balance
      const balance = await provider.getBalance(userAccount);
      // console.log("balanceFromProvider", balance);
      //the balance will come in a BigNumber
      //and have to be converted in a  readable format through thiss processes
      const converBal = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(converBal);
      // console.log("converTed balance", converBal);
      // console.log("ethValue in readble format", ethValue);

      setEther(ethValue);

      //GET NEWTWORK (networkname)
      const network = await provider.getNetwork();
      setNetworkConnect(network.name);
      // console.log(network.name, network);

      //ALL TOKENS BALANCE
      addToken.map(async (el, i) => {
        //GETTING CONTRACT
        const contract = new ethers.Contract(el, IWETHABI, provider);

        //GETTING BALANCE

        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        //GET NAME AND SYMBOL
        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
        });

        // console.log("tokenData", tokenData);

        //WETH9 BALANCE
        const weth = await connectingWithIWETHToken();
        // console.log("WETH", weth);
        const wethBal = await weth.balanceOf(userAccount);
        const wethTokenLeft = BigNumber.from(wethBal).toString();
        const convertwethTokenBal = ethers.utils.formatEther(wethTokenLeft);
        setWeth9(convertwethTokenBal);

        //DAI BALANCE
        const daiContract = await connectingWithDAIToken();
        const daiBal = await daiContract.balanceOf(userAccount);
        const daiTokenLeft = BigNumber.from(daiBal).toString();
        const convertdaiTokenBal = ethers.utils.formatEther(daiTokenLeft);
        setDai(convertdaiTokenBal);

        // console.log("dai", "weth9", dai, weth9);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  //SINGLE SWAP TOKEN
  const singleSwapToken = async () => {
    try {
      let singleSwapToken;
      let weth;
      let dai;

      singleSwapToken = await connectingWithSingleSwapContract();
      // console.log("singleSwapToken", singleSwapToken);
      weth = await connectingWithIWETHToken();
      dai = await connectingWithDAIToken();

      // console.log("weth", weth);
      // console.log("dai", dai);
      //let's deposit into weth to send to uniswap router, approve it and convert to dai
      const amountIn = 10n ** 18n;
      await weth.deposit({ value: amountIn });
      await weth.approve(singleSwapToken.address, amountIn);

      //let's do the swap
      await singleSwapToken.swapExactInputSingle(amountIn, {
        gasLimit: 300000,
      });
      // const daiContract = await connectingWithDAIToken();
      const balance = await dai.balanceOf(account);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(transferAmount);
      setDai(ethValue);

      console.log("dai balance", ethValue);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   singleSwapToken();
  // }, []);
  return (
    <SwapTokenContext.Provider
      value={{
        singleSwapToken,
        connectWallet,
        account,
        weth9,
        dai,
        networkConnect,
        ether,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
