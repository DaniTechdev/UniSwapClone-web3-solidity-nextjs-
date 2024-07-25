import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";

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
// import { log } from "@uniswap/smart-order-router";
// import ERC20Data from "./IWETH.json";

import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatedPrice } from "../Utils/swapUpdatePrice";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  //USESTATE
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokenData] = useState([]);

  // const addToken = [
  //   "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //WETH9 token mainnetoken
  //   // "0x49AeF2C4005Bf572665b09014A563B5b9E46Df21", //Boo token
  //   // "0x06786bCbc114bbfa670E30A1AC35dFd1310Be82f", //Boo token
  //   // // "0xa9efDEf197130B945462163a0B852019BA529a66", //Life Token
  //   // "0x72F853E9E202600c5017B5A060168603c3ed7368", //Life Token
  // ];

  const addToken = [
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    "0x4278C5d322aB92F1D876Dd7Bd9b44d1748b88af2",
    "0x0D92d35D311E54aB8EEA0394d7E773Fc5144491a",
    "0x24EcC5E6EaA700368B8FAC259d3fBD045f695A08",
  ];
  // const addToken = [
  //   "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  //   "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
  //   "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //   "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  //   "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  //   "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  //   "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //   "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  //   "0x4278C5d322aB92F1D876Dd7Bd9b44d1748b88af2",
  //   "0x0D92d35D311E54aB8EEA0394d7E773Fc5144491a",
  //   "0x24EcC5E6EaA700368B8FAC259d3fBD045f695A08",
  // ];

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

      // //CHECK Balance
      // const balance = await provider.getBalance(userAccount);
      // // console.log("balanceFromProvider", balance);
      // //the balance will come in a BigNumber
      // //and have to be converted in a  readable format through thiss processes
      // const converBal = BigNumber.from(balance).toString();
      // const ethValue = ethers.utils.formatEther(converBal);
      // // console.log("converTed balance", converBal);
      // // console.log("ethValue in readble format", ethValue);

      // setEther(ethValue);

      //GET NEWTWORK (networkname)
      const network = await provider.getNetwork();
      setNetworkConnect(network.name);
      // console.log(network.name, network);

      //ALL TOKENS BALANCE
      addToken.map(async (el, i) => {
        //GETTING CONTRACT
        const contract = new ethers.Contract(el, IWETHABI, provider);
        // console.log("Contract", contract);
        //GETTING BALANCE
        // console.log("el", el);
        const userBalance = await contract.balanceOf(userAccount);

        // console.log("useBalance", userBalance);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        //GET NAME AND SYMBOL
        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });

        // console.log("tokenData", tokenData);

        //WETH9 BALANCE
        const weth = await connectingWithIWETHToken();
        // console.log("WETH", weth);
        const wethBal = await weth.balanceOf(userAccount);
        // console.log("wethBal", wethBal);
        const wethTokenLeft = BigNumber.from(wethBal).toString();
        const convertwethTokenBal = ethers.utils.formatEther(wethTokenLeft);

        // console.log("convertwethTokenBal", convertwethTokenBal);
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

  // console.log("tokenData", tokenData);

  useEffect(() => {
    fetchingData();
  }, []);

  //SINGLE SWAP TOKEN
  const singleSwapToken = async (token1, token2, swapAmount) => {
    console.log("token1, token2, swapAmont", token1, token2, swapAmount);
    try {
      let singleSwapToken;
      let weth;
      let dai;

      singleSwapToken = await connectingWithSingleSwapContract();
      // console.log("singleSwapToken", singleSwapToken);
      weth = await connectingWithIWETHToken();
      dai = await connectingWithDAIToken();
      //we won't make any changes as both WETH and DAI are all ERC20 token and their interface function can be used for deposit, approval, etc as all ERC20 token have same interface

      // console.log("weth", weth);
      // console.log("dai", dai);
      //let's deposit into weth to send to uniswap router, approve it and convert to dai
      // const amountIn = 10n ** 18n;
      // const amountIn = ethers.utils.parseEther("10.0");
      const decimals0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals0
      );

      // console.log("amountIn", amountIn);

      await weth.deposit({ value: amountIn });

      await weth.approve(singleSwapToken.address, amountIn);

      //SWAP: let's do the swap
      const transaction = await singleSwapToken.swapExactInputSingle(
        token1.tokenAddress,
        token2.tokenAddress,
        amountIn,
        {
          gasLimit: 300000,
        }
      );

      await transaction.wait();
      // console.log("transaction", transaction);
      // const daiContract = await connectingWithDAIToken();
      const balance = await dai.balanceOf(account);
      // console.log("balance of dai", balance);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(transferAmount);
      setDai(ethValue);

      // console.log("dai balance", ethValue);
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
        getPrice,
        swapUpdatedPrice,
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
