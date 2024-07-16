import React from "react";
import HistoryUser from "../../components/HistoryUser/HistoryUser";
import { Component as Navbar } from "../../components/navbar";

function HistoryU() {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Navbar />
      <div className="pb-8">
        <HistoryUser />
      </div>
    </div>
  );
}

export default HistoryU;
