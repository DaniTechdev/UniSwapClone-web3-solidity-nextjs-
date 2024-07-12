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
import ERC20 from "./ERC20.json";

export const SwapTokenContext = React.createContext();

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
    "0xa3b48c7b901fede641b596a4c10a4630052449a6",
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "0xa138575a030a2F4977D19Cc900781E7BE3fD2bc0",
  ];
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
    } catch (error) {}
  };
  //FETCH DATA
  return (
    <SwapTokenContext.Provider value={{ swap }}>
      {children}
    </SwapTokenContext.Provider>
  );
};
