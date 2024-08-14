import React from "react";
import FDMFormU from "../../components/FDMUser/FDMFormU";
import { Component as Navbar } from "../../components/navbar";

const FDM = () => {
  return (
    <div className="bg-fixed bg-cover bg-top bg-[url('/bg-form.jpg')] bg-no-repeat max-w-full min-h-screen">
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 py-2">
          <FDMFormU />
        </div>
      </div>
    </div>
  );
};

export default FDM;
