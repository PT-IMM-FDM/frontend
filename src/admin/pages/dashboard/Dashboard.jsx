import React from "react";
import Layout from "../Layout";
import MenuHeader from "../../component/MenuHeader";
import CardHero from "../../component/DashboardMenu/CardHero";
import CardJumlahStats from "../../component/DashboardMenu/CardJumlahStats";
import DoughnutChart from "../../component/DashboardMenu/ChartDoughnut";
import DateRangePicker from "../../component/DashboardMenu/DateRangePicker";
import LineChart from "../../component/DashboardMenu/ChartLine";

const Dashboard = () => {
  return (
    <Layout>
      <MenuHeader />
      {/* <div className="flex flex-col items-center justify-center">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-[52vw]">
            <CardHero />
            <CardJumlahStats />
            </div>
            <DateRangePicker />
            </div>
            <div className="flex w-full gap-4">
            <DoughnutChart />
            <DoughnutChart />
            <LineChart />
            </div>
            </div> */}
      <div className="grid grid-row-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <CardHero />
            <CardJumlahStats />
          </div>
          <div className="flex">
            <DateRangePicker />
          </div>
        </div>
        <div className="container bg-blue-200 grid grid-cols-4 gap-4">
          <DoughnutChart />
          <DoughnutChart />
          <div className="col-span-2">
            <LineChart className="min-h-full"/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
