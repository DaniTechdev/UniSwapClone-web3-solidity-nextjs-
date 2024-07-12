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
  IWETHAddress,
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

//BOO TOKEN FETCHING-------------
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

    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT====================

//LIFE TOKEN FETCHING-----------
export const fetchLifeContract = (signerOrProvider) =>
  new ethers.Contract(LifeTokenAddress, LifeTokenABI, signerOrProvider);
//CONNECTING WITH LIFE TOKEN CONTRACT
export const connectingWithLifeToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchLifeContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT====================

//SingleSwapContract FETCHING------------
export const fetchingSingleSwapContract = (signerOrProvider) =>
  new ethers.Contract(
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
    signerOrProvider
  );
//CONNECTING WITH SingleSwap CONTRACT
export const connectingWithSingleSwapContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchingSingleSwapContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT====================

//IWETH TOKEN FETCHING------------
export const fetchingIWETHContract = (signerOrProvider) =>
  new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);
//CONNECTING WITH SingleSwap CONTRACT
export const connectingWithIWETHToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchingIWETHContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

//DAI TOKEN FETCHING------------
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchingDAIContract = (signerOrProvider) =>
  //Here for DAI ERC20 token, we will make use of the IWETH abi since the two tokens are ERC20 tokens and will
  //have similar INTERFACES and same functions for all ERC20 tokens

  //WE only need to get  DAI contract address only
  new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);
//CONNECTING WITH SingleSwap CONTRACT
export const connectingWithDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchingDAIContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};
