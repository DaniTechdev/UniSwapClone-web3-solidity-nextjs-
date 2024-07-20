import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import images from "../assets";
import Style from "../styles/Tokens.module.css";

import { PoolConnect, PoolAdd } from "../Components/index";

const Pools = () => {
  return (
    <div className={Style.Pool}>
      <PoolAdd />
      <PoolConnect />
    </div>
  );
};

export default Pools;
