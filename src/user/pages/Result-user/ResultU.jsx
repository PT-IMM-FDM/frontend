import React from "react";
import ResultUser from "../../components/ResultUser/ResultUser";
import { Component as Navbar } from "../../components/navbar";

function ResultU() {
  return (
    <div className="bg-fixed bg-cover bg-top bg-[url('/bg-form.jpg')] bg-no-repeat max-w-full min-h-screen">
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 py-2">
          <ResultUser />
        </div>
      </div>
    </div>
  );
}

export default ResultU;
