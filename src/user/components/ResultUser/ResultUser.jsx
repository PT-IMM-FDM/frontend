import React from "react";
import { Component as Navbar } from "../navbar";
import { useLocation } from "react-router-dom";
import { Card, Blockquote, Alert, HR } from "flowbite-react";
import { HiInformationCircle, HiOutlinePhone } from "react-icons/hi";

const ResultUser = () => {
  const location = useLocation();
  const { state } = location;
  const { success, message, data } = state || {};

  // Determine the alert color based on formula_health
  const getAlertColor = (healthStatus) => {
    switch (healthStatus) {
      case "FIT":
        return "success";
      case "FIT_FOLLOW_UP":
        return "warning";
      case "UNFIT":
        return "failure";
      default:
        return "default"; // default color if none of the conditions match
    }
  };
  // Format the health status text
  const formatHealthStatus = (healthStatus) => {
    return healthStatus.replace(/_/g, " ");
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  return (
    <div>
      <Navbar />
      <Card className="max-w-[500px] mx-auto mb-5 p-4">
        <div className="flex justify-between">
          <img src="/IMM.svg" className="mr-3 h-6 sm:h-8" alt="Logo IMM" />
          <p className="font-bold mt-2">{formattedDate} </p>
        </div>
        <h1 className="font-bold text-[16px]">Hasil Fit Daily Monitoring</h1>
        <HR className="my-1" />
        {success ? (
          <div>
              <Alert
                color={getAlertColor(data.formula_health)}
                icon={HiInformationCircle}
              >
                <span className="font-medium">Kondisi Anda</span>{" "}
                {formatHealthStatus(data.formula_health)}
              </Alert>
              <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800 text-[16px]">
                {data.recomendation}
              </Blockquote>
            <HR className="my-2" />
            <div className="flex items-center">
              <HiOutlinePhone className="mr-2" />
              No. Telp: 0811111212
            </div>
          </div>
        ) : (
          <p>Mohon mengisi FDM terlebih dahulu.</p>
        )}
      </Card>
    </div>
  );
};

export default ResultUser;
