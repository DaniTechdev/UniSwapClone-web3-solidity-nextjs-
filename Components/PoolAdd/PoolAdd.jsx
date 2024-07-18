import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import images from "../../assets";
import Style from "./PoolAdd.module.css";

const PoolAdd = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openTokenModel, setOpenTokenModel] = useState(false);
  const [active, setActive] = useState(1);
  const [openFee, setOpenFee] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const feePairs = [
    {
      fee: "0.5 %",
      info: "Best for stable pairs",
      number: "0% select",
    },
    {
      fee: "0.3%",
      info: "Best for stable pairs",
      number: "0% select",
    },
    {
      fee: "1%",
      info: "Best for stable pairs",
      number: "0% select",
    },
  ];

  const mintPriceRange = (text) => {
    if (text == "+") {
      setMinPrice(minPrice + 1);
    } else if (text == "-") {
      setMaxPrice(maxPrice - 1);
    }
  };

  return (
    <div className={Style.PoolAdd}>
      <div className={Style.PoolAdd_box}>
        <div className={Style.PoolAdd_box_header}>
          <div className={Style.PoolAdd_box_header}>
            <Image src={images.arrowLeft} alt="image" width={30} height={30} />
          </div>
          <div className={Style.PoolAdd_box_header_middle}>
            <p>Add Liquidity</p>
          </div>
          <div className={Style.PoolAdd_box_header_right}>
            <p>Clear All</p>
            <Image
              src={images.close}
              alt="image"
              width={50}
              height={50}
              onClick={() => setOpenModel(true)}
            />
          </div>
        </div>

        {/* {SSELECT PRICE RANGE} */}
        <div className={Style.PoolAdd_box_price}>
          {/* {LEFT} */}
          <div className={Style.PoolAdd_box_price_left}>
            <h4>Select Pair</h4>
            <div className={Style.PoolAdd_box_price_left_token}>
              <div className={Style.PoolAdd_box_price_left_token_input}>
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>UNI</p>
                <p>?</p>
              </div>
              <div
                className={Style.PoolAdd_box_price_left_token_info}
                onClick={() => setOpenTokenModel(true)}
              >
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>WETH</p>
                <p>?</p>
              </div>
              {/* {} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolAdd;
