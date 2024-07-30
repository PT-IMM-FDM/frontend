import React from "react";
import FDMFormU from "../../components/FDMUser/FDMFormU";
import { Component as Navbar } from "../../components/navbar";
import { Component as Button } from "../../components/button";

const FDM = () => {
  return (
    <div
      className="bg-cover bg-[url('/work.jpg')] bg-center bg-no-repeat max-w-full min-h-screen"
    >
      <div className="backdrop-blur-sm bg-black/10 min-h-screen">
      <Navbar />
      <div><FDMFormU /></div>
      {/* <div className="mt-8 pb-8 max-w-[70px] mx-auto"><Button/></div> */}
      </div>
    </div>
  );
};

export default FDM;
