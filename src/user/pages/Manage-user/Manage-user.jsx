import React from "react";
import ManageU from "../../components/ManageUser/ManageU";
import { Component as Navbar } from "../../components/navbar";

const ManageUser = () => {
  return (
    <div className="bg-cover bg-[url('/work.jpg')] bg-center bg-no-repeat max-w-full min-h-screen">
      <div className="backdrop-blur-sm bg-black/10 min-h-screen">
        <Navbar />
        <div className="px-4 pb-4">
          <ManageU />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
