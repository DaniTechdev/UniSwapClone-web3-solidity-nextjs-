import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./TokenList.module.css";
import images from "../../assets";

const TokenList = ({ tokenData, setOpenTokenBox }) => {
  // const data = [1, 2, 3, 4, 5, 6, 7];

  //writing small script to filter repeating elements of the array coming in
  // let tokenList = [];
  // for (let i = 0; i < tokenData.length; i++) {
  //   if (i % 2 == 1) tokenList.push(tokenData[i]);
  // }
  return (
    <div className={Style.TokenList}>
      <p
        className={Style.TokenList_close}
        onClick={() => setOpenTokenBox(false)}
      >
        <Image src={images.close} alt="close" width={50} height={50} />
      </p>
      <div className={Style.TokenList_title}>
        <h2>Your Token List</h2>
      </div>
      {tokenData.map((el, i) => (
        <div className={Style.TokenList_box} key={i + 1}>
          <div className={Style.TokenList_box_info}>
            <p className={Style.TokenList_box_info_symbol}>{el.symbol}</p>
            <p>
              <span>{el.tokenBalance}</span> {el.symbol} {""} {el.tokenAddress}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
