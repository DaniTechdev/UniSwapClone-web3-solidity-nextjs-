import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import images from "../../assets";
import { Model, TokenList } from "../index";

//CONTEXT

import { SwapTokenContext } from "../../Context/SwapContext";

const NavBar = () => {
  const {
    connectWallet,
    account,
    weth9,
    dai,
    networkConnect,
    ether,
    tokenData,
  } = useContext(SwapTokenContext);
  const menuItems = [
    {
      name: "Swap",
      link: "/",
    },
    {
      name: "Tokens",
      link: "/",
    },
    {
      name: "Pools",
      link: "/",
    },
  ];

  //USESTATE

  // const [account, setAccount] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          {/* {//LOGO IMAGE} */}
          <div className={Style.Navbar_box_left_img}>
            <Image src={images.uniswap} width={50} height={50} alt="logo" />
          </div>

          {/* MENU ITEMS */}

          <div className={Style.Navbar_box_left_menu}>
            {menuItems.map((el, i) => (
              <Link key={i + 1} href={{ pathname: `${el.name}` }}>
                <p className={Style.Navbar_box_left_menu_item}>{el.name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* MIDDLE SECTION */}
        <div className={Style.Navbar_box_middle}>
          <div className={Style.Navbar_box_middle_search}>
            <div className={Style.Navbar_box_middle_search_img}>
              <Image src={images.search} alt="search" width={20} height={20} />
            </div>
            {/* INPUT SECTION */}
            <input type="text" placeholder="Search Tokens" />
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className={Style.Navbar_box_right}>
          <div className={Style.Navbar_box_right_box}>
            <div className={Style.Navbar_box_right_box_img}>
              <Image src={images.ether} alt="Network" height={30} width={30} />
            </div>
            <p> {networkConnect}</p>
          </div>
          {account ? (
            <button onClick={() => setOpenTokenBox(true)}>
              {account.slice(0, 20)}...
            </button>
          ) : (
            <button onClick={() => setOpenModel(true)}>Connect</button>
          )}

          {openModel && (
            // sending setOpenModel into Model to use it and close the Modal
            <Model setOpenModel={setOpenModel} connectWallet={connectWallet} />
          )}
        </div>
      </div>
      {/* TOKENLIST COMPONENT */}
      {openTokenBox && (
        <TokenList tokenData={tokenData} setOpenTokenBox={setOpenTokenBox} />
      )}
    </div>
  );
};

export default NavBar;
