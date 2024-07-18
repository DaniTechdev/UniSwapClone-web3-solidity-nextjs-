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
          <div className={Style.PoolAdd_box_header_middle}></div>
        </div>
      </div>
    </div>
  );
};

export default PoolAdd;
