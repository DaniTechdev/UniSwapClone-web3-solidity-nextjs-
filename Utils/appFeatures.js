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
  } catch (error) {
    console.log(error);
  }
};

//Connect Wallet
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMast");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT====================

//BOO TOKEN FETCHING
export const fetchBooContract = (signerOrProvider) =>
  new ethers.Contract(BooTokenAddress, BooTokenABI, signerOrProvider);
//CONNECTING WITH BOO TOKEN CONTRACT
export const connectingWithBooToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchBooContract(signer);
  } catch (error) {
    console.log(error);
  }
};
