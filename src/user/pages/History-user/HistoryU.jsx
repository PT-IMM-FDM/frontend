import React from "react";
import HistoryUser from "../../components/HistoryUser/HistoryUser";
import { Component as Navbar } from "../../components/navbar";

function HistoryU() {
  return (
    <div className="bg-cover bg-[url('/work.jpg')] bg-center bg-no-repeat max-w-full min-h-screen">
      <div className="backdrop-blur-sm bg-black/10 min-h-screen">
        <Navbar />
        <div className="pb-8">
          <HistoryUser />
        </div>
      </div>
    </div>
  );
}

export default HistoryU;
