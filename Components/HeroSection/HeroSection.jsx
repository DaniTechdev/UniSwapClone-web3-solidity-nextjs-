import React, { useState, useContext } from "react";
import Image from "next/image";
import { Token, SearchToken } from "../index";
//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../assets";

const HeroSection = ({ accounts, tokenData }) => {
  //UseState
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setopenToken] = useState(false);
  const [openTokenTwo, setOpenTokenTwo] = useState(false);

  //TOKEN 1
  const [tokenOne, settokenOne] = useState({
    name: "",
    image: "",
  });
  //TOKEN 2
  const [tokenTwo, settokenTwo] = useState({
    name: "",
    image: "",
  });

  //JSX

  return (
    <div className={Style.HeroSection}>
      <div className={Style.HeroSection_box}>
        <div className={Style.HeroSection__box_heading}>
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
          <input type="text" placeholder="0" />
          <button onClick={() => openToken(true)}>
            <Image
              src={tokenOne.image || images.etherlogo}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenOne.name || "ETH"}
            <small>9474</small>
          </button>
        </div>
        <div className={Style.HeroSection_box_input}>
          <input type="text" placeholder="0" />
          <button onClick={() => openToken(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenTwo.name || "ETH"}
            <small>9474</small>
          </button>
        </div>

        {accounts ? (
          <button className={Style.HeroSection_box_btn}>Connect Wallet</button>
        ) : (
          <button className={Style.HeroSection_box_btn} onClick={() => {}}>
            Swap
          </button>
        )}
      </div>

      {openSetting && <Token openSetting={openSetting} />}

      {openToken && (
        <SearchToken
          openToken={setOpenTokenTwo}
          tokens={settokenOne}
          tokenData={tokenData}
        />
      )}
      {openToken && (
        <SearchToken
          openToken={setOpenTokenTwo}
          tokens={settokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  );
};

export default HeroSection;
