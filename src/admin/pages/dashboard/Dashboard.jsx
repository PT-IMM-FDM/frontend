import React from "react";
import Layout from "../../component/Layout";
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
      <div className="flex flex-col items-center justify-center">
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
      </div>
    </Layout>
  );
};

export default Dashboard;
