import React, { useState, useContext } from "react";
import Image from "next/image";
import { Token, SearchToken } from "../index";
//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../assets";

//context
import { SwapTokenContext } from "../../Context/SwapContext";
// import { connectWallet } from "../../Utils/apiFeatures";

const HeroSection = ({}) => {
  //UseState
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setopenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const [tokenSwapOutPut, setTokenSwapOutPut] = useState(0);
  const [poolMessage, setPoolMessage] = useState("");
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);

  const {
    singleSwapToken,
    connectWallet,
    account,
    ether,
    dai,
    tokenData,
    getPrice,
    swapUpdatedPrice,
  } = useContext(SwapTokenContext);
  //TOKEN 1

  // console.log("tokenData HeroSection", tokenData);
  const [tokenOne, settokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });
  //TOKEN 2
  const [tokenTwo, settokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  // console.log("tokenOne from Hero section", tokenOne);
  // console.log("tokenTwo from Hero section", tokenTwo);

  //function for the price update
  const callOutPut = async (value) => {
    // const yourAccount = " 0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
    // const yourAccount = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const yourAccount = "0x5294b5421E64ff729af56feE5C5799FF3E7397A8";
    const deadline = 10;
    const slippageAmount = 25;

    const data = await swapUpdatedPrice(
      value,
      slippageAmount,
      deadline,
      yourAccount
    );

    console.log(data);
    setTokenSwapOutPut(data[1]);
    //We will display our loader
    setSearch(false);

    const poolAddress = "0x2e9f25be6257c210d7adf0d4cd6e3e881ba25f8";
    const poolData = await getPrice(value, poolAddress);
    const messsage = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[0]}`;
    setPoolMessage(messsage);
  };

  //JSX

  return (
    <div className={Style.HeroSection}>
      <div className={Style.HeroSection_box}>
        <div className={Style.HeroSection_box_heading}>
          <p>Swap</p>
          <div className={Style.HeroSection__box_heading_img}>
            <Image
              src={images.close}
              alt="image"
              width={50}
              height={50}
              onClick={() => setOpenSetting(true)}
            />
          </div>
        </div>

        <div className={Style.HeroSection_box_input}>
          <input
            type="number"
            placeholder="0"
            onChange={(e) => (
              callOutPut(e.target.value),
              setSwapAmount(e.target.value),
              setSearch(true)
            )}
          />
          <button onClick={() => setopenToken(true)}>
            <Image src={images.etherlogo} width={20} height={20} alt="ether" />
            {tokenOne.name || "ETH"}
            <small>{tokenOne.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>
        <div className={Style.HeroSection_box_input}>
          {/* <input type="text" placeholder="0" /> */}
          <p>
            {search ? (
              <Image
                src={images.loading}
                width={100}
                height={40}
                alt="loading"
              />
            ) : (
              tokenSwapOutPut
            )}
          </p>
          <button onClick={() => setOpenTokensTwo(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenTwo.symbol || "ETH"}
            <small>{tokenTwo.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        {search ? (
          <Image src={images.loading} width={100} height={40} alt="loading" />
        ) : (
          poolMessage
        )}

        {account ? (
          <button
            className={Style.HeroSection_box_btn}
            onClick={() => singleSwapToken(tokenOne, tokenTwo, swapAmount)}
          >
            Swap
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className={Style.HeroSection_box_btn}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {openSetting && <Token setOpenSetting={setOpenSetting} />}

      {openToken && (
        <SearchToken
          openToken={setopenToken}
          tokens={settokenOne}
          tokenData={tokenData}
        />
      )}
      {openTokensTwo && (
        <SearchToken
          openToken={setOpenTokensTwo}
          tokens={settokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  );
};

export default HeroSection;
