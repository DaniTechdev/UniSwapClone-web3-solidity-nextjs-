import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  BooTokenAddress,
  BooTokenABI,
  LifeTokenAddress,
  LifeTokenABI,
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  swapMultiHopAddress,
  SwapMultiHopABI,
  IWETHABI,
  IWETHAddresss,
} from "../Context/constants";

//CHECK IF WALLET IS CONNECTED

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMast");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {}
};
