import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import {
  checkIfWalletConnected,
  connectingWithIWETHToken,
} from "../Utils/apiFeatures";
import { IWETHABI } from "./constants";
import { SwapTokenContext } from "./SwapContext";

export const SwapTokenContextProvider = ({ children }) => {
  const swap = "Welcome to swap my Token";

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

      //ALL TOKEN BALANCE
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

        console.log("tokenData", tokenData);

        //DAI BALANCE
        // const dai = await connectingWithDAIToken();
        // console.log("DAI", dai);
        const weth = await connectingWithIWETHToken();
        console.log("WETH", weth);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <SwapTokenContext.Provider value={{ swap }}>
      {children}
    </SwapTokenContext.Provider>
  );
};
