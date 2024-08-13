import React from "react";
import { Component as Navbar } from "../navbar";
import { useLocation } from "react-router-dom";
import { Card, Blockquote, Alert, HR } from "flowbite-react";
import { HiInformationCircle, HiOutlinePhone } from "react-icons/hi";

const ResultUser = () => {
  const location = useLocation();
  const { state } = location;
  const { success, message, data } = state || {};

  // Determine the alert color based on health status
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

  // Convert recommendations to HTML
  const formatRecommendations = (recommendationText) => {
    // Replace newline characters with HTML line breaks and bullet points with list items
    return recommendationText
      .split('\n')
      .filter(line => line.trim() !== '') // Remove empty lines
      .map(line => `<li>${line.trim().replace(/^•\t?/, '')}</li>`)
      .join('');
  };

  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  return (
    <div>
      <Navbar />
      <Card className="max-w-[500px] mx-auto mb-5 p-4">
        <div className="flex justify-between">
          <img src="/IMM.svg" className="mr-3 h-6 sm:h-8" alt="Logo IMM" />
          <p className="font-bold mt-2">{formattedDate} </p>
        </div>
        <HR className="my-1" />
        <h1 className="font-bold text-[16px]">Hasil Fit Daily Monitoring</h1>
        {success ? (
          <div>
            <Alert
              color={getAlertColor(data.result)}
              icon={HiInformationCircle}
            >
              <span className="font-medium">Kondisi Anda</span>{" "}
              {formatHealthStatus(data.result)}
            </Alert>
            <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800 text-[16px]">
              <ul
                className="list-disc pl-5"
                dangerouslySetInnerHTML={{ __html: formatRecommendations(data.recomendation) }}
              />
            </Blockquote>
            <HR className="my-2" />
            <img
              src="/rekomendasi.svg"
              className="w-full my-4"
              alt="Rekomendasi"
            />
            <div className="flex flex-col text-sm">
              <div className="flex items-center mb-2">
                <HiOutlinePhone className="mr-2 text-xs" />
                OH OnCall (Klinik 30): 0812-5511-185
              </div>
              <div className="flex items-center mb-2">
                <HiOutlinePhone className="mr-2 text-xs" />
                OH OnCall (Klinik Port): 0812-5511-183
              </div>
              <div className="flex items-center mb-2">
                <HiOutlinePhone className="mr-2 text-xs" />
                Rinda Purwanto: 0813-5028-3953
              </div>
              <div className="flex items-center mb-2">
                <HiOutlinePhone className="mr-2 text-xs" />
                Abustan: 0852-4717-8478
              </div>
              <div className="flex items-center mb-2">
                <HiOutlinePhone className="mr-2 text-xs" />
                Didik Pranoto: 0821-5553-5458
              </div>
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
