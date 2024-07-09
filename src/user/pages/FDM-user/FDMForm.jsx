import React, { useState } from "react";
import FDMFormU from "../../components/FDMUser/FDMFormU";
import { Component as Navbar } from "../../components/navbar";
import { Component as Button } from "../../components/button";

const FDM = () => {
  return (
    <div className="bg-blue-100 max-w-full">
      <Navbar/>
      <div> <FDMFormU /></div>
      {/* <div className="mt-8 pb-8 max-w-[70px] mx-auto"><Button/></div> */}
    </div>
  );
};
7
export default FDM;
