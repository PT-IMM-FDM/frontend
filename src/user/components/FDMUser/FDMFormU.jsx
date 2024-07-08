import React from "react";
import { Component as Navbar } from "../navbar";
import { Component as Button } from "../button";
import { Component as Radio } from "../radiobutton";

function FDMFormU() {
  return (
    <div className="bg-red-200">
      <Navbar />
      <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-1 mb-8">
        <Radio />
      </div>
      <div className="flex items-center justify-center lg:px-1">
        <Button />
      </div>
    </div>
  );
}

export default FDMFormU;
