import React from "react";
import FDMFormU from "../../components/FDMUser/FDMFormU";
import { Component as Navbar } from "../../components/navbar";
import { Component as Button } from "../../components/button";

const FDM = () => {
  return (
    <div
      className="bg-fixed bg-cover bg-top bg-[url('/bg-form.jpg')] bg-no-repeat max-w-full min-h-screen"
    >
      <div className="min-h-screen">
      <Navbar />
      <div><FDMFormU /></div>
      {/* <div className="mt-8 pb-8 max-w-[70px] mx-auto"><Button/></div> */}
      </div>
    </div>
  );
};

export default FDM;
